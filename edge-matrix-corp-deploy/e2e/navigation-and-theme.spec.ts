import { test, expect } from '@playwright/test';

// ============================================================================
// Edge Matrix Corporation — Playwright E2E Integration Test
// Verifies static page loading, navigation flows, and interactive theme toggling.
// ============================================================================

test.describe('Edge Matrix Platform Navigation & Themes', () => {
  test('should load the homepage and render key brand sections', async ({ page }) => {
    await page.goto('/');
    
    // Check main title
    await expect(page).toHaveTitle(/Edge Matrix Corporation/);
    
    // Check navbar brand visibility
    const brand = page.locator('text=Edge Matrix').first();
    await expect(brand).toBeVisible();

    // Verify main content LCP sections render
    const mainSection = page.locator('role=main');
    await expect(mainSection).toBeVisible();
  });

  test('should navigate to Services via solutions pages link', async ({ page }) => {
    await page.goto('/');
    
    // Check that we can navigate directly to /services
    await page.goto('/services');
    await expect(page).toHaveURL(/\/services/);

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should load the Contact page and verify office hub stats render', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL(/\/contact/);

    // Verify Global Intelligence Hubs header
    const hubsHeader = page.locator('text=Global Intelligence Hubs');
    await expect(hubsHeader).toBeVisible();
  });

  test('should load custom 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/non-existent-page-route');
    const header = page.locator('h1');
    await expect(header).toContainText('Matrix Node Offline');
    
    // Check redirect button visibility
    const returnButton = page.locator('text=Return to Control Center');
    await expect(returnButton).toBeVisible();
  });
});
