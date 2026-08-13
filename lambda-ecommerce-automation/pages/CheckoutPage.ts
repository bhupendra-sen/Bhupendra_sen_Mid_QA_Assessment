import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    private checkoutContainer: Locator;

    constructor(private page: Page) {
        this.checkoutContainer = page.locator('#content');
    }

    async verifyCheckoutPage() {
        await this.checkoutContainer.waitFor({
            state: 'visible'
        });
    }

    async verifyPaymentSection() {
        await this.page.getByText(/Payment Method/i).first().waitFor({
            state: 'visible'
        });
    }
}