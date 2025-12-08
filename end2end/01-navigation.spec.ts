import { test, expect } from '@playwright/test'

test.describe('Basic Navigation', () => {
    test('should load home page with base pattern', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        await expect(page).toHaveURL('/app/v1/light/home')
        await expect(page.locator('h2')).toContainText('Welcome to StateURL Example')
    })

    test('should navigate using side menu', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        
        // Click Counter link
        await page.click('text=🔢 Counter (Query)')
        await expect(page).toHaveURL('/app/v1/light/counter')
        await expect(page.locator('h2')).toContainText('Counter')
        
        // Click Settings link
        await page.click('text=⚙️ Settings')
        await expect(page).toHaveURL('/app/v1/light/settings')
        await expect(page.locator('h2')).toContainText('Settings')
        
        // Click About link
        await page.click('text=ℹ️ About')
        await expect(page).toHaveURL('/app/v1/light/about')
        await expect(page.locator('h2')).toContainText('About')
    })

    test('should show active menu item', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        
        const homeLink = page.locator('aside a:has-text("🏠 Home")')
        await expect(homeLink).toHaveClass(/active/)
        
        await page.click('text=🔢 Counter')
        const counterLink = page.locator('aside a:has-text("🔢 Counter")')
        await expect(counterLink).toHaveClass(/active/)
    })
})
