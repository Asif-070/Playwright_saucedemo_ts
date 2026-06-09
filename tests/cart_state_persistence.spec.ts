import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { inventoryPage } from '../pages/inventoryPage';
import { cartPage } from '../pages/cartPage';
import { navbar } from '../pages/navbar';

test('State Validation', async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('standard_user', 'secret_sauce');

    const InventoryPage = new inventoryPage(page);
    await InventoryPage.addtocart_btn.nth(0).click();
    await expect(InventoryPage.cart_badge).toHaveText('1');
    await InventoryPage.cart_btn.click();

    const CartPage = new cartPage(page);
    await expect(CartPage.cart_item).toHaveCount(1);

    const navBar = new navbar(page);
    await navBar.logout();

    await LoginPage.login('standard_user', 'secret_sauce');
    await expect(InventoryPage.cart_badge).toHaveText('1');
    await InventoryPage.cart_btn.click();
    await expect(CartPage.cart_item).toHaveCount(1);
});
