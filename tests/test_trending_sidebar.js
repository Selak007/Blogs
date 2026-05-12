/**
 * test_trending_sidebar.js
 * Automated test script for Issue #45 – Create trending topics sidebar
 *
 * Tests:
 *  1. Sidebar element exists in the DOM (#trending-sidebar)
 *  2. Sidebar has a heading containing "Trending"
 *  3. Trending list (#trending-list) exists
 *  4. At least 3 trending items are present
 *  5. All trending links have valid href attributes pointing to .html pages
 *  6. At least one item has a "New" or "Hot" badge tag
 *  7. Sidebar has correct ARIA label for accessibility
 *  8. sidebar.css is linked in the document head
 *
 * Run with:  node tests/test_trending_sidebar.js
 * Requires:  npm install jsdom
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

// ─── load index.html ───────────────────────────────────────────────────────
const html = fs.readFileSync(
  path.resolve(__dirname, '../frontend/index.html'),
  'utf8'
);

const dom = new JSDOM(html, { url: 'http://localhost/' });
const { document } = dom.window;

// ─── tests ─────────────────────────────────────────────────────────────────
console.log('\n🧪 Running Trending Topics Sidebar Tests (Issue #45)\n');

// 1. Sidebar element exists
const sidebar = document.getElementById('trending-sidebar');
assert(sidebar !== null, 'Sidebar element <aside id="trending-sidebar"> exists in DOM');

// 2. Sidebar heading contains "Trending"
const heading = sidebar ? sidebar.querySelector('h2') : null;
assert(
  heading !== null && heading.textContent.includes('Trending'),
  `Sidebar heading contains "Trending" (got: "${heading ? heading.textContent.trim() : 'N/A'}")`
);

// 3. Trending list exists
const list = document.getElementById('trending-list');
assert(list !== null, 'Trending list <ul id="trending-list"> exists');

// 4. At least 3 trending items
const items = list ? list.querySelectorAll('li') : [];
assert(items.length >= 3, `At least 3 trending items present (found ${items.length})`);

// 5. All links have valid .html hrefs
const links = list ? list.querySelectorAll('.trending-link') : [];
let allLinksValid = true;
links.forEach((link) => {
  const href = link.getAttribute('href') || '';
  if (!href.endsWith('.html')) {
    console.error(`     ⚠ Invalid href: "${href}"`);
    allLinksValid = false;
  }
});
assert(allLinksValid && links.length > 0, `All ${links.length} trending links point to .html pages`);

// 6. At least one badge tag (New / Hot)
const tags = list ? list.querySelectorAll('.trending-tag') : [];
assert(tags.length >= 1, `At least one trending badge (.trending-tag) is present (found ${tags.length})`);

// 7. ARIA label on sidebar
const ariaLabel = sidebar ? sidebar.getAttribute('aria-label') : '';
assert(
  ariaLabel && ariaLabel.length > 0,
  `Sidebar has aria-label="${ariaLabel}" for accessibility`
);

// 8. sidebar.css is linked
const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
const hasSidebarCSS = cssLinks.some((l) => (l.getAttribute('href') || '').includes('sidebar.css'));
assert(hasSidebarCSS, 'sidebar.css is referenced in <head>');

// ─── summary ────────────────────────────────────────────────────────────────
console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests\n`);
if (failed > 0) process.exit(1);
