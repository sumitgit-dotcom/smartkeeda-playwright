const { test, expect } = require('@playwright/test');

test.setTimeout(150000);

test('Complete SBI Clerk Mock Test Series Purchase Journey', async ({ page }) => {
  
  console.log('Navigating to Home Page...');
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // 1. Start Mock Test
  const startMockTestLink = page.getByRole('link', { name: /Start Mock Test/i }).first();
  await startMockTestLink.scrollIntoViewIfNeeded();
  await startMockTestLink.click();
  
  await page.waitForURL(/mock-test-for-bank-and-insurance/, { timeout: 30000 });

  // 2. Click Full Length Test tab
  const fullLengthTestTab = page.getByText(/Full Length Test/i).first();
  await fullLengthTestTab.waitFor({ state: 'visible' });
  await fullLengthTestTab.click();

  // 3. Click SBI Clerk Series
  const sbiClerkSeries = page.getByRole('link', { name: /SBI Clerk Mock Test/i }).first();
  await sbiClerkSeries.scrollIntoViewIfNeeded();
  await sbiClerkSeries.click();
  
  // Wait for the SBI Clerk page to load
  await page.waitForLoadState('domcontentloaded');

  // (Note: "Pre Full Length Test Series" is just a heading on this page, not a clickable tab. 
  // We skip clicking it and go straight to "View Tests")

  // 4. Click "View Tests >" under the Pre Full Length Test Series
  // We use the exact text 'View Tests >' and scope it to the link role
  console.log('Clicking View Tests...');
  const viewTestsLink = page.getByRole('link', { name: /View Tests/i }).first();
  await viewTestsLink.scrollIntoViewIfNeeded();
  await viewTestsLink.click();

  // Wait for the tests page to load
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000); // Give it a moment to render

  // 5. Click on SBI Clerk (Pre + Mains) 
  // Note: Based on standard Smartkeeda flow, this is usually the header title. 
  // If it is a button/tab, this will click it.
  console.log('Selecting SBI Clerk (Pre + Mains)...');
  const sbiClerkPlan = page.getByText(/SBI Clerk \(Pre \+ Mains\)/i).first();
  await sbiClerkPlan.scrollIntoViewIfNeeded();
  await sbiClerkPlan.click(); 

  // 6. Click Buy Now
  console.log('Clicking Buy Now...');
  const buyNowBtn = page.getByRole('button', { name: /Buy Now/i }).first();
  
  await buyNowBtn.waitFor({ state: 'visible', timeout: 15000 });
  await buyNowBtn.scrollIntoViewIfNeeded();
  await buyNowBtn.click();

  console.log('Journey complete! Buy Now clicked.');
  await page.close();
  await page.context().close();
});