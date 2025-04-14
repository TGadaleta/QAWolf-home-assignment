// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
import { chromium } from "playwright";
import collectArticles from "./tests/wolf_qa_script.js";

async function sortHackerNewsArticles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  //get the articles using the collectArticles function
  const articles = await collectArticles(page, []);

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
