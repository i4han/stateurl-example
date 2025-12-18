import { test, expect } from '@playwright/test'

// Apply mobile viewport to entire file
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

test.describe('Mobile Drawer Menu', () => {
    test('should show hamburger button on mobile', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Hamburger button should be visible
        const hamburgerBtn = page.locator('.hamburger-btn')
        await expect(hamburgerBtn).toBeVisible()

        // Side nav should be hidden initially (off-screen)
        const sideNav = page.locator('aside.side-nav')
        await expect(sideNav).not.toHaveClass(/mobile-open/)
    })

    test('should open drawer menu when hamburger is clicked', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Click hamburger button
        await page.click('.hamburger-btn')

        // Side nav should now have mobile-open class
        const sideNav = page.locator('aside.side-nav')
        await expect(sideNav).toHaveClass(/mobile-open/)

        // Overlay should be visible
        const overlay = page.locator('.mobile-overlay')
        await expect(overlay).toHaveClass(/open/)
    })

    test('should close drawer when clicking overlay', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Open menu
        await page.click('.hamburger-btn')
        await expect(page.locator('aside.side-nav')).toHaveClass(/mobile-open/)

        // Click overlay to close
        await page.click('.mobile-overlay')

        // Menu should be closed
        await expect(page.locator('aside.side-nav')).not.toHaveClass(/mobile-open/)
    })

    test('should navigate using drawer menu', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Open menu
        await page.click('.hamburger-btn')
        await expect(page.locator('aside.side-nav')).toHaveClass(/mobile-open/)

        // Click Counter link
        await page.click('aside a:has-text("Counter")')
        await expect(page).toHaveURL('/app/v1/light/counter')
        await expect(page.locator('h2')).toContainText('Counter')

        // Menu should auto-close after navigation
        await expect(page.locator('aside.side-nav')).not.toHaveClass(/mobile-open/)
    })

    test('should show active menu item in drawer', async ({ page }) => {
        await page.goto('/app/v1/light/counter')

        // Open menu
        await page.click('.hamburger-btn')

        // Counter link should be active
        const counterLink = page.locator('aside a:has-text("Counter")')
        await expect(counterLink).toHaveClass(/active/)
    })

    test('should close drawer with escape key', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Open menu
        await page.click('.hamburger-btn')
        await expect(page.locator('aside.side-nav')).toHaveClass(/mobile-open/)

        // Press escape
        await page.keyboard.press('Escape')

        // Menu should be closed
        await expect(page.locator('aside.side-nav')).not.toHaveClass(/mobile-open/)
    })

    test('should toggle hamburger icon to X when open', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Initially not open
        const hamburgerIcon = page.locator('.hamburger-icon')
        await expect(hamburgerIcon).not.toHaveClass(/open/)

        // Click to open
        await page.click('.hamburger-btn')
        await expect(hamburgerIcon).toHaveClass(/open/)

        // Click to close
        await page.click('.hamburger-btn')
        await expect(hamburgerIcon).not.toHaveClass(/open/)
    })
})

test.describe('Mobile Header', () => {
    test('should display header correctly on mobile', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Header should be visible
        const header = page.locator('header.top-menu')
        await expect(header).toBeVisible()

        // Logo should be visible
        const logo = page.locator('.logo')
        await expect(logo).toBeVisible()

        // Hamburger button should be visible
        const hamburgerBtn = page.locator('.hamburger-btn')
        await expect(hamburgerBtn).toBeVisible()

        // Nav controls should be visible (theme toggle)
        const themeToggle = page.locator('.control-btn:last-child')
        await expect(themeToggle).toBeVisible()
    })

    test('should toggle theme on mobile', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Click theme toggle
        const themeToggle = page.locator('.control-btn:last-child')
        await themeToggle.click()

        // URL should change to dark theme
        await expect(page).toHaveURL('/app/v1/dark/home')
    })

    test('should hide nav links on mobile', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Nav links (GitHub, npm, Docs) should be hidden on mobile
        const navLinks = page.locator('.nav-links')
        await expect(navLinks).not.toBeVisible()
    })
})

test.describe('Mobile Content', () => {
    test('should display main content properly', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Main content should be visible
        const mainContent = page.locator('.main-content')
        await expect(mainContent).toBeVisible()

        // Content should not be hidden behind menu
        const h2 = page.locator('h2')
        await expect(h2).toContainText('Welcome to StateURL')
    })

    test('should not have horizontal page overflow', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth)
        const viewportWidth = await page.evaluate(() => window.innerWidth)

        // Page should not have horizontal overflow
        expect(documentWidth).toBeLessThanOrEqual(viewportWidth + 1)
    })

    test('should preserve features across navigation', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Toggle to dark theme
        await page.locator('.control-btn:last-child').click()
        await expect(page).toHaveURL('/app/v1/dark/home')

        // Open menu and navigate
        await page.click('.hamburger-btn')
        await page.click('aside a:has-text("Counter")')
        await expect(page).toHaveURL('/app/v1/dark/counter')
    })
})

test.describe('Mobile Interaction', () => {
    test('should work with touch interactions', async ({ page }) => {
        await page.goto('/app/v1/light/counter')

        // Find and tap increment button
        const incrementBtn = page.locator('button:has-text("Increment")')
        await incrementBtn.tap()

        // Counter should increment
        await expect(page).toHaveURL(/count=1/)
    })

    test('should handle back/forward navigation', async ({ page }) => {
        await page.goto('/app/v1/light/home')

        // Navigate to Counter via drawer
        await page.click('.hamburger-btn')
        await page.click('aside a:has-text("Counter")')
        await expect(page).toHaveURL('/app/v1/light/counter')

        // Navigate to Products
        await page.click('.hamburger-btn')
        await page.click('aside a:has-text("Products")')
        await expect(page).toHaveURL('/app/v1/light/products')

        // Go back
        await page.goBack()
        await expect(page).toHaveURL('/app/v1/light/counter')

        // Go forward
        await page.goForward()
        await expect(page).toHaveURL('/app/v1/light/products')
    })
})

test.describe('Mobile Screenshots', () => {
    test('screenshot - mobile home page', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        await page.waitForLoadState('networkidle')
        await page.screenshot({ path: 'test-results/mobile-home.png', fullPage: true })
    })

    test('screenshot - mobile drawer open', async ({ page }) => {
        await page.goto('/app/v1/light/home')
        await page.waitForLoadState('networkidle')
        await page.click('.hamburger-btn')
        await page.waitForTimeout(300) // Wait for animation
        await page.screenshot({ path: 'test-results/mobile-drawer-open.png', fullPage: false })
    })

    test('screenshot - mobile dark theme', async ({ page }) => {
        await page.goto('/app/v1/dark/home')
        await page.waitForLoadState('networkidle')
        await page.screenshot({ path: 'test-results/mobile-home-dark.png', fullPage: true })
    })
})
