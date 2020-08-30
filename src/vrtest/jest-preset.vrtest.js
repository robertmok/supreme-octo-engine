
// const playwright = require('playwright');

const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const customConfig = { threshold: 0 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: customConfig,
  noColors: true,
});
expect.extend({ toMatchImageSnapshot });
// const fs = require('fs');
// const path = require('path');

const PAGE_URL = 'http://localhost:4200/';
const cookies = [{
  url: 'http://localhost:4200/',
  name: 'doggo',
  value: 'woofs',
}];

describe(`(${browserName}): Jest UI Tests with Playwright Preset`, () => {
  let ticks = null;

  beforeAll(async () => {
    await context.addCookies(cookies);
    this.ticks = new Date().getTime();

    // have to go to domain to set the local storage
    await page.goto(PAGE_URL);
    await page.evaluate(() => {
      localStorage.setItem('myData', 'random data here');
    });

    // go to a page of domain after local storage is set 
    await page.goto(PAGE_URL);
  });

  it(`(${browserName}): Should load page`, async () => {
    expect(page).not.toBeNull();
    expect(await page.title()).not.toBeNull();

    const loadedCookies = await context.cookies('http://localhost:4200/');
    console.log(JSON.stringify(loadedCookies, null, 4));

    // let screenshotName = browserName + '-' + deviceName + '-' + this.ticks;
    // await page.screenshot({ path: './src/vrtest/screenshots/' + screenshotName + '.png', fullPage : true });

    // toMatchImageSnapshot doesn't know to keep the first screenshot of each screen sizes
    // the first screenshot was used to compare with the next screen sizes, it did not create the diff image
    // pass custom directory to save each screen size reference image in its own folder under the browser name
    let testScreenshot = await page.screenshot({ fullPage : true });
    expect(testScreenshot).toMatchImageSnapshot({
      customSnapshotsDir: './src/vrtest/__image_snapshots__/' + browserName + '/' + deviceName
    });
  });
});
