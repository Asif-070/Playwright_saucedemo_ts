import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { inventoryPage } from '../pages/inventoryPage';
import { cartPage } from '../pages/cartPage';

test.beforeEach(async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('standard_user', 'secret_sauce');
});

test('Add single product', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.addtocart_btn.nth(0).click();
    await expect(InventoryPage.cart_badge).toHaveText('1');
    await InventoryPage.cart_btn.click();

    const CartPage = new cartPage(page);
    await expect(CartPage.cart_item).toHaveCount(1);
});

test('Add multiple product', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.addtocart_btn.nth(0).click();
    await InventoryPage.addtocart_btn.nth(1).click();
    await InventoryPage.addtocart_btn.nth(2).click();
    await expect(InventoryPage.cart_badge).toHaveText('3');
    await InventoryPage.cart_btn.click();

    const CartPage = new cartPage(page);
    await expect(CartPage.cart_item).toHaveCount(3);
});

test('Item removal check', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.addtocart_btn.nth(0).click();
    await InventoryPage.addtocart_btn.nth(1).click();
    await InventoryPage.addtocart_btn.nth(2).click();
    await expect(InventoryPage.cart_badge).toHaveText('3');
    await InventoryPage.cart_btn.click();

    const CartPage = new cartPage(page);
    await expect(CartPage.cart_item).toHaveCount(3);

    await page.goBack();

    await InventoryPage.addtocart_btn.nth(0).click();
    await expect(InventoryPage.cart_badge).toHaveText('2');
    await InventoryPage.cart_btn.click();

    await expect(CartPage.cart_item).toHaveCount(2);
});

test('Cart persistence check', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.addtocart_btn.nth(0).click();
    await expect(InventoryPage.cart_badge).toHaveText('1');
    await InventoryPage.cart_btn.click();
    await page.goBack();
    await InventoryPage.item_name.nth(0).click();
    await expect(page.locator('.back')).toHaveText('Back to products');
    await page.goBack();
    await expect(InventoryPage.cart_badge).toHaveText('1');
});
