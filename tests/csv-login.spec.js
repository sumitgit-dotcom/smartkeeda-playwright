const { test, expect } = require('@playwright/test');
const { getTestData } = require('../utils/csvReader');
const { LoginPage } = require('../pages/LoginPage');

const users = getTestData('users.csv');

test.describe('Data-Driven Login Tests', () => {
  // Loop through each row in the CSV and create a test for it
  for (const user of users) {
    test(`Login as ${user.role} - ${user.email}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();

       await loginPage.login(user.email, user.password);
       await expect(page).toHaveURL(/dashboard/);
    });
  }
});