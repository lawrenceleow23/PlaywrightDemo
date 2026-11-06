// Suite: Homepage General Content and directly attached Load More
// Purpose: Validate the Load More workflow and its action-triggered API response.
// Coverage Scope: Homepage General Content cards and the attached Load More control through its end state.
// Covered Features: Initial and final counts, six-card expansion, card fields, request/response evidence, hidden end-state control.
// Covered User Journeys: Open homepage, inspect initial count, expand General Content once, verify final state.
// Run Entire Suite: npx playwright test
// Run Spec: npx playwright test tests/functional/homepage-general-content-load-more.spec.ts --project=chromium
// Run Test: npx playwright test tests/functional/homepage-general-content-load-more.spec.ts --project=chromium -g "Exercise Load More through its end state and capture network evidence"
// Headed Run: npx playwright test tests/functional/homepage-general-content-load-more.spec.ts --project=chromium --headed
// Report: npx playwright show-report

import { test, expect } from '../support/evidence';
import { captureScreenshot, attachJson, dismissBlockingOverlay } from '../support/helpers';

const homepageUrl = 'https://websparks-stg.sitefinity.cloud/';
const loadMoreEndpoint = '/api/ArticlesApi/LoadMoreArticles';

function getGeneralItemCount(body: unknown): number {
  if (typeof body !== 'object' || body === null || !('result' in body)) {
    throw new Error('Load More response did not contain a result object.');
  }
  const result = body.result;
  if (typeof result !== 'object' || result === null || !('GeneralItems' in result) || !Array.isArray(result.GeneralItems)) {
    throw new Error('Load More response did not contain a GeneralItems array.');
  }
  return result.GeneralItems.length;
}

test.describe('Homepage General Content and directly attached Load More', () => {
  test('Exercise Load More through its end state and capture network evidence', async ({ page }, testInfo) => {
    // 1. Open the homepage and record the initial scoped article count.
    await page.goto(homepageUrl);
    await dismissBlockingOverlay(page);

    const cards = page.locator('#general-articles a.general-post');
    const initialCount = await cards.count();
    expect(initialCount).toBe(3);

    // 2. Activate Load More once while capturing the action-triggered request and response.
    await dismissBlockingOverlay(page);
    const responsePromise = page.waitForResponse((response) =>
      response.url().endsWith(loadMoreEndpoint) && response.request().method() === 'POST',
    );
    await page.getByRole('button', { name: 'LOAD MORE' }).click();
    const response = await responsePromise;
    const request = response.request();
    const requestTiming = request.timing();
    const responseBody: unknown = await response.json();
    const contentType = response.headers()['content-type'] ?? '';
    const formData = request.postData() ?? '';
    const responseSummary = {
      generalItemsAdded: getGeneralItemCount(responseBody),
    };
    const durationMs = requestTiming.responseEnd >= 0 ? requestTiming.responseEnd - requestTiming.requestStart : null;
    const requestEvidence = {
      url: response.url(),
      method: request.method(),
      payload: formData,
      status: response.status(),
      contentType,
      durationMs,
      responseSummary,
    };

    expect(response.status()).toBe(200);
    expect(response.url()).toContain(loadMoreEndpoint);
    expect(request.method()).toBe('POST');
    expect(formData).toBe('loadMoreCount=1&pillarCategory=home');
    expect(contentType).toContain('application/json');
    expect(durationMs).not.toBeNull();
    expect(responseSummary.generalItemsAdded).toBe(6);
    await attachJson(testInfo, 'T1-Load-More-Network.json', requestEvidence);

    // 3. Verify six added cards, the final total, card format, and the hidden end-state control.
    await expect(cards).toHaveCount(initialCount + 6);
    await expect(cards).toHaveCount(9);
    for (const card of await cards.all()) {
      await expect(card.locator('img[alt]')).toBeVisible();
      await expect(card.locator('img[alt]')).not.toHaveAttribute('alt', '');
      await expect(card.locator('.tag').first()).toBeVisible();
      await expect(card.locator('.general-info p').nth(0)).toBeVisible();
      await expect(card.locator('.general-info p').nth(1)).toBeVisible();
    }
    await expect(page.getByRole('button', { name: 'LOAD MORE' })).toBeHidden();
    await captureScreenshot(page, testInfo, 'T1a-General-Content-Expanded');
  });
});
