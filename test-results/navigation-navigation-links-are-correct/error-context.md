# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> navigation links are correct
- Location: tests\navigation.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=About Us')

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
  3  | test('navigation links are correct', async ({ page }) => {
  4  |   await page.goto('https://example.com');
  5  |   // Mock-up navigation test
> 6  |   await page.click('text=About Us');
     |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  7  |   await expect(page).toHaveURL(/about/);
  8  |   await page.click('text=Contact');
  9  |   await expect(page).toHaveURL(/contact/);
  10 | });
```