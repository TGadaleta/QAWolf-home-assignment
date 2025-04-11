import {test, expect} from '@playwright/test';

test('my first test', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');
})