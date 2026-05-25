const { test, expect } = require('@playwright/test');

test('navigation links are correct', async ({ page }) => {
  await page.goto('https://example.com');
  // Mock-up navigation test
  await page.click('text=About Us');
  await expect(page).toHaveURL(/about/);
  await page.click('text=Contact');
  await expect(page).toHaveURL(/contact/);
});