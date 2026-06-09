import { Page, Locator } from '@playwright/test';

export class cartPage {
    readonly page: Page;
    readonly cart_item: Locator;
    readonly checkout_btn: Locator;
    readonly fname_tb: Locator;
    readonly lname_tb: Locator;
    readonly postal_tb: Locator;
    readonly continue_btn: Locator;
    readonly finish_btn: Locator;
    readonly complt_msg: Locator;
    readonly error_board: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cart_item = page.locator('.cart_item');
        this.checkout_btn = page.getByRole('button', { name: 'Checkout' });
        this.fname_tb = page.locator('#first-name');
        this.lname_tb = page.locator('#last-name');
        this.postal_tb = page.locator('#postal-code');
        this.continue_btn = page.getByRole('button', { name: 'Continue' });
        this.finish_btn = page.getByRole('button', { name: 'Finish' });
        this.complt_msg = page.locator('.complete-header');
        this.error_board = page.locator('.error-message-container');
    }

    async form_fillup(fname: string, lname: string, postal: string){
        await this.fname_tb.fill(fname);
        await this.lname_tb.fill(lname);
        await this.postal_tb.fill(postal);
        await this.continue_btn.click();
    }
}