import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private product: Locator;
    private addToCartButton: Locator;
    private successMessage: Locator;

    constructor(private page: Page) {
        this.product = page.getByText('iPhone', { exact: true }).first();

        this.addToCartButton = page
            .getByRole('button', { name: /Add to Cart/i })
            .first();

        this.successMessage = page.locator('#notification-box-top');
    }

    async selectProduct() {
        await this.product.click();

        await this.page.waitForLoadState('domcontentloaded');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async verifyAddedToCart() {
        await this.successMessage.waitFor({
            state: 'visible'
        });
    }
}