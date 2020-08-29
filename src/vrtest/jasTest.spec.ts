const playwright = require('playwright');

const PAGE_URL = 'http://localhost:4200/';
const cookies = [{
  url: 'http://localhost:4200/',
  name: 'doggo',
  value: 'woofs',
}];

// Loop over all the supported browsers
for (const browserType of ['chromium', 'firefox']) { // 'firefox', 'webkit'

  describe(`(${browserType}): UI Tests with Playwright`, () => {
    let browser = null;
    let context = null;
    let page = null;
    let ticks = null;

    // Create the browser and page context
    beforeAll(async () => {
      browser = await playwright[browserType].launch();
      context = await browser.newContext({
        viewport: { width: 1280, height: 1024 }
      });
      await context.addCookies(cookies);
      page = await context.newPage();
      ticks = new Date().getTime();

      if (!page) {
        throw new Error('Connection wasn\'t established');
      }

      // Listen for all console events and handle errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          console.log(`Error text: "${msg.text()}"`);
        }
      });


      // Open the page
      await page.goto(PAGE_URL);
    });

    afterAll(async () => {
      await browser.close();
    });

    it(`(${browserType}): Should load page`, async () => {
      expect(page).toBeNull();
      expect(await page.title()).not.toBeNull();

      // await page.screenshot({ path: './src/vrtest/screenshots/' + browserType + '-' + ticks + '.png' });

      const loadedCookies = await context.cookies('http://localhost:4200/');
      console.log(JSON.stringify(loadedCookies, null, 4));

    });


  });
}
