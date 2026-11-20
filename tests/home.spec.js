const { test, expect } = require('@playwright/test');

test('open home page and close browser', async ({ page, context, browser }) => {
  // 1. Open the home page
  // We use 'domcontentloaded' to avoid timeouts from heavy ads/trackers on the page
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // 2. Verify the page title
  await expect(page).toHaveTitle(/Testzone/i);
  
  // 3. Close everything manually as requested
  await page.close();
  await context.close();
  await browser.close();
});