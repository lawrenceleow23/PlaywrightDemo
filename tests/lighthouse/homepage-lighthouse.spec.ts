// Suite: Desktop Lighthouse Audits
// Purpose: Audit the representative homepage with Lighthouse on Chromium Desktop.
// Coverage Scope: Desktop Lighthouse categories for the homepage only.
// Covered Features: SEO, accessibility, best practices, performance, report and screenshot evidence.
// Covered User Journeys: Open the representative homepage and run one Lighthouse audit.
// Run Entire Suite: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts
// Run Spec: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/homepage-lighthouse.spec.ts
// Run Test: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/homepage-lighthouse.spec.ts -g "Audit homepage with Lighthouse on Chromium Desktop"
// Headed Run: npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts tests/lighthouse/homepage-lighthouse.spec.ts --headed
// Report: npx playwright show-report playwright-report/lighthouse

import { test } from '../support/evidence';
import { auditDesktopPage } from '../support/lighthouse';

test.describe('Desktop Lighthouse Audits', () => {
  test('Audit homepage with Lighthouse on Chromium Desktop', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-lighthouse', 'Run with the dedicated Lighthouse configuration.');

    // 1. Audit only the representative desktop homepage and retain its Lighthouse evidence.
    await auditDesktopPage(page, testInfo, 'T1-Homepage', 'https://websparks-stg.sitefinity.cloud/');
  });
});
