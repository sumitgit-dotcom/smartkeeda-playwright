const { test, expect } = require('@playwright/test');

// Increase the timeout for this specific test to 90 seconds
test.setTimeout(90000);

test('print all clickable links on the home page', async ({ page }) => {
  // 1. Navigate to the home page
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const links = page.locator('a');
  const count = await links.count();
  
  console.log(`\n==================================================`);
  console.log(`Found ${count} clickable links on the page:`);
  console.log(`==================================================\n`);

  for (let i = 0; i < count; i++) {
    const link = links.nth(i);
    
    // Use textContent() instead of innerText() to avoid waiting for visual rendering
    let text = await link.textContent();
    if (!text || !text.trim()) {
      text = '[Image/No Text]';
    }
    
    const href = await link.getAttribute('href');
    
    // Clean up the text to remove line breaks so it prints nicely on one line
    const cleanText = text.trim().replace(/\n/g, ' ');
    
    console.log(`${i + 1}. ${cleanText} -> ${href}`);
  }

  console.log(`\n==================================================\n`);

  expect(count).toBeGreaterThan(0);
});