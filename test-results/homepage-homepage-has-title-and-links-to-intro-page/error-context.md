# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.js >> homepage has title and links to intro page
- Location: tests\homepage.spec.js:3:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('text=More information')
Expected: "https://www.iana.org/domains/example"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('text=More information')

```

```yaml
- heading "Example Domain" [level=1]
- paragraph: This domain is for use in documentation examples without needing permission. Avoid use in operations.
- paragraph:
  - link "Learn more":
    - /url: https://iana.org/domains/example
```

# Test source

```ts
  1 | const { test, expect } = require('@playwright/test');
  2 | 
  3 | test('homepage has title and links to intro page', async ({ page }) => {
  4 |   await page.goto('https://example.com');
  5 |   // Check that the page has the correct title
  6 |   await expect(page).toHaveTitle(/Example Domain/);
  7 |   // Check for a specific link on the page
> 8 |   await expect(page.locator('text=More information')).toHaveAttribute('href', 'https://www.iana.org/domains/example');
    |                                                       ^ Error: expect(locator).toHaveAttribute(expected) failed
  9 | });
```