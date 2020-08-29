const {chromium, firefox, webkit} = require('playwright');

(async function() {
  console.log('>>> starting firefox and chromium tests.');
  await Promise.all([
      //test(firefox),
      test(chromium)
    ]);
  console.log('>>>> done');
})();

async function test(launcher) {
    // run your test with the browser
    const browser = await launcher.launch();
    // Create browser context and load cookies
    const context = await browser.newContext({
        viewport: { width: 1280, height: 1024 }
    });
    const cookies = [{
        url: 'http://localhost:4200/',	
        name: 'doggo',
        value: 'woofs',
    }];

    await context.addCookies(cookies);

    const page = await context.newPage();
    let ticks = new Date().getTime();
      
    
    // Listen for all console events and handle errors
    page.on('console', msg => {
        if (msg.type() === 'error')
        console.log(`Error text: "${msg.text()}"`);
    });

    // Load a page
    await page.goto('http://localhost:4200/');
    await page.screenshot({ path: './src/vrtest/screenshots/' + launcher._name + '-' + ticks + '.png' });

    const loadedCookies = await context.cookies('http://localhost:4200/');
    console.log(JSON.stringify(loadedCookies, null, 4));

    await browser.close();
}