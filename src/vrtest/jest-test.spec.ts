const playwright = require('playwright');
// const compareImages = require('resemblejs/compareImages');
// const fs = require('mz/fs');

const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const customConfig = { threshold: 0 };
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: customConfig,
  noColors: true,
});
expect.extend({ toMatchImageSnapshot });
const fs = require('fs');
const path = require('path');

const PAGE_URL = 'http://localhost:4200/';
const cookies = [{
  url: 'http://localhost:4200/',
  name: 'doggo',
  value: 'woofs',
}];

// async function getDiff(screenshot, ref) {
//   const options = {
//       output: {
//           errorColor: {
//               red: 255,
//               green: 0,
//               blue: 255
//           },
//           errorType: 'movement',
//           transparency: 0.3,
//           largeImageThreshold: 1200,
//           useCrossOrigin: false,
//           outputDiff: true
//       },
//       scaleToSameSize: true,
//       ignore: 'antialiasing'
//   };

//   // The parameters can be Node Buffers
//   // data is the same as usual with an additional getBuffer() function
//   const data = await compareImages(
//       await fs.readFile('./src/vrtest/refs/' + ref + '.png'),
//       await fs.readFile('./src/vrtest/screenshots/' + screenshot + '.png'),
//       options
//   );

//   console.log(data);
//   // { isSameDimensions: true,
//   //   dimensionDifference: { width: 0, height: 0 },
//   //   rawMisMatchPercentage: 0,
//   //   misMatchPercentage: '0.00',
//   //   diffBounds: { top: 1024, left: 1280, bottom: 0, right: 0 },
//   //   analysisTime: 93,
//   //   getImageDataUrl: [Function],
//   //   getBuffer: [Function] }

//   await fs.writeFile('./src/vrtest/diffs/diff-' + screenshot + '.png', data.getBuffer());

//   return analyzeResult(data);
// }

// function analyzeResult(data) {
//   if (data.isSameDimensions &&
//     data.rawMisMatchPercentage === 0 &&
//     data.misMatchPercentage === '0.00'
//   ) {
//     return true;
//   }
//   return false;
// }

// Loop over all the supported browsers
for (const browserType of ['chromium']) { // 'firefox', 'webkit'

  describe(`(${browserType}): Jest UI Tests with Playwright`, () => {
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
      expect(page).not.toBeNull();
      expect(await page.title()).not.toBeNull();

      // let screenshotName = browserType + '-' + ticks;
      // await page.screenshot({ path: './src/vrtest/screenshots/' + screenshotName + '.png' });

      const loadedCookies = await context.cookies('http://localhost:4200/');
      console.log(JSON.stringify(loadedCookies, null, 4));

      // let comparedResult = await getDiff(screenshotName, browserType);
      // expect(comparedResult).toEqual(true);

      // const imageAtTestPath = path.resolve(__dirname, './refs', browserType + '.png');
      // // imageAtTest is a PNG encoded image buffer which is what `toMatchImageSnapshot() expects
      // const imageAtTest = fs.readFileSync(imageAtTestPath);
      // expect(imageAtTest).toMatchImageSnapshot();

      // jest-image-snapshot automatically keeps first screenshot and compares on subsequent runs
      // https://codeburst.io/automatic-visual-regression-testing-23cc06471dd
      let testScreenshot = await page.screenshot();
      expect(testScreenshot).toMatchImageSnapshot();
    });

  });
}
