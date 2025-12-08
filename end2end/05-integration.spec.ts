import { test, expect } from '@playwright/test'

test.describe('Integration Tests', () => {
    test('should combine features and params', async ({ page }) => {
        await page.goto('/app/v1/light/products')
        
        // Change theme
        await page.click('button:has-text("🌙 Dark Mode")')
        await expect(page).toHaveURL('/app/v1/dark/products')
        
        // Select product
        await page.click('text=Laptop')
        await expect(page).toHaveURL('/app/v1/dark/products/item1')
        
        // Theme should still be dark
        await expect(page.locator('.badge.theme')).toContainText('🌙 Dark')
        await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    })

    test('should combine features and query params', async ({ page }) => {
        await page.goto('/app/v2/light/counter')
        
        // Increment
        await page.click('button:has-text("➕ Increment")')
        await expect(page).toHaveURL('/app/v2/light/counter?count=1')
        
        // Change theme
        await page.click('button:has-text("🌙 Dark Mode")')
        await expect(page).toHaveURL('/app/v2/dark/counter?count=1')
        
        // Count should persist
        await expect(page.locator('.counter-display h3')).toContainText('Count: 1')
    })

    test('should handle not found routes', async ({ page }) => {
        await page.goto('/app/v1/light/nonexistent')
        await expect(page.locator('.not-found')).toContainText('404 - Not Found')
    })

    test('should display current path in footer', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        await expect(page.locator('footer code')).toContainText('/app/v1/light/home')
        
        await page.goto('/app/v1/dark/products/item2')
        await expect(page.locator('footer code')).toContainText('/app/v1/dark/products/item2')
    })
})
