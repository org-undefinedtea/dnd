import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visit root path', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Get notified when we are launching.')
})
