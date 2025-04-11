// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
import { chromium } from "playwright";

async function sortHackerNewsArticles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const articles = [];

  // Navigate to Hacker News "newest"
  await page.goto("https://news.ycombinator.com/newest");

  while (articles.length < 100) {
    const articleRows = await page.locator(".athing").all();

    for (const row of articleRows) {
      if (articles.length >= 100) break;

      const id = await row.getAttribute("id");

      const subtextRow = await row.locator("xpath=following-sibling::tr[1]");
      const timeString = await subtextRow.locator(".age").getAttribute("title");

      const time = new Date(timeString.split(" ")[0]);
      articles.push({ id, time });

      console.log(id, time.toISOString());
    }

    if (articles.length < 100) {
      await page.getByRole("link", { name: "More" }).click();
    }
  }

  console.log("Collected", articles.length, "articles.");
  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();
