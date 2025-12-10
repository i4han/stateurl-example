import { test } from '@playwright/test'

test('check console errors', async ({ page }) => {
    const errors: string[] = []
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text())
        }
    })
    
    page.on('pageerror', error => {
        errors.push(error.message)
    })
    
    await page.goto('/app/v1/light/home')
    await page.waitForTimeout(2000)
    
    if (errors.length > 0) {
        console.log('=== CONSOLE ERRORS ===')
        errors.forEach(err => console.log(err))
        console.log('======================')
    } else {
        console.log('✅ No console errors')
    }
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/page-state.png', fullPage: true })
    console.log('📸 Screenshot saved to test-results/page-state.png')
})
