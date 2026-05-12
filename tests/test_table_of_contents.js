/**
 * test_table_of_contents.js
 * Automated test script for Issue #44 – Implement automatic table of contents
 *
 * Tests:
 *  1. TOC element is injected into the DOM after script runs
 *  2. TOC contains at least one link
 *  3. Each TOC link's href matches a heading id in the document
 *  4. Clicking a TOC link marks it as active (.toc-active)
 *  5. Headings that had no id receive a generated slug id
 *
 * Run with:  node tests/test_table_of_contents.js
 * Requires:  npm install jsdom  (pure-JS DOM simulation, no browser needed)
 */

'use strict';

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// ─── helpers ───────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✅ PASS: ${label}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${label}`);
    failed++;
  }
}

// ─── build a minimal blog page ─────────────────────────────────────────────
const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Test Blog</title></head>
<body>
  <main>
    <h2>Introduction</h2>
    <p>Some intro text.</p>
    <h2>Key Facts</h2>
    <h3>Habitat</h3>
    <p>Lives in forests.</p>
    <h3>Diet</h3>
    <p>Eats leaves.</p>
    <h2>Conclusion</h2>
    <p>Wrap-up paragraph.</p>
  </main>
</body>
</html>`;

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'http://localhost/',
});

const { window } = dom;
const { document } = window;

// Load and execute the TOC script in the JSDOM context
const tocScript = fs.readFileSync(
  path.resolve(__dirname, '../frontend/table-of-contents.js'),
  'utf8'
);
const scriptEl = document.createElement('script');
scriptEl.textContent = tocScript;
document.body.appendChild(scriptEl);

// ─── tests ─────────────────────────────────────────────────────────────────
console.log('\n🧪 Running Table-of-Contents Tests (Issue #44)\n');

// 1. TOC element exists
const toc = document.getElementById('toc');
assert(toc !== null, 'TOC <nav id="toc"> is injected into the DOM');

// 2. TOC contains links
const links = toc ? toc.querySelectorAll('.toc-link') : [];
assert(links.length > 0, `TOC contains at least one link (found ${links.length})`);

// 3. All headings in <main> should appear as TOC links
const headings = document.querySelectorAll('main h2, main h3');
assert(
  links.length === headings.length,
  `TOC link count (${links.length}) matches heading count (${headings.length})`
);

// 4. Each link href resolves to an existing element id
let allLinksResolve = true;
links.forEach((link) => {
  const targetId = link.getAttribute('href').replace('#', '');
  if (!document.getElementById(targetId)) {
    console.error(`     ⚠ No element found for id="${targetId}"`);
    allLinksResolve = false;
  }
});
assert(allLinksResolve, 'All TOC link hrefs resolve to heading elements in the DOM');

// 5. Headings that had no id were assigned a slug id
const introHeading = Array.from(headings).find(
  (h) => h.textContent.trim() === 'Introduction'
);
assert(
  introHeading && introHeading.id !== '',
  `Heading "Introduction" received auto-generated id="${introHeading ? introHeading.id : 'N/A'}"`
);

// 6. Sub-items (h3) get the .toc-sub class
const subItems = toc ? toc.querySelectorAll('.toc-sub') : [];
const h3Count = document.querySelectorAll('main h3').length;
assert(
  subItems.length === h3Count,
  `H3 headings get .toc-sub class (expected ${h3Count}, got ${subItems.length})`
);

// 7. TOC title text is present
const tocTitle = toc ? toc.querySelector('.toc-title') : null;
assert(tocTitle !== null && tocTitle.textContent.includes('Table of Contents'),
  'TOC title element contains "Table of Contents"');

// ─── summary ────────────────────────────────────────────────────────────────
console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests\n`);
if (failed > 0) process.exit(1);
