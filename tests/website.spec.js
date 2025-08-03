const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Luxshan Portfolio Website', () => {
  const websiteUrl = `file://${path.resolve(__dirname, '../index.html')}`;

  test('should load the homepage successfully', async ({ page }) => {
    await page.goto(websiteUrl);
    await expect(page).toHaveTitle(/Luxshan Thavarasa/);
    
    // Check if main heading is visible
    await expect(page.locator('h1')).toContainText('Luxshan Thavarasa');
  });

  test('should have dark/light theme toggle', async ({ page }) => {
    await page.goto(websiteUrl);
    
    // Find theme toggle button
    const themeToggle = page.locator('.theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // Test theme switching
    await themeToggle.click();
    await expect(themeToggle).toContainText('Light Mode');
    
    // Switch back
    await themeToggle.click();
    await expect(themeToggle).toContainText('Dark Mode');
  });

  test('should have all main sections', async ({ page }) => {
    await page.goto(websiteUrl);
    
    // Check all main sections exist
    const sections = [
      '#about',
      '#experience', 
      '#education',
      '#projects',
      '#publications',
      '#skills',
      '#certifications',
      '#awards',
      '#contact'
    ];
    
    for (const section of sections) {
      await expect(page.locator(section)).toBeVisible();
    }
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto(websiteUrl);
    
    // Test navigation link
    await page.click('a[href="#about"]');
    await expect(page.locator('#about')).toBeInViewport();
  });

  test('should display professional content', async ({ page }) => {
    await page.goto(websiteUrl);
    
    // Check for professional elements
    await expect(page.locator('text=Software Engineer')).toBeVisible();
    await expect(page.locator('text=H2O.ai')).toBeVisible();
    await expect(page.locator('text=University of Moratuwa')).toBeVisible();
  });

  test('should have contact information', async ({ page }) => {
    await page.goto(websiteUrl);
    
    // Check contact links are present
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
    await expect(page.locator('a[href*="linkedin"]')).toBeVisible();
    await expect(page.locator('a[href*="github"]')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(websiteUrl);
    
    // Check if header adjusts for mobile
    const header = page.locator('.header');
    await expect(header).toBeVisible();
    
    // Navigation should still be accessible
    await expect(page.locator('.nav-links')).toBeVisible();
  });
});