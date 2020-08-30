const playwright = require('playwright');

describe('Google', () => {
    beforeAll(async () => {
      await page.goto('https://google.com');
    });

    it('should display google text on page', async () => {
      expect(page).not.toBeNull();
      expect(await page.title()).not.toBeNull();
    });
});
