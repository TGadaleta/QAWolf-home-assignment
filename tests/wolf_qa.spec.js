import { test, expect } from "@playwright/test";

test('Hacker News loads', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/newest');
    await expect(page.getByRole('link', { name: 'Hacker News' })).toBeVisible();
  });
  
test("Hacker News articles are sorted by time", async ({ page }) => {
    await page.goto("https://news.ycombinator.com/newest");
    const articles = [];
    while (articles.length < 100) {
        const articleRows = await page.locator(".athing").all();

        for (const row of articleRows) {
            if (articles.length >= 100) break;

            const id = await row.getAttribute("id");

            const subtextRow = await row.locator("xpath=following-sibling::tr[1]");
            const timeString = await subtextRow.locator(".age").getAttribute("title");

            const time = new Date(timeString.split(" ")[0]);
            articles.push({ id, time });
        }

        if (articles.length < 100) {
            await page.locator(".morelink").click();
        }
    }
    // Check if the articles are sorted by time
    const isSortedByKey = (arr, key) => arr.every((item, i) => i === 0 || arr[i - 1][key] >= item[key]);
    await expect(isSortedByKey(articles, "time")).toBe(true);
});