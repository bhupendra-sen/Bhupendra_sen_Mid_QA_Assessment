import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private emailInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;

    constructor(private page: Page) {
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[type="submit"][value="Login"]');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}