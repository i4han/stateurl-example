import { test, expect } from '@playwright/test'

test.describe('Feature Flags', () => {
    test('should toggle theme feature', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        
        // Verify initial theme
        await expect(page.locator('.badge.theme')).toContainText('☀️ Light')
        const html = page.locator('html')
        await expect(html).toHaveAttribute('data-theme', 'light')
        
        // Toggle to dark
        await page.click('button:has-text("🌙 Dark Mode")')
        await expect(page).toHaveURL('/app/v1/dark/home')
        await expect(page.locator('.badge.theme')).toContainText('🌙 Dark')
        await expect(html).toHaveAttribute('data-theme', 'dark')
        
        // Toggle back to light
        await page.click('button:has-text("☀️ Light Mode")')
        await expect(page).toHaveURL('/app/v1/light/home')
        await expect(page.locator('.badge.theme')).toContainText('☀️ Light')
        await expect(html).toHaveAttribute('data-theme', 'light')
    })

    test('should toggle version feature', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        
        // Verify initial version
        await expect(page.locator('.badge.version')).toContainText('v1')
        
        // Toggle to v2
        await page.click('button:has-text("Toggle Version")')
        await expect(page).toHaveURL('/app/v2/light/home')
        await expect(page.locator('.badge.version')).toContainText('v2')
        
        // Toggle back to v1
        await page.click('button:has-text("Toggle Version")')
        await expect(page).toHaveURL('/app/v1/light/home')
        await expect(page.locator('.badge.version')).toContainText('v1')
    })

    test('should persist features across navigation', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        
        // Change to dark theme
        await page.click('button:has-text("🌙 Dark Mode")')
        await expect(page).toHaveURL('/app/v1/dark/home')
        
        // Navigate to another page
        await page.click('text=⚙️ Settings')
        await expect(page).toHaveURL('/app/v1/dark/settings')
        await expect(page.locator('.badge.theme')).toContainText('🌙 Dark')
        
        // Navigate to counter
        await page.click('text=🔢 Counter')
        await expect(page).toHaveURL('/app/v1/dark/counter')
        await expect(page.locator('.badge.theme')).toContainText('🌙 Dark')
    })
})
