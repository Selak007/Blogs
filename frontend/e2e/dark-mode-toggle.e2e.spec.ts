import { test, expect } from '@playwright/test';

test('home loads, dark mode toggles, and blogs show fallback on error', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'BlogWrites' })).toBeVisible();

  const toggleButton = page.getByRole('button', { name: /toggle dark mode/i });
  await toggleButton.click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);

  await page.route('**/api/blogs', (route) => route.abort());
  await page.goto('/blogs', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: /latest blogs/i })).toBeVisible();
  await expect(page.getByText('All About Cats')).toBeVisible();
});
