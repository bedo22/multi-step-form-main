import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('full happy path — fill, select plan+addons, confirm, see thank you', async ({ page }) => {
  await expect(page.locator('[data-panel="1"]')).toBeVisible()
  await page.fill('#name', 'Stephen King')
  await page.fill('#email', 'stephen@king.com')
  await page.fill('#phone', '+1 234 567 890')
  await page.click('.step-panel.active .next-step')

  await expect(page.locator('[data-panel="2"]')).toBeVisible()
  await page.click('.plan-card[data-plan="advanced"]')
  await page.click('#billing-toggle')
  await page.click('.step-panel.active .next-step')

  await expect(page.locator('[data-panel="3"]')).toBeVisible()
  await page.click('.addon-row[data-addon="online"]')
  await page.click('.addon-row[data-addon="storage"]')
  await page.click('.step-panel.active .next-step')

  await expect(page.locator('[data-panel="4"]')).toBeVisible()
  await expect(page.locator('#summary-plan-name')).toHaveText('Advanced (Yearly)')
  await expect(page.locator('#summary-plan-price')).toHaveText('$120/yr')
  await expect(page.locator('#total-amount')).toContainText('+$150/yr')

  await page.click('#confirm-btn')

  await expect(page.locator('[data-panel="5"]')).toBeVisible()
  await expect(page.locator('.thank-you h1')).toHaveText('Thank you!')
})

test('validation — empty fields show errors and block progression', async ({ page }) => {
  await page.click('.step-panel.active .next-step')
  await expect(page.locator('[data-panel="1"]')).toBeVisible()
  await expect(page.locator('#name-error')).not.toBeEmpty()
  await expect(page.locator('.field.error')).toHaveCount(3)
})

test('validation — invalid email blocks progression', async ({ page }) => {
  await page.fill('#name', 'Stephen King')
  await page.fill('#email', 'not-an-email')
  await page.fill('#phone', '+1 234 567 890')
  await page.click('.step-panel.active .next-step')
  await expect(page.locator('[data-panel="1"]')).toBeVisible()
  await expect(page.locator('#email-error')).toHaveText('Valid email required')
})

test('go back preserves selections', async ({ page }) => {
  await page.fill('#name', 'Stephen King')
  await page.fill('#email', 'stephen@king.com')
  await page.fill('#phone', '+1 234 567 890')
  await page.click('.step-panel.active .next-step')

  await page.click('.plan-card[data-plan="pro"]')
  await page.click('#billing-toggle')
  await page.click('.step-panel.active .next-step')

  await page.click('.addon-row[data-addon="profile"]')
  await page.click('.step-panel.active .next-step')

  await page.click('.step-panel.active .go-back')
  await expect(page.locator('[data-panel="3"]')).toBeVisible()
  await expect(page.locator('.addon-row[data-addon="profile"]')).toHaveClass(/checked/)

  await page.click('.step-panel.active .go-back')
  await expect(page.locator('[data-panel="2"]')).toBeVisible()
  await expect(page.locator('.plan-card[data-plan="pro"]')).toHaveClass(/selected/)
  await expect(page.locator('.toggle-label.active')).toHaveText('Yearly')

  await page.click('.step-panel.active .go-back')
  await expect(page.locator('[data-panel="1"]')).toBeVisible()
  await expect(page.locator('#name')).toHaveValue('Stephen King')
})

test('change link on summary goes to step 2', async ({ page }) => {
  await page.fill('#name', 'Stephen King')
  await page.fill('#email', 'stephen@king.com')
  await page.fill('#phone', '+1 234 567 890')
  await page.click('.step-panel.active .next-step')
  await page.click('.step-panel.active .next-step')
  await page.click('.step-panel.active .next-step')

  await expect(page.locator('[data-panel="4"]')).toBeVisible()
  await page.click('#change-plan')
  await expect(page.locator('[data-panel="2"]')).toBeVisible()
})

test('yearly toggle shows 2 months free badges and updates prices', async ({ page }) => {
  await page.fill('#name', 'N')
  await page.fill('#email', 'n@n.com')
  await page.fill('#phone', '123')
  await page.click('.step-panel.active .next-step')

  await expect(page.locator('.plan-bonus').first()).not.toBeVisible()
  await page.click('#billing-toggle')
  await expect(page.locator('.plan-bonus').first()).toBeVisible()
  await expect(page.locator('.plan-price').first()).toHaveText('$90/yr')
})

test('sidebar step indicators highlight correctly', async ({ page }) => {
  await expect(page.locator('.step[data-step="1"]')).toHaveClass(/active/)

  await page.fill('#name', 'N')
  await page.fill('#email', 'n@n.com')
  await page.fill('#phone', '123')
  await page.click('.step-panel.active .next-step')
  await expect(page.locator('.step[data-step="2"]')).toHaveClass(/active/)
  await expect(page.locator('.step[data-step="1"]')).not.toHaveClass(/active/)
})
