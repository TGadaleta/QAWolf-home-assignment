// tests/hackernews.spec.js
import { test, expect } from '@playwright/test';

test('Hacker News loads', async ({ page }) => {
  await page.goto('https://news.ycombinator.com/newest');
  await expect(page.getByRole('link', { name: 'Hacker News' })).toBeVisible();
});

test('Hacker News has articles', async ({ page }) => {
  await page.goto('https://news.ycombinator.com/newest');
  const articleCount = await page.locator('.athing').count();
  expect(articleCount).toBeGreaterThan(0);
});
