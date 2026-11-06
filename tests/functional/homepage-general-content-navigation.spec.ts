// Suite: Homepage General Content
// Purpose: Validate the initial in-scope General Content cards and representative image navigation.
// Coverage Scope: Homepage General Content only, plus the representative article URL/page type.
// Covered Features: Initial count, image alt, category labels, title, standfirst, image click-through.
// Covered User Journeys: Complete required bottom-scroll setup, inspect initial cards, open one article from its image.
// Run Entire Suite: npx playwright test tests/functional --project=chromium
// Run Spec: npx playwright test tests/functional/homepage-general-content-navigation.spec.ts --project=chromium
// Run Test: npx playwright test tests/functional/homepage-general-content-navigation.spec.ts --project=chromium -g "Verify initial General Content cards and representative image navigation"
// Headed Run: npx playwright test tests/functional/homepage-general-content-navigation.spec.ts --project=chromium --headed
// Report: npx playwright show-report

import { test, expect, captureScreenshot, dismissBlockingOverlay } from '../support/helper';

const homepageUrl = 'https://websparks-stg.sitefinity.cloud/';
const representativeArticlePath = '/article/a-new-role-for-ai-in-speech-rehabilitation';

test.describe('Homepage General Content', () => {
  test('Verify initial General Content cards and representative image navigation', async ({ page }, testInfo) => {
    // 1. Open a fresh desktop homepage and perform the required bottom-scroll setup.
    await page.goto(homepageUrl);
    await page.keyboard.press('End');

    // 2. Dismiss a blocker only if it appeared, verify it is closed, return to the top, and verify initial state.
    await dismissBlockingOverlay(page);
    await expect(page.getByRole('dialog')).toBeHidden();
    await page.keyboard.press('Home');
    await dismissBlockingOverlay(page);
    await expect(page.getByRole('dialog')).toBeHidden();

    const cards = page.locator('#general-articles a.general-post');
    await expect(cards).toHaveCount(3);

    // 3. Verify visible card fields and meaningful image alternatives for the initial cards.
    for (const card of await cards.all()) {
      const image = card.locator('img[alt]');
      await expect(image).toBeVisible();
      await expect(image).not.toHaveAttribute('alt', /^\s*$/);
      await expect(card.locator('.tag').first()).toBeVisible();
      await expect(card.locator('.general-info p').nth(0)).toBeVisible();
      await expect(card.locator('.general-info p').nth(1)).toBeVisible();
    }

    // 4. Bring scoped cards into view, handle any blocker caused by scrolling, and capture the card state.
    const representativeImage = page.locator(`#general-articles a.general-post[href="${representativeArticlePath}"] img`);
    await representativeImage.scrollIntoViewIfNeeded();
    await dismissBlockingOverlay(page);
    await expect(page.getByRole('dialog')).toBeHidden();
    await captureScreenshot(page, testInfo, 'T1a-Initial-General-Content');

    // 5. Click the representative image and confirm only the destination URL and page type.
    await dismissBlockingOverlay(page);
    await expect(page.getByRole('dialog')).toBeHidden();
    await representativeImage.click();
    await expect(page).toHaveURL(new RegExp(`${representativeArticlePath.replaceAll('/', '\\/')}$`));
    expect(new URL(page.url()).pathname.split('/')[1]).toBe('article');
    await dismissBlockingOverlay(page);
    await expect(page.getByRole('dialog')).toBeHidden();
    await captureScreenshot(page, testInfo, 'T1b-Article-Destination');
  });
});
