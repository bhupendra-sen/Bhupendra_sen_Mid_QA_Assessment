import { Page, Locator } from '@playwright/test';

export class CartPage {
    private checkoutLink: Locator;
    private cartProduct: Locator;

    constructor(private page: Page) {
        this.checkoutLink = page.getByRole('link', {
            name: /Checkout/i
        }).first();

        this.cartProduct = page.locator('#content').getByText('iPhone', {
            exact: true
        });
    }

    async openCart() {
        await this.page.getByText('View Cart', { exact: true }).click();

        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyProduct() {
        await this.cartProduct.waitFor({
            state: 'visible'
        });
    }

    async proceedToCheckout() {
        await this.checkoutLink.click();

        await this.page.waitForLoadState('domcontentloaded');
    }
}