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
      console.log(time)
      articles.push({ id, time });
    }


    if (articles.length < 100) {
      await page.locator(".morelink").click();
    }
  }
  // Close the browser
  await browser.close();

  // Check if the articles are sorted by time
  const isSortedByTime = (arr, key) => arr.every((item, i) => i === 0 || arr[i - 1][key] >= item[key]);
  console.log("Amount of articles:", articles.length);
  console.log(`Articles are sorted by time: ${isSortedByTime(articles, "time")}`);
}

(async () => {
  await sortHackerNewsArticles();
})();
