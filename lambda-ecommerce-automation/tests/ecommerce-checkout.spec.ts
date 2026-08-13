import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('E-Commerce Purchase Flow', () => {

    test('Login -> Search -> Add to Cart -> Checkout', async ({ page }) => {

        // -------------------------
        // 1. Login
        // -------------------------

        const loginPage = new LoginPage(page);

        await page.goto(
            'https://ecommerce-playground.lambdatest.io/index.php?route=account/login'
        );

        await loginPage.login(
            'test@123gmail.com',
            'test@gmail.com'
        );

        // Verify successful login
        await expect(page).toHaveURL(/route=account\/account/);


        
        // 2. Search Product
    

        const homePage = new HomePage(page);

        await page.goto(
            'https://ecommerce-playground.lambdatest.io/'
        );

        await homePage.searchProduct('iPhone');

        // Verify search results page
        await expect(page).toHaveURL(/search/);


        
        // 3. Select Product


        const productPage = new ProductPage(page);

        await productPage.selectProduct();

        // Verify product page contains iPhone
        await expect(
            page.getByText('iPhone', { exact: true }).first()
        ).toBeVisible();


        
        // 4. Add to Cart
    

        await productPage.addToCart();

        // Verify cart notification
        await productPage.verifyAddedToCart();


        
        // 5. Open Cart
        

        const cartPage = new CartPage(page);

        await cartPage.openCart();

        // Verify product is in cart
        await cartPage.verifyProduct();


        // 6. Proceed to Checkout
        

        await cartPage.proceedToCheckout();


    
        // 7. Verify Checkout
        

        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.verifyCheckoutPage();

        await checkoutPage.verifyPaymentSection();

        // Final assertion:
        // User successfully reached payment section
        await expect(page.getByText(/Payment Method/i).first())
            .toBeVisible();
    });
});