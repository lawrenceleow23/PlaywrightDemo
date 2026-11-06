import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { expect, type Page, type TestInfo } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';
import { lighthouseThresholds } from '../lighthouse/playwright.lighthouse.config';
import { attachJson, captureScreenshot, dismissBlockingOverlay } from './helper';

export async function auditDesktopPage(page: Page, testInfo: TestInfo, pageName: string, url: string): Promise<void> {
  await page.goto(url);
  await dismissBlockingOverlay(page);

  const reportDirectory = testInfo.outputPath('lighthouse-reports');
  await mkdir(reportDirectory, { recursive: true });
  const result = await playAudit({
    page,
    port: 9222,
    thresholds: lighthouseThresholds,
    ignoreError: true,
    disableLogs: true,
    reports: {
      formats: { html: true, json: true },
      directory: reportDirectory,
      name: pageName,
    },
  });

  const scores: Record<string, number | null> = {};
  for (const category of Object.keys(lighthouseThresholds)) {
    const score = result.lhr.categories[category]?.score;
    scores[category] = typeof score === 'number' ? score * 100 : null;
  }
  await attachJson(testInfo, `${pageName}-Lighthouse-Scores.json`, {
    url,
    deviceProfile: 'Chromium Desktop',
    thresholds: lighthouseThresholds,
    scores,
    comparisonError: result.comparisonError ?? null,
  });

  const htmlReport = join(reportDirectory, `${pageName}.html`);
  const jsonReport = join(reportDirectory, `${pageName}.json`);
  await testInfo.attach(`${pageName}-Lighthouse.html`, { path: htmlReport, contentType: 'text/html' });
  await testInfo.attach(`${pageName}-Lighthouse.json`, { path: jsonReport, contentType: 'application/json' });
  await captureScreenshot(page, testInfo, `${pageName}-Lighthouse`);

  expect(result.comparisonError ?? '', 'Lighthouse category scores should meet mandatory thresholds.').toBe('');
  for (const [category, minimum] of Object.entries(lighthouseThresholds)) {
    const score = scores[category];
    expect(score, `Lighthouse ${category} score should be present.`).not.toBeNull();
    if (score === null) throw new Error(`Lighthouse did not return a ${category} score.`);
    expect(score, `Lighthouse ${category} score should be at least ${minimum}.`).toBeGreaterThanOrEqual(minimum);
  }
}
