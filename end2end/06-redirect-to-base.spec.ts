import { test, expect } from '@playwright/test'

test.describe('redirectToBase Feature', () => {
    test('should redirect from root to base path with defaults', async ({
        page,
    }) => {
        // Navigate to root path
        await page.goto('/')

        // Should redirect to /app/v1/light/home
        await expect(page).toHaveURL('/app/v1/light/home')

        // Verify the page content loaded correctly
        await expect(page.locator('h2')).toContainText(
            'Welcome to StateURL Example',
        )
    })

    test('should redirect without trailing slash', async ({ page }) => {
        // Navigate to root without trailing slash
        await page.goto('http://localhost:8000')

        // Should redirect to full base path
        await expect(page).toHaveURL('/app/v1/light/home')
    })

    test('should use history.replaceState (no back button to root)', async ({
        page,
    }) => {
        // First visit another page to establish history
        await page.goto('/app/v1/light/about')
        await expect(page).toHaveURL('/app/v1/light/about')

        // Navigate to root
        await page.goto('/')

        // Should be at /app/v1/light/home
        await expect(page).toHaveURL('/app/v1/light/home')

        // Try to go back
        await page.goBack()

        // Should go back to about page, NOT root (because redirect used replaceState)
        await expect(page).toHaveURL('/app/v1/light/about')
    })

    test('should include all base pattern defaults in redirect', async ({
        page,
    }) => {
        await page.goto('/')

        const url = page.url()

        // Verify all basePattern segments are present
        expect(url).toContain('/app/') // basename
        expect(url).toContain('/v1/') // version default
        expect(url).toContain('/light/') // theme default
        expect(url).toContain('/home') // default route
    })

    test('should redirect to index route (home)', async ({ page }) => {
        await page.goto('/')

        // Should redirect to the route marked with index: true
        await expect(page).toHaveURL('/app/v1/light/home')

        // Verify it's the home component
        await expect(page.locator('h2')).toContainText(
            'Welcome to StateURL Example',
        )
    })

    test('should only redirect once (not loop)', async ({ page }) => {
        // Set up console listener to catch redirect logs
        const logs: string[] = []
        page.on('console', (msg) => {
            if (msg.text().includes('redirectToBase')) {
                logs.push(msg.text())
            }
        })

        await page.goto('/')

        // Wait for redirect to complete
        await page.waitForURL('/app/v1/light/home')

        // Should only see one redirect log
        const redirectLogs = logs.filter((log) =>
            log.includes('redirecting from'),
        )
        expect(redirectLogs.length).toBe(1)
    })

    test('should not redirect when already on a valid path', async ({
        page,
    }) => {
        // Navigate to a specific path (not root)
        await page.goto('/app/v1/light/counter')

        // Should stay on counter page
        await expect(page).toHaveURL('/app/v1/light/counter')
        await expect(page.locator('h2')).toContainText('Counter')
    })

    test('should work with different base pattern values', async ({ page }) => {
        // Test that redirect works with v1 (default)
        await page.goto('/')
        await expect(page).toHaveURL('/app/v1/light/home')

        // Navigate to different version
        await page.goto('/app/v2/dark/counter')
        await expect(page).toHaveURL('/app/v2/dark/counter')

        // Root should still redirect to defaults
        await page.goto('/')
        await expect(page).toHaveURL('/app/v1/light/home')
    })

    test('should preserve hash when redirecting', async ({ page }) => {
        // Navigate to root with hash
        await page.goto('/#section-1')

        // Should redirect but preserve hash
        await page.waitForURL('/app/v1/light/home#section-1')
        expect(page.url()).toContain('#section-1')
    })

    test('should preserve query params when redirecting', async ({ page }) => {
        // Navigate to root with query params
        await page.goto('/?debug=true&test=123')

        // Should redirect but preserve query
        await page.waitForURL('/app/v1/light/home?debug=true&test=123')
        expect(page.url()).toContain('debug=true')
        expect(page.url()).toContain('test=123')
    })
})

test.describe('redirectToBase Edge Cases', () => {
    test('should handle direct IP access', async ({ page }) => {
        // This simulates accessing via IP (like 10.222.26.99:8000)
        await page.goto('http://localhost:8000')

        await expect(page).toHaveURL('/app/v1/light/home')
    })

    test('should handle localhost with different ports', async ({ page }) => {
        // Access via explicit localhost
        await page.goto('http://localhost:8000/')

        await expect(page).toHaveURL('/app/v1/light/home')
    })

    test('should work after hard reload', async ({ page }) => {
        // Navigate to root
        await page.goto('/')
        await expect(page).toHaveURL('/app/v1/light/home')

        // Hard reload (simulating Ctrl+Shift+R)
        await page.reload({ waitUntil: 'networkidle' })

        // Should still be at /app/v1/light/home
        await expect(page).toHaveURL('/app/v1/light/home')
    })

    test('should work in incognito/private mode', async ({ browser }) => {
        // Create a new incognito context
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('/')
        await expect(page).toHaveURL('/app/v1/light/home')

        await context.close()
    })
})

test.describe('redirectToBase Performance', () => {
    test('should redirect without visible flash', async ({ page }) => {
        // Monitor for any 404 or error screens
        let sawNotFound = false
        page.on('response', (response) => {
            if (response.status() === 404) {
                sawNotFound = true
            }
        })

        await page.goto('/')
        await expect(page).toHaveURL('/app/v1/light/home')

        // Should not have seen a 404
        expect(sawNotFound).toBe(false)
    })

    test('should redirect quickly (< 500ms)', async ({ page }) => {
        const startTime = Date.now()

        await page.goto('/')
        await page.waitForURL('/app/v1/light/home')

        const redirectTime = Date.now() - startTime

        // Redirect should be fast (allow 500ms for network + processing)
        expect(redirectTime).toBeLessThan(500)
    })
})

test.describe('redirectToBase Console Output', () => {
    test('should log redirect in console (debug mode)', async ({ page }) => {
        const consoleLogs: string[] = []

        page.on('console', (msg) => {
            if (msg.type() === 'log') {
                consoleLogs.push(msg.text())
            }
        })

        await page.goto('/')
        await page.waitForURL('/app/v1/light/home')

        // Should see the redirect log
        const redirectLog = consoleLogs.find(
            (log) =>
                log.includes('[Router] redirectToBase') &&
                log.includes('redirecting'),
        )
        expect(redirectLog).toBeDefined()
        expect(redirectLog).toContain('/app/v1/light/home')
    })

    test('should log redirect check for debugging', async ({ page }) => {
        const consoleLogs: string[] = []

        page.on('console', (msg) => {
            consoleLogs.push(msg.text())
        })

        await page.goto('/')
        await page.waitForURL('/app/v1/light/home')

        // Should see the check log
        const checkLog = consoleLogs.find((log) =>
            log.includes('[Router] redirectToBase check'),
        )
        expect(checkLog).toBeDefined()
    })
})
