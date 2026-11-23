const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('Navigate to Success Stories and count testimonials', async ({ page }) => {
  // 1. Go to the dashboard
  await page.goto('/dashboard/bank-and-insurance-exams', { waitUntil: 'domcontentloaded' });

  // 2. Click Success Stories
  const successStoriesLink = page.getByRole('link', { name: /Success Stories/i }).first();
  await successStoriesLink.scrollIntoViewIfNeeded();
  await successStoriesLink.click();

  // 3. Wait for page load
  await page.waitForURL(/reviews-of-smartkeeda/, { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  console.log('Successfully navigated to Success Stories page.');

  // 4. Scroll to load all content
  console.log('Scrolling to load all testimonials...');
  let previousHeight = 0;
  let currentHeight = await page.evaluate(() => document.body.scrollHeight);
  
  while (previousHeight !== currentHeight) {
    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2000); 
    currentHeight = await page.evaluate(() => document.body.scrollHeight);
  }
  console.log('Finished scrolling. Page height stabilized.');

  // 5. Count the testimonials by counting the student names (H3 headings)
  // We target the h3 elements specifically based on the snapshot
  const testimonialNames = page.locator('main h3');
  const count = await testimonialNames.count();

  console.log(`\n==================================================`);
  console.log(`Total testimonials found: ${count}`);
  console.log(`==================================================\n`);

  // 6. Assert
  expect(count).toBeGreaterThan(0);
});