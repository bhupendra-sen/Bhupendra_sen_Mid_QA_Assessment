import { Page, Locator } from '@playwright/test';

export class HomePage {
    private searchInput: Locator;

    constructor(private page: Page) {
        this.searchInput = page.getByRole('textbox', {
            name: 'Search For Products'
        }).first();
    }

    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
    }
}