# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.js >> search returns correct results
- Location: tests\search.spec.js:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[type=search]')

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
  3  | test('search returns correct results', async ({ page }) => {
  4  |   await page.goto('https://example.com');
  5  |   // Assuming there is a search box
> 6  |   await page.fill('input[type=search]', 'example');
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
  7  |   await page.press('input[type=search]', 'Enter');
  8  |   // Check if the results display correctly
  9  |   await expect(page.locator('text=example')).toHaveCount(10);
  10 | });
```