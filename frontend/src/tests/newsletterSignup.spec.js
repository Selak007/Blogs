import { test, expect } from '@playwright/test';



test('Newsletter Signup Form', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Check initial state
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toBeVisible();

  const submitButton = page.locator('button', { hasText: 'Subscribe' });
  await expect(submitButton).toBeVisible();

  // Try submitting without email
  await submitButton.click();
  const errorMessage = page.locator('text=Email is required');
  await expect(errorMessage).toBeVisible();

  // Enter invalid email
  await emailInput.fill('invalid-email');
  await submitButton.click();
  const invalidEmailMessage = page.locator('text=Invalid email format');
  await expect(invalidEmailMessage).toBeVisible();

  // Enter valid email
  await emailInput.fill('test@example.com');
  await submitButton.click();
  const successMessage = page.locator('text=Thank you for subscribing!');
  await expect(successMessage).toBeVisible();
});
