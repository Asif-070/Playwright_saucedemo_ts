import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';

test('Valid user login', async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(LoginPage.nxtpage_assertion).toHaveText('Products');
});

test('Invalid user login', async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('invalid_user', 'hot_sauce');

    await expect(LoginPage.error_assertion).toContainText('Epic sadface');
});

test('Empty credential login', async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('', '');

    await expect(LoginPage.error_assertion).toContainText('Username is required');

    await LoginPage.login('', 'hot_sauce');

    await expect(LoginPage.error_assertion).toContainText('Username is required');

    await LoginPage.login('empty_user', '');

    await expect(LoginPage.error_assertion).toContainText('Password is required');
});

test('Locked out user login', async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('locked_out_user', 'secret_sauce');

    await expect(LoginPage.error_assertion).toContainText('Epic sadface');
});

test('Delayed user login', async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('performance_glitch_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(LoginPage.nxtpage_assertion).toHaveText('Products');
});