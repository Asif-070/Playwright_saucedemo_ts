import { Page, Locator } from '@playwright/test';

export class loginPage {
    readonly page: Page;
    readonly username_tb: Locator;
    readonly password_tb: Locator;
    readonly login_btn: Locator;
    readonly nxtpage_assertion: Locator;
    readonly error_assertion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username_tb = page.locator('[data-test="username"]');
        this.password_tb = page.locator('[data-test="password"]');
        this.login_btn = page.locator('[data-test="login-button"]');

        this.nxtpage_assertion = page.locator('span.title');
        this.error_assertion = page.locator('.error-message-container h3');
    }

    async gotologinpage(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(user_name: string, pass_name: string){
        await this.username_tb.fill(user_name);
        await this.password_tb.fill(pass_name);
        await this.login_btn.click();
        await this.page.waitForLoadState('networkidle');
    }
}