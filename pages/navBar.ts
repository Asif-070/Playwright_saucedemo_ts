import { Page, Locator } from '@playwright/test';

export class navbar {
    readonly page: Page;
    readonly burger_menu: Locator;
    readonly logout_btn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burger_menu = page.locator('#react-burger-menu-btn');
        this.logout_btn = page.locator('#logout_sidebar_link');
    }

    async logout(){
        await this.burger_menu.click();
        await this.logout_btn.click();
    }
}