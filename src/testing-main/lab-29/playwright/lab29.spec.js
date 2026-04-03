import { test, expect } from '@playwright/test';

test.describe('Lab 29 - Playwright E2E', () => {
  test('loads the lab page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Lab 29/i })).toBeVisible();
  });

  test('increments the counter', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('[data-cy="count"]')).toContainText('Count: 0');
    await page.locator('[data-cy="increment"]').click();
    await expect(page.locator('[data-cy="count"]')).toContainText('Count: 1');
  });

  test('adds a todo item', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-cy="todo-input"]').fill('Prepare demo for students');
    await page.locator('[data-cy="todo-add"]').click();

    await expect(page.locator('[data-cy="todo-item"]')).toContainText('Prepare demo for students');
  });
});
