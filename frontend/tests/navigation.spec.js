import { test, expect } from '@playwright/test';

test.describe('Navigation and Content', () => {
  test('should load the homepage and display "Featured Animals" heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h2')).toContainText('Featured Animals');
  });

  test('should navigate to the About page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a:has-text("About")');
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator('h1')).toContainText('About BlogWrites');
  });

  test('should navigate to the Blogs page', async ({ page }) => {
    await page.goto('/');
    await page.click('nav a:has-text("Blogs")');
    await expect(page).toHaveURL(/\/blogs$/);
    await expect(page.locator('h1')).toContainText('Latest Blogs');
  });

  test('should navigate to an animal detail page (Cat)', async ({ page }) => {
    await page.goto('/');
    // Click on the Cat card
    await page.click('a.animal-card:has-text("Cat")');
    await expect(page).toHaveURL(/\/animal\/cat$/);
    await expect(page.locator('h1')).toContainText('All About Cats');
    await expect(page.locator('text=Cats are small, carnivorous mammals.')).toBeVisible();
  });

  test('should navigate back to home by clicking the logo', async ({ page }) => {
    await page.goto('/about');
    await page.click('header a h1:has-text("BlogWrites")');
    await expect(page).toHaveURL('/');
    await expect(page.locator('h2')).toContainText('Featured Animals');
  });

  test('should display mock blogs if backend is unavailable', async ({ page }) => {
    // We expect the fallback data to be shown if the fetch fails
    await page.goto('/blogs');
    await expect(page.locator('h3').first()).toBeVisible();
    const firstBlogTitle = await page.locator('h3').first().textContent();
    expect(firstBlogTitle).toBe('All About Cats');
  });
});
