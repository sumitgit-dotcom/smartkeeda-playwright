const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('Navigate to Buy Plan, select Sprinter Edition, and Log In', async ({ page }) => {
  await page.goto('/dashboard/bank-and-insurance-exams', { waitUntil: 'domcontentloaded' });
  
  console.log('Clicking Buy a Plan...');
  await page.getByRole('link', { name: /Buy a Plan/i }).click();

  await page.waitForURL(/pricing/, { timeout: 30000 });
  // Wait for the page to be fully loaded including all network requests
  await page.waitForLoadState('networkidle');

  // 3. Scroll to the Sprinter plan card and click the "Select Plan" button
  console.log('Clicking Sprinter Edition Select Plan button...');
  const sprinterBtn = page.getByRole('button', { name: /Select Plan/i }).nth(1);
  await sprinterBtn.scrollIntoViewIfNeeded();
  await sprinterBtn.click();

  // 4. Wait for EITHER the login modal OR the plan-chooser radios to appear
  console.log('Waiting for next step (login modal or plan chooser)...');
  
  // Wait for one of two possible outcomes
  const loginModal = page.locator('article').filter({ hasText: /LogIn To Your Account/i }).first();
  const radioGroup = page.locator('[role="radiogroup"]').filter({ has: page.locator('input[type="radio"], [role="radio"]') }).first();

  // Try login modal first (most common)
  try {
    await loginModal.waitFor({ state: 'visible', timeout: 15000 });
    console.log('Login modal appeared directly.');
  } catch {
    console.log('Login modal not found. Waiting for plan chooser...');
    await radioGroup.waitFor({ state: 'visible', timeout: 15000 });
    
    // Select first radio and click continue
    await radioGroup.getByRole('radio').first().check();
    await page.getByRole('button', { name: /CONTINUE/i }).click();
    
    // Now the login modal should appear
    await loginModal.waitFor({ state: 'visible', timeout: 15000 });
  }

  // 5. Fill credentials
  console.log('Entering email...');
  await loginModal.getByRole('textbox', { name: /Enter Email Id/i }).fill('jacob@yopmail.com');

  console.log('Entering password...');
  await loginModal.getByRole('textbox', { name: /Password/i }).fill('Test@123');

  // 6. Click LogIn
  console.log('Clicking LogIn button...');
  await loginModal.getByRole('button', { name: /^LogIn$/i }).click();

  // 7. Wait for result
  await page.waitForTimeout(3000);
  console.log('Login attempted. Current URL:', page.url());
});