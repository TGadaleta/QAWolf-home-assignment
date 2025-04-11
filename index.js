// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
import { chromium } from "playwright";
import { test, expect } from "@playwright/test";


async function sortHackerNewsArticles(){
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const articles = [];
  
  // navigate to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // collect the articles on the first page
  const articleRows = await page.locator(".athing").all();
    for (const row of articleRows) {
      while (articles.length < 100) {
        const title = await row.locator(".titleline").innerText();
        const subtextRow = await row.locator('xpath=following-sibling::tr[1]');
        const timeString = await subtextRow.locator(".age").getAttribute("title");
        const time = new Date(timeString.split(" ")[0]);
        articles.push({ title, time });
      }
    // click on the "More" button
    if (articles.length < 100) {
      const moreButton = await page.getByRole("link", { name: "More"}).click()
    }
  }

  // sort the articles by time in new array
  const sortedArticles = articles.sort((a, b) => b.time - a.time);
  
  console.log("Number of Articles: ", sortedArticles.length);

  await browser.close();
};

(async () => {
  await sortHackerNewsArticles();
})();
