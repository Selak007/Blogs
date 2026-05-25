const { test, expect } = require('@playwright/test');

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('https://example.com');
  // Check that the page has the correct title
  await expect(page).toHaveTitle(/Example Domain/);
  // Check for a specific link on the page
  await expect(page.locator('text=More information')).toHaveAttribute('href', 'https://www.iana.org/domains/example');
});