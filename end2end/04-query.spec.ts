import { test, expect } from '@playwright/test'

test.describe('Query Parameters', () => {
    test('should initialize counter at 0', async ({ page }) => {
        await page.goto('/app/v1/light/counter')
        await expect(page).toHaveURL('/app/v1/light/counter')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 0')
    })

    test('should increment counter and update URL', async ({ page }) => {
        await page.goto('/app/v1/light/counter')
        
        await page.click('button:has-text("➕ Increment")')
        await expect(page).toHaveURL('/app/v1/light/counter?count=1')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 1')
        
        await page.click('button:has-text("➕ Increment")')
        await expect(page).toHaveURL('/app/v1/light/counter?count=2')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 2')
    })

    test('should decrement counter', async ({ page }) => {
        await page.goto('/app/v1/light/counter?count=5')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 5')
        
        await page.click('button:has-text("➖ Decrement")')
        await expect(page).toHaveURL('/app/v1/light/counter?count=4')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 4')
    })

    test('should reset counter', async ({ page }) => {
        await page.goto('/app/v1/light/counter?count=10')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 10')
        
        await page.click('button:has-text("🔄 Reset")')
        await expect(page).toHaveURL('/app/v1/light/counter')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 0')
    })

    test('should restore state from URL', async ({ page }) => {
        await page.goto('/app/v1/light/counter?count=42')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 42')
    })

    test('should work with browser back/forward', async ({ page }) => {
        await page.goto('/app/v1/light/counter')
        
        await page.click('button:has-text("➕ Increment")')
        await expect(page).toHaveURL('/app/v1/light/counter?count=1')
        
        await page.click('button:has-text("➕ Increment")')
        await expect(page).toHaveURL('/app/v1/light/counter?count=2')
        
        // Go back
        await page.goBack()
        await expect(page).toHaveURL('/app/v1/light/counter?count=1')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 1')
        
        // Go forward
        await page.goForward()
        await expect(page).toHaveURL('/app/v1/light/counter?count=2')
        await expect(page.locator('.counter-display h3')).toContainText('Count: 2')
    })
})
