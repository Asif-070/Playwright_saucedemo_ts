import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { inventoryPage } from '../pages/inventoryPage';

test.beforeEach(async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.gotologinpage();
    await LoginPage.login('standard_user', 'secret_sauce');
});

test('Product count verification', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await expect(InventoryPage.prod_box).toHaveCount(6);
});

test('Sorting verification A-Z', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.sort_dropdown.selectOption('az');

    const items: string[] = await InventoryPage.item_name.allTextContents();
    const sorted: string[] = [...items].sort((a, b) => a.localeCompare(b));
    expect(items).toEqual(sorted);
});

test('Sorting verification Z-A', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.sort_dropdown.selectOption('za');

    const items: string[] = await InventoryPage.item_name.allTextContents();
    const sorted: string[] = [...items].sort((a, b) => b.localeCompare(a));
    expect(items).toEqual(sorted);
});

test('Sorting verification low-high', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.sort_dropdown.selectOption('lohi');

    const items: string[] = await InventoryPage.item_price.allTextContents();
    const numbers: number[] = items.map(item => Number(item.replace('$', '')));
    const sorted: number[] = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
});

test('Sorting verification high-low', async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.sort_dropdown.selectOption('hilo');

    const items: string[] = await InventoryPage.item_price.allTextContents();
    const numbers: number[] = items.map(item => Number(item.replace('$', '')));
    const sorted: number[] = [...numbers].sort((a, b) => b - a);
    expect(numbers).toEqual(sorted);
});
