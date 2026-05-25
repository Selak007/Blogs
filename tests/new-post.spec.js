const { test, expect } = require('@playwright/test');

test('can create a new post', async ({ page }) => {
  await page.goto('https://example.com/login');
  // Perform login (assuming a login is necessary and straightforward)
  await page.fill('#username', 'user');
  await page.fill('#password', 'password');
  await page.click('button[type=submit]');
  // Navigate to the new post page
  await page.goto('https://example.com/new-post');
  await page.fill('#title', 'New Blog Post');
  await page.fill('#content', 'This is a blog post content.');
  await page.click('button[type=submit]');
  // Verify the post is in the list
  await page.goto('https://example.com/posts');
  await expect(page.locator('text=New Blog Post')).toBeVisible();
});