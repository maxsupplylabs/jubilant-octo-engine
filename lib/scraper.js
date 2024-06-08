import puppeteer from 'puppeteer';

const scrapeSite = async (url, primarySelector, link, secondarySelector, dateSelector) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Intercept and block certain resource types to speed up loading
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (['image', 'stylesheet', 'font', 'script'].includes(req.resourceType())) {
      req.abort();
    } else {
      req.continue();
    }
  });

  // Navigate to the URL
  await page.goto(url);

  // Wait for the primary selector to be present in the DOM
  await page.waitForSelector(primarySelector);

  // Evaluate and extract the inner text and link of all matching elements
  const data = await page.evaluate((primarySelector, link, secondarySelector, dateSelector) => {
    const primaryElements = Array.from(document.querySelectorAll(primarySelector));
    const secondaryElements = Array.from(document.querySelectorAll(secondarySelector));
    const dateElements = Array.from(document.querySelectorAll(dateSelector));

    return primaryElements.map((element, index) => ({
      text: element.innerText,
      link: element.getAttribute(link),
      secondaryText: secondaryElements[index] ? secondaryElements[index].innerText : null,
      dateText: dateElements[index] ? dateElements[index].innerText : null
    }));
  }, primarySelector, link, secondarySelector, dateSelector);

  await browser.close();
  return data;
};


export default scrapeSite