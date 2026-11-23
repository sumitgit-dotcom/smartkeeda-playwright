const { test, expect } = require('@playwright/test');
test.setTimeout(120000);

test('Navigate to Smart Course, view Ratnabha Saha Sir courses, and click Bank PO banner', async ({ page, context }) => {
  // 1. Go to the dashboard
  await page.goto('/dashboard/bank-and-insurance-exams#trending', { waitUntil: 'domcontentloaded' });

    console.log('Clicking Smart Course in left pane...');

    const smartCourseLink = page.getByRole('link', { name: /Smart Course/i }).first();
     console.log('Waiting for new tab...');
     const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    smartCourseLink.click(),
  ]);

  await newTab.waitForLoadState('domcontentloaded');
   console.log('New tab opened. URL:', newTab.url());

     console.log('Finding Ratnabha Saha Sir...');
const ratnabhaHeading = newTab.getByRole('heading', { name: /Ratnabha Saha Sir/i }).first();
await ratnabhaHeading.scrollIntoViewIfNeeded();
  await ratnabhaHeading.waitFor({ state: 'visible', timeout: 20000 });

    console.log('Clicking View Courses for Ratnabha Saha Sir...');
    const ratnabhaCard = ratnabhaHeading.locator('xpath=ancestor::div[contains(@class, "faculty") or contains(@class, "card") or contains(@class, "educator")][1]');
  const viewCoursesLink = ratnabhaCard
    .getByRole('link', { name: /View Courses/i })
    .or(ratnabhaCard.getByRole('button', { name: /View Courses/i }))
    .first();

     if (!(await viewCoursesLink.isVisible().catch(() => false))) {
    console.log('Fallback: using the first "View Courses" link on the page.');
    await newTab.getByText(/View Courses/i).first().click();
  } else {
    await viewCoursesLink.click();
  }

   await newTab.waitForLoadState('domcontentloaded');
  await newTab.waitForTimeout(3000);
  console.log('Clicking Bank PO Interview Mastery Course banner...');
  const bankPoBanner = newTab
    .getByRole('link', { name: /Bank PO Interview Mastery Course/i })
    .or(newTab.getByText(/Bank PO Interview Mastery Course/i))
    .first();

    await bankPoBanner.scrollIntoViewIfNeeded();
  await bankPoBanner.click();

   await newTab.waitForTimeout(3000);
  console.log('Final URL:', newTab.url());

   await newTab.waitForTimeout(3000);
  console.log('Final URL:', newTab.url());
});
