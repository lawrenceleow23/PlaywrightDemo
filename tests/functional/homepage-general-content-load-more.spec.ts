// Suite: Homepage General Content
// Purpose: Validate the directly attached Load More workflow through its end state.
// Coverage Scope: General Content card expansion and action-triggered network evidence.
// Covered Features: Initial/final counts, six-card increase, card fields, hidden control, request/response evidence.
// Covered User Journeys: Complete required bottom-scroll setup, count cards, expand once, verify final state.
// Run Entire Suite: npx playwright test tests/functional --project=chromium
// Run Spec: npx playwright test tests/functional/homepage-general-content-load-more.spec.ts --project=chromium
// Run Test: npx playwright test tests/functional/homepage-general-content-load-more.spec.ts --project=chromium -g "Exercise Load More through its end state and capture network evidence"
// Headed Run: npx playwright test tests/functional/homepage-general-content-load-more.spec.ts --project=chromium --headed
// Report: npx playwright show-report

import { test, expect, captureScreenshot, attachJson, dismissBlockingOverlay, redactEvidenceText } from '../support/helper';
import type { Request } from '@playwright/test';

const homepageUrl = 'https://websparks-stg.sitefinity.cloud/';

async function captureRequest(request: Request): Promise<Record<string, unknown>> {
  const evidence: Record<string, unknown> = {
    url: redactEvidenceText(request.url()),
    method: request.method(),
    payload: redactEvidenceText(request.postData()),
    resourceType: request.resourceType(),
  };
  try {
    const response = await request.response();
    evidence.timing = request.timing();
    if (!response) {
      evidence.responseError = request.failure()?.errorText ?? 'No response was available.';
      return evidence;
    }
    evidence.status = response.status();
    evidence.contentType = response.headers()['content-type'] ?? null;
    try {
      evidence.responseBody = redactEvidenceText((await response.body()).toString('utf8'));
    } catch (error) {
      evidence.responseBodyReadError = error instanceof Error ? error.message : String(error);
    }
  } catch (error) {
    evidence.timing = request.timing();
    evidence.responseCaptureError = error instanceof Error ? error.message : String(error);
  }
  return evidence;
}

test.describe('Homepage General Content', () => {
  test('Exercise Load More through its end state and capture network evidence', async ({ page }, testInfo) => {
    // 1. Open a fresh homepage and perform the required bottom-scroll setup.
    await page.goto(homepageUrl);
    await page.keyboard.press('End');

    // 2. Dismiss a blocker only if it appeared, verify it is closed, return to the top, and verify initial state.
    await dismissBlockingOverlay(page);
    await expect(page.getByRole('dialog')).toBeHidden();
    await page.keyboard.press('Home');
    await dismissBlockingOverlay(page);
    await expect(page.getByRole('dialog')).toBeHidden();

    const cards = page.locator('#general-articles a.general-post');
    const initialCount = await cards.count();
    expect(initialCount, 'The source-required bottom-scroll setup should preserve the initial General Content count.').toBe(3);

    // 3. Bring the directly attached control into view, handle any blocker caused by scrolling, and capture the starting state.
    const loadMore = page.getByRole('button', { name: /load more/i });
    await loadMore.scrollIntoViewIfNeeded();
    await dismissBlockingOverlay(page);
    await expect(page.getByRole('dialog')).toBeHidden();
    await captureScreenshot(page, testInfo, 'T1a-General-Content-Initial');

    // 4. Observe same-origin XHR/fetch traffic before activating Load More once.
    const origin = new URL(homepageUrl).origin;
    const requestPromises: Promise<Record<string, unknown>>[] = [];
    const onRequest = (request: Request) => {
      if (new URL(request.url()).origin !== origin) return;
      if (request.resourceType() !== 'xhr' && request.resourceType() !== 'fetch') return;
      requestPromises.push(captureRequest(request));
    };

    page.on('request', onRequest);
    try {
      await dismissBlockingOverlay(page);
      await expect(page.getByRole('dialog')).toBeHidden();
      await loadMore.click();

      // 5. Verify six added cards, visible fields, the final total, and hidden end-state control.
      await expect(cards).toHaveCount(initialCount + 6);
      await expect(cards).toHaveCount(9);
      await expect(page.getByRole('button', { name: /load more/i })).toBeHidden();
      for (const card of await cards.all()) {
        const image = card.locator('img[alt]');
        await expect(image).toBeVisible();
        await expect(image).not.toHaveAttribute('alt', /^\s*$/);
        await expect(card.locator('.tag').first()).toBeVisible();
        await expect(card.locator('.general-info p').nth(0)).toBeVisible();
        await expect(card.locator('.general-info p').nth(1)).toBeVisible();
      }

      await dismissBlockingOverlay(page);
      await expect(page.getByRole('dialog')).toBeHidden();
      page.off('request', onRequest);
      const requests = await Promise.all(requestPromises);
      await attachJson(testInfo, 'T1-Load-More-Network.json', {
        action: 'One activation of the directly attached Load More control',
        initialCount,
        finalCount: await cards.count(),
        cardsAdded: await cards.count() - initialCount,
        resultingState: 'Nine scoped cards are rendered and Load More is hidden.',
        requests: requests.length ? requests : 'No same-origin XHR/fetch requests were observed during the action.',
      });
      await captureScreenshot(page, testInfo, 'T1b-General-Content-Expanded');
    } finally {
      page.off('request', onRequest);
    }
  });
});
