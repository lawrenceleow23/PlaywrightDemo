// Suite: Desktop Lighthouse Audits
// Purpose: Audit the representative article page type with Lighthouse on Chromium Desktop.
// Coverage Scope: Desktop Lighthouse categories for the one representative article destination only.
// Covered Features: SEO, accessibility, best practices, performance, report and screenshot evidence.
// Covered User Journeys: Open the previously identified representative article and run one Lighthouse audit.
// Run Entire Suite: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts
// Run Spec: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/article-lighthouse.spec.ts
// Run Test: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/article-lighthouse.spec.ts -g "Audit representative article with Lighthouse on Chromium Desktop"
// Headed Run: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/article-lighthouse.spec.ts --headed
// Report: npx playwright show-report playwright-report/lighthouse

import { test } from '../support/evidence';
import { auditDesktopPage } from '../support/lighthouse';

test.describe('Desktop Lighthouse Audits', () => {
  test('Audit representative article with Lighthouse on Chromium Desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-lighthouse', 'Run with the dedicated Lighthouse configuration.');

    // 1. Audit only the representative desktop article page and retain its Lighthouse evidence.
    await auditDesktopPage(
      page,
      testInfo,
      'T1-Representative-Article',
      'https://websparks-stg.sitefinity.cloud/article/a-new-role-for-ai-in-speech-rehabilitation',
    );
  });
});
