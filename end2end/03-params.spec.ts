import { test, expect } from '@playwright/test'

test.describe('URL Params', () => {
    test('should show products list without selection', async ({ page }) => {
        await page.goto('/app/v1/light/products')
        await expect(page).toHaveURL('/app/v1/light/products')
        await expect(page.locator('h2')).toContainText('Products')
        await expect(page.locator('.placeholder')).toContainText('← Select a product')
    })

    test('should navigate to product detail', async ({ page }) => {
        await page.goto('/app/v1/light/products')
        
        // Click first product (Laptop)
        await page.click('text=Laptop')
        await expect(page).toHaveURL('/app/v1/light/products/item1')
        
        // Verify detail view
        await expect(page.locator('.detail-card h3')).toContainText('Laptop')
        await expect(page.locator('.detail-card .price')).toContainText('$999')
        await expect(page.locator('.param-info code')).toContainText('productId = 1')
    })

    test('should show active product in list', async ({ page }) => {
        await page.goto('/app/v1/light/products')
        
        await page.click('text=Mouse')
        const activeLink = page.locator('.product-items a.active')
        await expect(activeLink).toContainText('Mouse')
        await expect(page).toHaveURL('/app/v1/light/products/item2')
    })

    test('should navigate between products', async ({ page }) => {
        await page.goto('/app/v1/light/products/item1')
        
        // Click different product
        await page.click('text=Keyboard')
        await expect(page).toHaveURL('/app/v1/light/products/item3')
        await expect(page.locator('.detail-card h3')).toContainText('Keyboard')
        
        // Click another
        await page.click('text=Monitor')
        await expect(page).toHaveURL('/app/v1/light/products/item4')
        await expect(page.locator('.detail-card h3')).toContainText('Monitor')
    })

    test('should work with users params', async ({ page }) => {
        await page.goto('/app/v1/light/users')
        
        // Click user
        await page.click('text=Alice Johnson')
        await expect(page).toHaveURL('/app/v1/light/users/profile1')
        await expect(page.locator('.detail-card h3')).toContainText('Alice Johnson')
        await expect(page.locator('.param-info code')).toContainText('userId = 1')
    })
})
