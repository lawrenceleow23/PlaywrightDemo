import { join } from 'node:path';
import type { Page, TestInfo } from '@playwright/test';
import { expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import { attachFile, attachJson, captureScreenshot, dismissBlockingOverlay } from './helpers';

const thresholds = {
  seo: 90,
  accessibility: 90,
  'best-practices': 90,
  performance: 80,
};

export async function auditDesktopPage(page: Page, testInfo: TestInfo, pageName: string, url: string): Promise<void> {
  await page.goto(url);
  await dismissBlockingOverlay(page);

  const reportDirectory = testInfo.outputPath('lighthouse-reports');
  const result = await playAudit({
    page,
    port: 9222,
    thresholds,
    ignoreError: true,
    disableLogs: true,
    reports: {
      formats: { html: true, json: true },
      directory: reportDirectory,
      name: pageName,
    },
  });

  const scores: Record<string, number | null> = {};
  for (const category of Object.keys(thresholds)) {
    const score = result.lhr.categories[category]?.score;
    scores[category] = typeof score === 'number' ? score * 100 : null;
  }
  await attachJson(testInfo, `${pageName}-Lighthouse-Scores.json`, {
    url,
    deviceProfile: 'Chromium Desktop',
    thresholds,
    scores,
    comparisonError: result.comparisonError ?? null,
  });
  await attachFile(testInfo, `${pageName}-Lighthouse.html`, join(reportDirectory, `${pageName}.html`), 'text/html');
  await attachFile(testInfo, `${pageName}-Lighthouse.json`, join(reportDirectory, `${pageName}.json`), 'application/json');
  await captureScreenshot(page, testInfo, `${pageName}-Lighthouse`);

  expect(result.comparisonError ?? '', 'Lighthouse category scores should meet their mandatory thresholds.').toBe('');
  for (const [category, minimum] of Object.entries(thresholds)) {
    const score = scores[category];
    expect(score, `Lighthouse ${category} score should be present.`).not.toBeNull();
    if (score === null) throw new Error(`Lighthouse did not return a ${category} score.`);
    expect(score, `Lighthouse ${category} score should be at least ${minimum}.`).toBeGreaterThanOrEqual(minimum);
  }
}
