import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { inventoryPage } from '../pages/inventoryPage';
import { cartPage } from '../pages/cartPage';

test.beforeEach(async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('standard_user', 'secret_sauce');

    const InventoryPage = new inventoryPage(page);
    await InventoryPage.addtocart_btn.nth(0).click();
    await InventoryPage.cart_btn.click();
});

test('Add single product', async ({ page }) => {
    const CartPage = new cartPage(page);
    await expect(CartPage.cart_item).toHaveCount(1);
    await CartPage.checkout_btn.click();
    await CartPage.form_fillup('Ben', 'Reily', '1122');
    await CartPage.finish_btn.click();
    await expect(CartPage.complt_msg).toHaveText('Thank you for your order!');
});

test('checkout form validation', async ({ page }) => {
    const CartPage = new cartPage(page);
    await expect(CartPage.cart_item).toHaveCount(1);
    await CartPage.checkout_btn.click();
    await CartPage.form_fillup('', '', '');
    await expect(CartPage.error_board).toContainText('First Name is required');
    await CartPage.form_fillup('', 'Reily', '1122');
    await expect(CartPage.error_board).toContainText('First Name is required');
    await CartPage.form_fillup('Ben', '', '1122');
    await expect(CartPage.error_board).toContainText('Last Name is required');
    await CartPage.form_fillup('Ben', 'Reily', '');
    await expect(CartPage.error_board).toContainText('Postal Code is required');
});
