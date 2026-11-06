// Suite: Desktop Lighthouse Audits
// Purpose: Audit the representative homepage on Chromium Desktop.
// Coverage Scope: Homepage Lighthouse SEO, accessibility, best practices, and performance.
// Covered Features: Threshold checks, saved and attached HTML/JSON reports, score evidence, screenshot.
// Covered User Journeys: Open the representative homepage and run one desktop Lighthouse audit.
// Run Entire Suite: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts
// Run Spec: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/homepage-lighthouse.spec.ts --project=chromium-lighthouse
// Run Test: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/homepage-lighthouse.spec.ts --project=chromium-lighthouse -g "Audit representative homepage with Lighthouse on Chromium Desktop"
// Headed Run: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/homepage-lighthouse.spec.ts --project=chromium-lighthouse --headed
// Report: npx playwright show-report playwright-report/lighthouse

import { test } from '../support/helper';
import { auditDesktopPage } from '../support/lighthouse';

test.describe('Desktop Lighthouse Audits', () => {
  test('Audit representative homepage with Lighthouse on Chromium Desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-lighthouse', 'Run with the dedicated Lighthouse configuration.');

    // 1. Audit the representative homepage and attach its score evidence and report.
    await auditDesktopPage(page, testInfo, 'T1-Homepage', 'https://websparks-stg.sitefinity.cloud/');
  });
});
