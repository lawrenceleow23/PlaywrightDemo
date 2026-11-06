import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { expect, test as base, type Page, type TestInfo } from '@playwright/test';

type Fixtures = { runtimeEvidence: void };
const sensitivePattern = /((?:["']?)(?:authorization|token|access_token|refresh_token|cookie|set-cookie|password|email|phone|mobile|name|first_name|last_name|full_name|date_of_birth|dob)(?:["']?\s*[:=]\s*(?:Bearer\s+)?["']?))([^"'&\s,;}]+)/gi;
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

export function redactEvidenceText(value: string | null): string | null {
  return value?.replace(sensitivePattern, '$1[REDACTED]')
    .replace(emailPattern, '[REDACTED_EMAIL]') ?? null;
}

export const test = base.extend<Fixtures>({
  runtimeEvidence: [async ({ page }, use, testInfo) => {
    const diagnostics: Array<Record<string, string>> = [];
    page.on('console', (message) => {
      if (message.type() === 'error') diagnostics.push({ type: 'console-error', text: message.text() });
    });
    page.on('pageerror', (error) => diagnostics.push({ type: 'page-error', message: error.message, stack: error.stack ?? '' }));
    page.on('requestfailed', (request) => diagnostics.push({
      type: 'request-failed',
      method: request.method(),
      url: redactEvidenceText(request.url()) ?? '',
      error: request.failure()?.errorText ?? 'No failure detail provided',
    }));

    await use();

    if (diagnostics.length) await attachJson(testInfo, 'Runtime-Diagnostics.json', diagnostics);
    if (testInfo.status !== testInfo.expectedStatus) {
      const browser = page.context().browser();
      await attachJson(testInfo, 'Failure-Metadata.json', {
        testId: testInfo.testId,
        testName: testInfo.title,
        browserName: browser?.browserType().name() ?? testInfo.project.name,
        browserVersion: browser?.version() ?? null,
        currentUrl: page.isClosed() ? null : redactEvidenceText(page.url()),
        timestamp: new Date().toISOString(),
        errors: testInfo.errors.map((error) => ({ message: error.message, stack: error.stack ?? '' })),
      });
      if (!page.isClosed()) await captureFailureScreenshot(page, testInfo);
    }
  }, { auto: true }],
});

export { expect };

export async function captureScreenshot(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  const filePath = testInfo.outputPath('screenshots', `${name}.png`);
  await mkdir(dirname(filePath), { recursive: true });
  await page.screenshot({ path: filePath });
  await testInfo.attach(name, { path: filePath, contentType: 'image/png' });
}

async function captureFailureScreenshot(page: Page, testInfo: TestInfo): Promise<void> {
  const suiteName = testInfo.titlePath.slice(0, -1).join('-') || 'suite';
  const fileName = testInfo.title;
  const filePath = resolve(testInfo.outputPath(), '..', 'screenshots', suiteName, fileName, 'failure', 'T1-Failure.png');
  await mkdir(dirname(filePath), { recursive: true });
  await page.screenshot({ path: filePath });
  await testInfo.attach('T1-Failure', { path: filePath, contentType: 'image/png' });
}

export async function attachJson(testInfo: TestInfo, name: string, value: unknown): Promise<void> {
  const redactedJson = redactEvidenceText(JSON.stringify(value, null, 2)) ?? 'null';
  await testInfo.attach(name, { body: Buffer.from(redactedJson), contentType: 'application/json' });
}

export async function dismissBlockingOverlay(page: Page): Promise<void> {
  const dialog = page.getByRole('dialog');
  if (await dialog.isVisible()) {
    await dialog.getByRole('button', { name: /close|dismiss/i }).click();
    await expect(dialog).toBeHidden();
  }
}

async function getMetaContent(page: Page, selector: string): Promise<string | null> {
  const element = page.locator(selector);
  return await element.count() ? element.first().getAttribute('content') : null;
}

export async function collectSeoMetadata(page: Page, includeHeroImageAlt = false) {
  const openGraphProperties = ['og:title', 'og:url', 'og:type', 'og:site_name', 'og:image', 'og:description'];
  const openGraph: Record<string, string | null> = {};
  for (const property of openGraphProperties) {
    openGraph[property] = await getMetaContent(page, `meta[property="${property}"]`);
  }

  const twitter: Array<{ name: string | null; content: string | null }> = [];
  for (const tag of await page.locator('meta[name^="twitter:"]').all()) {
    twitter.push({ name: await tag.getAttribute('name'), content: await tag.getAttribute('content') });
  }

  const metaKeys: string[] = [];
  for (const meta of await page.locator('meta').all()) {
    const key = (await meta.getAttribute('name')) ?? (await meta.getAttribute('property'));
    if (key) metaKeys.push(key.toLowerCase());
  }
  const duplicateMetaKeys = [...new Set(metaKeys.filter((key) => metaKeys.filter((candidate) => candidate === key).length > 1))];

  const canonicalLinks = page.locator('link[rel="canonical"]');
  const canonicalCount = await canonicalLinks.count();
  const canonical = canonicalCount ? await canonicalLinks.first().getAttribute('href') : null;
  const headingOrder: number[] = [];
  for (const heading of await page.locator('h1,h2,h3,h4,h5,h6').all()) {
    headingOrder.push(Number((await heading.evaluate((element) => element.tagName.slice(1)))));
  }

  const cardImageAlt: Array<string | null> = [];
  for (const image of await page.locator('#general-articles a.general-post img').all()) {
    cardImageAlt.push(await image.getAttribute('alt'));
  }

  return {
    url: page.url(),
    title: await page.title(),
    description: await getMetaContent(page, 'meta[name="description"]'),
    canonical,
    canonicalCount,
    headingOrder,
    openGraph,
    twitter,
    duplicateMetaKeys,
    cardImageAlt,
    heroImageAlt: includeHeroImageAlt ? await page.locator('main img').first().getAttribute('alt') : null,
  };
}
