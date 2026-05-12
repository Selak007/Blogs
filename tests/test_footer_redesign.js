/**
 * test_footer_redesign.js
 * Automated test script for Issue #47 – Create modern footer redesign
 *
 * Tests:
 *  1. Footer element exists with id="site-footer"
 *  2. Footer has a .footer-grid with multiple columns
 *  3. At least 3 footer columns (.footer-col) are present
 *  4. Each column has a heading (h3)
 *  5. Footer contains navigation links
 *  6. Social links section (.footer-social) is present
 *  7. Footer bottom (.footer-bottom) with copyright text exists
 *  8. Footer uses dark background (not yellow) in CSS
 *  9. Footer column links have valid href attributes
 * 10. Footer is accessible (aria-label on social links)
 *
 * Run with:  node tests/test_footer_redesign.js
 * Requires:  npm install jsdom
 */

'use strict';

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// ─── helpers ────────────────────────────────────────────────────────────────
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

// ─── load files ─────────────────────────────────────────────────────────────
const htmlSource = fs.readFileSync(
  path.resolve(__dirname, '../frontend/index.html'), 'utf8'
);
const cssSource = fs.readFileSync(
  path.resolve(__dirname, '../frontend/styles.css'), 'utf8'
);

const dom = new JSDOM(htmlSource, { url: 'http://localhost/' });
const { document } = dom.window;

// ─── tests ──────────────────────────────────────────────────────────────────
console.log('\n🧪 Running Footer Redesign Tests (Issue #47)\n');

// 1. Footer element with id exists
const footer = document.getElementById('site-footer');
assert(footer !== null, 'Footer element <footer id="site-footer"> exists');

// 2. .footer-grid exists inside footer
const grid = footer ? footer.querySelector('.footer-grid') : null;
assert(grid !== null, 'Footer grid container (.footer-grid) exists');

// 3. At least 3 footer columns
const cols = footer ? footer.querySelectorAll('.footer-col') : [];
assert(cols.length >= 3, `At least 3 footer columns present (found ${cols.length})`);

// 4. Each column has an h3 heading
let allColsHaveHeading = cols.length >= 3;
cols.forEach((col, i) => {
  const h3 = col.querySelector('h3');
  if (!h3 || h3.textContent.trim() === '') {
    console.error(`     ⚠ Column ${i + 1} missing h3 heading`);
    allColsHaveHeading = false;
  }
});
assert(allColsHaveHeading, 'All footer columns have h3 headings');

// 5. Footer contains navigation links (ul > li > a)
const footerLinks = footer ? footer.querySelectorAll('.footer-col ul li a') : [];
assert(footerLinks.length >= 4, `Footer has at least 4 navigation links (found ${footerLinks.length})`);

// 6. Social links section present
const social = document.getElementById('footer-social');
assert(social !== null, 'Social links section (#footer-social) exists');
const socialLinks = social ? social.querySelectorAll('a') : [];
assert(socialLinks.length >= 2, `At least 2 social links present (found ${socialLinks.length})`);

// 7. Footer bottom with copyright
const bottom = document.getElementById('footer-bottom');
assert(bottom !== null, 'Footer bottom section (#footer-bottom) exists');
const bottomText = bottom ? bottom.textContent : '';
assert(
  bottomText.includes('2026') || bottomText.includes('©') || bottomText.includes('&copy;'),
  `Footer bottom contains copyright text ("${bottomText.trim().slice(0, 60)}")`
);

// 8. Footer uses dark background in CSS (not yellow)
assert(
  cssSource.includes('#1a1a2e') || cssSource.includes('background: #1') || cssSource.includes('background:#1'),
  'CSS defines a dark background color for footer (not yellow)'
);
assert(
  !cssSource.match(/footer\s*\{[^}]*background:\s*#FFD700/),
  'Old yellow (#FFD700) background removed from footer rule'
);

// 9. All footer nav links have non-empty href
let allLinksHaveHref = footerLinks.length > 0;
footerLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (!href || href.trim() === '') {
    console.error(`     ⚠ Link "${link.textContent}" has empty href`);
    allLinksHaveHref = false;
  }
});
assert(allLinksHaveHref, 'All footer navigation links have href attributes');

// 10. Social links have aria-label for accessibility
let allSocialHaveAria = socialLinks.length > 0;
socialLinks.forEach((link) => {
  if (!link.getAttribute('aria-label')) {
    console.error(`     ⚠ Social link missing aria-label: "${link.textContent}"`);
    allSocialHaveAria = false;
  }
});
assert(allSocialHaveAria, 'All social links have aria-label for screen readers');

// ─── summary ─────────────────────────────────────────────────────────────────
console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests\n`);
if (failed > 0) process.exit(1);
