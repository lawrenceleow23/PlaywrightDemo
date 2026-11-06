import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { expect, type Page, type TestInfo } from '@playwright/test';

export async function captureScreenshot(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  const filePath = testInfo.outputPath('screenshots', `${name}.png`);
  await mkdir(dirname(filePath), { recursive: true });
  await page.screenshot({ path: filePath });
  await testInfo.attach(name, { path: filePath, contentType: 'image/png' });
}

export async function attachJson(testInfo: TestInfo, name: string, value: unknown): Promise<void> {
  await testInfo.attach(name, {
    body: Buffer.from(JSON.stringify(value, null, 2)),
    contentType: 'application/json',
  });
}

export async function attachFile(testInfo: TestInfo, name: string, filePath: string, contentType: string): Promise<void> {
  await testInfo.attach(name, { path: filePath, contentType });
}

export async function dismissBlockingOverlay(page: Page): Promise<void> {
  const dialog = page.getByRole('dialog');
  if (await dialog.isVisible()) {
    await dialog.getByRole('button', { name: /close|dismiss/i }).click();
    await expect(dialog).toBeHidden();
  }
}

async function getMetaAttribute(page: Page, selector: string, attribute: string): Promise<string | null> {
  const element = page.locator(selector);
  if (await element.count() === 0) return null;
  return element.first().getAttribute(attribute);
}

export async function collectSeoMetadata(
  page: Page,
  includeHeroImageAlt = new URL(page.url()).pathname.startsWith('/article/'),
) {
  const openGraphProperties = ['og:title', 'og:url', 'og:type', 'og:site_name', 'og:image', 'og:description'];
  const openGraphEntries = await Promise.all(openGraphProperties.map(async (property) => [
    property,
    await getMetaAttribute(page, `meta[property="${property}"]`, 'content'),
  ] as const));
  const twitterMetadata: Record<string, string | null> = {};
  const twitterTags = page.locator('meta[name^="twitter:"]');
  for (const tag of await twitterTags.all()) {
    const name = await tag.getAttribute('name');
    if (name) twitterMetadata[name] = await tag.getAttribute('content');
  }

  const generalContentImages = page.locator('#general-articles a.general-post img');
  const imageAlts: Array<string | null> = [];
  for (const image of await generalContentImages.all()) imageAlts.push(await image.getAttribute('alt'));

  const heroImage = page.locator('main img').first();
  return {
    url: page.url(),
    title: await page.title(),
    description: await getMetaAttribute(page, 'meta[name="description"]', 'content'),
    canonical: await getMetaAttribute(page, 'link[rel="canonical"]', 'href'),
    headingCounts: {
      h1: await page.locator('h1').count(),
      h2: await page.locator('h2').count(),
      h3: await page.locator('h3').count(),
      h4: await page.locator('h4').count(),
      h5: await page.locator('h5').count(),
      h6: await page.locator('h6').count(),
    },
    openGraph: Object.fromEntries(openGraphEntries),
    twitter: twitterMetadata,
    generalContentImageAlt: imageAlts,
    heroImageAlt: includeHeroImageAlt ? await heroImage.getAttribute('alt') : null,
  };
}
