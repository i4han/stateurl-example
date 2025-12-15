import { test, expect } from '@playwright/test'

test.describe('Basic Navigation', () => {
    test('should load home page with base pattern', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        await expect(page).toHaveURL('/app/v1/light/home')
        await expect(page.locator('h2')).toContainText('Welcome to StateURL Example')
    })

    test('should navigate using side menu', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Click Counter link in sidebar
        await page.click('aside a:has-text("Counter")')
        await expect(page).toHaveURL('/app/v1/light/counter')
        await expect(page.locator('h2')).toContainText('Counter')

        // Click Products link
        await page.click('aside a:has-text("Products")')
        await expect(page).toHaveURL('/app/v1/light/products')
        await expect(page.locator('h2')).toContainText('Products')

        // Click About link
        await page.click('aside a:has-text("About")')
        await expect(page).toHaveURL('/app/v1/light/about')
        await expect(page.locator('h2')).toContainText('About')
    })

    test('should show active menu item', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Home link should be active
        const homeLink = page.locator('aside a:has-text("Home")')
        await expect(homeLink).toHaveClass(/active/)

        // Click Counter and verify it becomes active
        await page.click('aside a:has-text("Counter")')
        const counterLink = page.locator('aside a:has-text("Counter")')
        await expect(counterLink).toHaveClass(/active/)
    })
})
