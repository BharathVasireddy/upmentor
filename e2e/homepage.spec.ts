import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the homepage correctly', async ({ page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle(/UpMentor/)

    // Check if the main heading is present
    await expect(page.locator('h1')).toContainText('Find Your Perfect Mentor')

    // Check if the CTA button is present
    await expect(page.locator('text=Get Started')).toBeVisible()
  })

  test('should navigate to registration page', async ({ page }) => {
    // Click the "Get Started" button
    await page.click('text=Get Started')

    // Check if we're redirected to registration page
    await expect(page).toHaveURL(/\/register/)
  })

  test('should display mentor cards', async ({ page }) => {
    // Check if mentor cards are visible
    await expect(page.locator('[data-testid="mentor-card"]')).toHaveCount(3)
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Check if mobile menu button is visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible()

    // Check if desktop navigation is hidden
    await expect(page.locator('[data-testid="desktop-nav"]')).toBeHidden()
  })

  test('should have working search functionality', async ({ page }) => {
    // Find and click the search input
    const searchInput = page.locator('input[placeholder*="Search"]')
    await searchInput.fill('engineering')

    // Submit the search
    await searchInput.press('Enter')

    // Check if we're redirected to mentors page with search params
    await expect(page).toHaveURL(/\/mentors\?.*search=engineering/)
  })
})

test.describe('Navigation', () => {
  test('should navigate to different pages', async ({ page }) => {
    await page.goto('/')

    // Test navigation to mentors page
    await page.click('text=Find Mentors')
    await expect(page).toHaveURL(/\/mentors/)

    // Go back to homepage
    await page.goto('/')

    // Test navigation to dashboard (should redirect to login if not authenticated)
    await page.click('text=Dashboard')
    await expect(page).toHaveURL(/\/register/)
  })
})

test.describe('Accessibility', () => {
  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/')

    // Check for main landmark
    await expect(page.locator('main')).toBeVisible()

    // Check for proper heading hierarchy
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()

    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      await expect(img).toHaveAttribute('alt')
    }
  })
}) 