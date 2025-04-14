
  
  async function collectArticles(page, articles) {
    
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

  return articles;
  }
  
  export default collectArticles;