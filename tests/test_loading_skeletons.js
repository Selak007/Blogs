/**
 * test_loading_skeletons.js
 * Automated test script for Issue #46 – Add loading skeletons for blog cards
 *
 * Tests:
 *  1. Skeleton CSS classes exist in styles.css (.skeleton, .skeleton-img, etc.)
 *  2. Shimmer @keyframes animation is defined in styles.css
 *  3. The skeleton injection script is present in index.html
 *  4. On page load, skeleton containers are injected for sections with cards
 *  5. Skeleton elements have aria-hidden="true" for accessibility
 *  6. Skeleton has correct child elements (img/title/text bars)
 *  7. .cards-loading class is applied to sections during loading
 *
 * Run with:  node tests/test_loading_skeletons.js
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

// ─── read source files ───────────────────────────────────────────────────────
const cssSource = fs.readFileSync(
  path.resolve(__dirname, '../frontend/styles.css'), 'utf8'
);
const htmlSource = fs.readFileSync(
  path.resolve(__dirname, '../frontend/index.html'), 'utf8'
);

// ─── tests ──────────────────────────────────────────────────────────────────
console.log('\n🧪 Running Loading Skeletons Tests (Issue #46)\n');

// 1. CSS classes exist in styles.css
assert(cssSource.includes('.skeleton {') || cssSource.includes('.skeleton{'),
  '.skeleton class is defined in styles.css');
assert(cssSource.includes('.skeleton-img'),
  '.skeleton-img class is defined in styles.css');
assert(cssSource.includes('.skeleton-title'),
  '.skeleton-title class is defined in styles.css');
assert(cssSource.includes('.skeleton-text'),
  '.skeleton-text class is defined in styles.css');

// 2. Shimmer keyframes defined
assert(cssSource.includes('@keyframes shimmer'),
  '@keyframes shimmer animation is defined in styles.css');
assert(cssSource.includes('background-position'),
  'Shimmer animation uses background-position for sweep effect');

// 3. Skeleton script present in HTML
assert(htmlSource.includes('skeleton-container') || htmlSource.includes('cards-loading'),
  'Skeleton injection script is present in index.html');
assert(htmlSource.includes('data-skeleton-container'),
  'data-skeleton-container attribute used for tracking skeleton elements');

// 4 & 5. Run in JSDOM and check DOM state
const dom = new JSDOM(htmlSource, {
  runScripts: 'dangerously',
  url: 'http://localhost/',
});
const { document } = dom.window;

// Skeletons should have been injected synchronously on script run
const skeletonContainers = document.querySelectorAll('[data-skeleton-container]');
assert(skeletonContainers.length > 0,
  `Skeleton containers injected into DOM (found ${skeletonContainers.length})`);

// 5. aria-hidden on skeleton elements
const skeletonCards = document.querySelectorAll('.skeleton');
let allAriaHidden = skeletonCards.length > 0;
skeletonCards.forEach((sk) => {
  if (sk.getAttribute('aria-hidden') !== 'true') allAriaHidden = false;
});
assert(allAriaHidden && skeletonCards.length > 0,
  `All ${skeletonCards.length} skeleton cards have aria-hidden="true"`);

// 6. Each skeleton has the 3 child bar elements
let allHaveBars = skeletonCards.length > 0;
skeletonCards.forEach((sk) => {
  if (!sk.querySelector('.skeleton-img')) allHaveBars = false;
  if (!sk.querySelector('.skeleton-title')) allHaveBars = false;
  if (!sk.querySelector('.skeleton-text')) allHaveBars = false;
});
assert(allHaveBars,
  'Each skeleton card contains .skeleton-img, .skeleton-title, and .skeleton-text');

// 7. .cards-loading class applied to parent sections
const loadingSections = document.querySelectorAll('.cards-loading');
assert(loadingSections.length > 0,
  `At least one section has .cards-loading class during loading (found ${loadingSections.length})`);

// ─── summary ─────────────────────────────────────────────────────────────────
console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests\n`);
if (failed > 0) process.exit(1);
