import { test, expect } from '@playwright/test'

test.describe('Via Navigation Component', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/app/v1/light/via-demo')
    })

    test.describe('Page Load & Display', () => {
        test('should load via demo page correctly', async ({ page }) => {
            await expect(page).toHaveURL('/app/v1/light/via-demo')
            await expect(page.locator('h2')).toContainText('Via Navigation (v2.0)')
            
            // Verify main description
            await expect(page.locator('section')).toContainText(
                'provides semantic navigation using 6-level priority search'
            )
        })

        test('should display all 6 demo sections', async ({ page }) => {
            // Section 1: Absolute Paths
            await expect(page.locator('h3:has-text("1. Absolute Paths")')).toBeVisible()
            
            // Section 2: Smart Search
            await expect(page.locator('h3:has-text("2. Smart Search")')).toBeVisible()
            
            // Section 3: Hierarchical Paths
            await expect(page.locator('h3:has-text("3. Hierarchical Paths")')).toBeVisible()
            
            // Section 4: Params
            await expect(page.locator('h3:has-text("4. Params")')).toBeVisible()
            
            // Section 5: Integration
            await expect(page.locator('h3:has-text("5. Integration")')).toBeVisible()
            
            // Section 6: Key Differences
            await expect(page.locator('h3:has-text("6. Key Differences")')).toBeVisible()
        })

        test('should display current location', async ({ page }) => {
            const currentLocation = page.locator('.current-location')
            await expect(currentLocation).toBeVisible()
            await expect(currentLocation).toContainText('Current Location:')
            await expect(currentLocation).toContainText('/app/v1/light/via-demo')
        })
    })

    test.describe('Absolute Path Navigation', () => {
        test('should navigate to home via absolute path', async ({ page }) => {
            await page.click('button:has-text("via(\'/home\')")')
            await expect(page).toHaveURL('/app/v1/light/home')
        })

        test('should navigate to products via absolute path', async ({ page }) => {
            await page.click('button:has-text("via(\'/products\')")')
            await expect(page).toHaveURL('/app/v1/light/products')
        })

        test('should navigate to users via absolute path', async ({ page }) => {
            await page.click('button:has-text("via(\'/users\')")')
            await expect(page).toHaveURL('/app/v1/light/users')
        })

        test('should navigate to settings via absolute path', async ({ page }) => {
            await page.click('button:has-text("via(\'/settings\')")')
            await expect(page).toHaveURL('/app/v1/light/settings')
        })
    })

    test.describe('Smart Search Results', () => {
        test('should show result for via counter', async ({ page }) => {
            await page.click('button:has-text("via(\'counter\')")')
            
            // Wait for result to appear
            const result = page.locator('.via-result')
            await expect(result).toBeVisible()
            await expect(result).toContainText('via(\'counter\')')
            await expect(result).toContainText('/counter')
        })

        test('should show result for via settings', async ({ page }) => {
            await page.click('button:has-text("via(\'settings\')"):first')
            
            const result = page.locator('.via-result')
            await expect(result).toBeVisible()
            await expect(result).toContainText('via(\'settings\')')
            await expect(result).toContainText('/settings')
        })

        test('should show result for via about', async ({ page }) => {
            await page.click('button:has-text("via(\'about\')")')
            
            const result = page.locator('.via-result')
            await expect(result).toBeVisible()
            await expect(result).toContainText('via(\'about\')')
            await expect(result).toContainText('/about')
        })
    })

    test.describe('Hierarchical Navigation', () => {
        test('should navigate to product detail with hierarchical path', async ({ page }) => {
            await page.click('button:has-text("via(\'products/item:1\')")')
            await expect(page).toHaveURL('/app/v1/light/products/item/1')
            
            // Verify product detail is displayed
            await expect(page.locator('h3')).toContainText('Laptop')
        })

        test('should navigate to user profile with hierarchical path', async ({ page }) => {
            await page.click('button:has-text("via(\'users/profile:2\')")')
            await expect(page).toHaveURL('/app/v1/light/users/profile/2')
            
            // Verify user detail is displayed
            await expect(page.locator('h3')).toContainText('Bob Smith')
        })

        test('should navigate to product 3 with hierarchical path', async ({ page }) => {
            await page.click('button:has-text("via(\'products/item:3\')")')
            await expect(page).toHaveURL('/app/v1/light/products/item/3')
            
            // Verify product detail is displayed
            await expect(page.locator('h3')).toContainText('Keyboard')
        })
    })

    test.describe('Param Syntax', () => {
        test('should navigate with via item 1', async ({ page }) => {
            await page.click('button:has-text("via(\'item:1\')")')
            await expect(page).toHaveURL('/app/v1/light/products/item/1')
        })

        test('should navigate with via item 2', async ({ page }) => {
            await page.click('button:has-text("via(\'item:2\')")')
            await expect(page).toHaveURL('/app/v1/light/products/item/2')
        })

        test('should navigate with via profile 1', async ({ page }) => {
            await page.click('button:has-text("via(\'profile:1\')")')
            await expect(page).toHaveURL('/app/v1/light/users/profile/1')
        })

        test('should navigate with via profile 3', async ({ page }) => {
            await page.click('button:has-text("via(\'profile:3\')")')
            await expect(page).toHaveURL('/app/v1/light/users/profile/3')
        })
    })

    test.describe('Integration with go()', () => {
        test('should navigate using go via counter', async ({ page }) => {
            await page.click('button:has-text("go(via(\'counter\'))")')
            await expect(page).toHaveURL('/app/v1/light/counter')
            
            // Verify counter page is displayed
            await expect(page.locator('h2')).toContainText('Counter')
        })

        test('should navigate using go via products', async ({ page }) => {
            await page.click('button:has-text("go(via(\'products\'))")')
            await expect(page).toHaveURL('/app/v1/light/products')
            
            // Verify products page is displayed
            await expect(page.locator('h2')).toContainText('Products')
        })
    })

    test.describe('Result Display', () => {
        test('should display via result after button click', async ({ page }) => {
            // Initially no result
            await expect(page.locator('.via-result')).not.toBeVisible()
            
            // Click a non-navigating button
            await page.click('button:has-text("via(\'counter\')"):first')
            
            // Result should appear
            const result = page.locator('.via-result')
            await expect(result).toBeVisible()
            await expect(result).toContainText('Last Result:')
            await expect(result).toContainText('via(\'counter\')')
        })

        test('should update current location after navigation', async ({ page }) => {
            // Navigate to different page
            await page.click('button:has-text("via(\'/home\')")')
            await expect(page).toHaveURL('/app/v1/light/home')
            
            // Go back to via-demo
            await page.click('text=Via Navigation')
            await expect(page).toHaveURL('/app/v1/light/via-demo')
            
            // Current location should show via-demo
            const currentLocation = page.locator('.current-location code')
            await expect(currentLocation).toContainText('/app/v1/light/via-demo')
        })
    })

    test.describe('Context-Aware Navigation', () => {
        test('should find routes from different contexts', async ({ page }) => {
            // From via-demo, navigate to products
            await page.click('button:has-text("via(\'/products\')")')
            await expect(page).toHaveURL('/app/v1/light/products')
            
            // Go back to via-demo
            await page.click('text=Via Navigation')
            
            // Now try relative navigation - should still work
            await page.click('button:has-text("via(\'counter\')"):first')
            
            const result = page.locator('.via-result')
            await expect(result).toContainText('/counter')
        })
    })
})
