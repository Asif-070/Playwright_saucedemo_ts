import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { navbar } from '../pages/navBar';

test('State Validation', async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();

    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    await LoginPage.login('standard_user', 'secret_sauce');
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL(/inventory\.html/);
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page).toHaveURL(/cart\.html/);
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    const navBar = new navbar(page);
    await navBar.logout();

    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/cart.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});
