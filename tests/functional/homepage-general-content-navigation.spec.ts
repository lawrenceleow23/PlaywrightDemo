// Suite: Homepage General Content and directly attached Load More
// Purpose: Validate the initial Image & standfirst cards and representative article navigation.
// Coverage Scope: Homepage General Content and its representative image-to-article destination.
// Covered Features: Initial card count and fields, whole-image click-through, article page type.
// Covered User Journeys: Open homepage, inspect initial cards, open one article from its image.
// Run Entire Suite: npx playwright test
// Run Spec: npx playwright test tests/functional/homepage-general-content-navigation.spec.ts --project=chromium
// Run Test: npx playwright test tests/functional/homepage-general-content-navigation.spec.ts --project=chromium -g "Verify initial General Content cards and representative image navigation"
// Headed Run: npx playwright test tests/functional/homepage-general-content-navigation.spec.ts --project=chromium --headed
// Report: npx playwright show-report

import { test, expect } from '../support/evidence';
import { captureScreenshot, dismissBlockingOverlay } from '../support/helpers';

const homepageUrl = 'https://websparks-stg.sitefinity.cloud/';
const articlePath = '/article/a-new-role-for-ai-in-speech-rehabilitation';

test.describe('Homepage General Content and directly attached Load More', () => {
  test('Verify initial General Content cards and representative image navigation', async ({ page }, testInfo) => {
    // 1. Open the homepage and inspect its initial in-scope General Content cards.
    await page.goto(homepageUrl);
    await dismissBlockingOverlay(page);

    const cards = page.locator('#general-articles a.general-post');
    await expect(cards).toHaveCount(3);

    for (const card of await cards.all()) {
      await expect(card.locator('img[alt]')).toBeVisible();
      await expect(card.locator('img[alt]')).not.toHaveAttribute('alt', '');
      await expect(card.locator('.tag').first()).toBeVisible();
      await expect(card.locator('.general-info p').nth(0)).toBeVisible();
      await expect(card.locator('.general-info p').nth(1)).toBeVisible();
    }
    await captureScreenshot(page, testInfo, 'T1a-Initial-General-Content');

    // 2. Open one representative article from its whole image and confirm the destination page type.
    await dismissBlockingOverlay(page);
    await cards.first().locator('img').click();
    await expect(page).toHaveURL(new RegExp(`${articlePath.replaceAll('/', '\\/')}$`));
    await dismissBlockingOverlay(page);
    expect(new URL(page.url()).pathname.split('/')[1]).toBe('article');
    await captureScreenshot(page, testInfo, 'T1b-Article-Destination');
  });
});
