# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: new-post.spec.js >> can create a new post
- Location: tests\new-post.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#username')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "Example Domain" [level=1] [ref=e3]
  - paragraph [ref=e4]: This domain is for use in documentation examples without needing permission. Avoid use in operations.
  - paragraph [ref=e5]:
    - link "Learn more" [ref=e6] [cursor=pointer]:
      - /url: https://iana.org/domains/example
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('can create a new post', async ({ page }) => {
  4  |   await page.goto('https://example.com/login');
  5  |   // Perform login (assuming a login is necessary and straightforward)
> 6  |   await page.fill('#username', 'user');
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
  7  |   await page.fill('#password', 'password');
  8  |   await page.click('button[type=submit]');
  9  |   // Navigate to the new post page
  10 |   await page.goto('https://example.com/new-post');
  11 |   await page.fill('#title', 'New Blog Post');
  12 |   await page.fill('#content', 'This is a blog post content.');
  13 |   await page.click('button[type=submit]');
  14 |   // Verify the post is in the list
  15 |   await page.goto('https://example.com/posts');
  16 |   await expect(page.locator('text=New Blog Post')).toBeVisible();
  17 | });
```