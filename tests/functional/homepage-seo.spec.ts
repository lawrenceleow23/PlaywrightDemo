// Suite: Homepage General Content SEO
// Purpose: Record standards findings for the representative homepage and linked article template.
// Coverage Scope: Rendered metadata on homepage and one representative article, with no article-body inspection.
// Covered Features: Title/description/canonical/headings/OG/Twitter/duplicates and in-scope image alt.
// Covered User Journeys: Inspect homepage metadata, follow one General Content image, inspect article metadata.
// Run Entire Suite: npx playwright test tests/functional --project=chromium
// Run Spec: npx playwright test tests/functional/homepage-seo.spec.ts --project=chromium
// Run Test: npx playwright test tests/functional/homepage-seo.spec.ts --project=chromium -g "Record rendered SEO metadata findings for the homepage and article template"
// Headed Run: npx playwright test tests/functional/homepage-seo.spec.ts --project=chromium --headed
// Report: npx playwright show-report

import { test, expect, collectSeoMetadata, captureScreenshot, attachJson, dismissBlockingOverlay } from '../support/helper';

const homepageUrl = 'https://websparks-stg.sitefinity.cloud/';
const articlePath = '/article/a-new-role-for-ai-in-speech-rehabilitation';

function findSeoIssues(metadata: Awaited<ReturnType<typeof collectSeoMetadata>>): string[] {
  const findings: string[] = [];
  if (!metadata.title.trim()) findings.push('Page title is absent or empty.');
  if (!metadata.description?.trim()) findings.push('Meta description is absent or empty.');
  if (!metadata.canonical) findings.push('Canonical URL is absent.');
  else if (metadata.canonical !== metadata.url) findings.push('Canonical URL differs from the loaded URL.');
  if (metadata.canonicalCount !== 1) findings.push(`Expected one canonical link; observed ${metadata.canonicalCount}.`);
  if (metadata.headingOrder.filter((level) => level === 1).length !== 1) findings.push('Heading structure does not contain exactly one H1.');
  if (metadata.headingOrder.some((level, index) => index > 0 && level > metadata.headingOrder[index - 1] + 1)) findings.push('Heading sequence skips a level.');
  if (metadata.duplicateMetaKeys.length) findings.push(`Duplicate metadata keys: ${metadata.duplicateMetaKeys.join(', ')}.`);
  for (const [property, value] of Object.entries(metadata.openGraph)) {
    if (!value?.trim()) findings.push(`Open Graph ${property} is absent or empty.`);
  }
  if (!metadata.twitter.length) findings.push('Twitter metadata is absent.');
  return findings;
}

test.describe('Homepage General Content SEO', () => {
  test('Record rendered SEO metadata findings for the homepage and article template', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Run representative desktop metadata checks once on Chromium.');

    // 1. Capture rendered homepage metadata, heading structure, duplicates, and scoped image alt text.
    await page.goto(homepageUrl);
    await dismissBlockingOverlay(page);

    const homepageMetadata = await collectSeoMetadata(page);
    const homepageFindings = findSeoIssues(homepageMetadata);
    await attachJson(testInfo, 'T1a-Homepage-SEO.json', { metadata: homepageMetadata, findings: homepageFindings });
    await captureScreenshot(page, testInfo, 'T1a-Homepage-SEO');

    expect.soft(homepageMetadata.title).toBe('Home | NUHS+');
    expect.soft(homepageMetadata.description, 'Homepage meta description is absent in the current observation.').toBeTruthy();
    expect.soft(homepageMetadata.canonical).toBe(homepageMetadata.url);
    expect.soft(homepageMetadata.canonicalCount).toBe(1);
    expect.soft(homepageMetadata.duplicateMetaKeys).toEqual([]);
    expect.soft(homepageMetadata.headingOrder.filter((level) => level === 1)).toHaveLength(1);
    expect.soft(homepageMetadata.headingOrder.some((level, index) => index > 0 && level > homepageMetadata.headingOrder[index - 1] + 1)).toBe(false);
    expect.soft(Object.values(homepageMetadata.openGraph).every((value) => Boolean(value?.trim()))).toBe(true);
    expect.soft(homepageMetadata.twitter.length).toBeGreaterThan(0);
    expect.soft(homepageMetadata.cardImageAlt).toHaveLength(3);
    for (const alt of homepageMetadata.cardImageAlt) expect.soft(alt?.trim()).toBeTruthy();

    // 2. Follow the representative image and check metadata on the article template only.
    await dismissBlockingOverlay(page);
    await page.locator(`#general-articles a.general-post[href="${articlePath}"] img`).click();
    await expect(page).toHaveURL(new RegExp(`${articlePath.replaceAll('/', '\\/')}$`));
    await dismissBlockingOverlay(page);

    const articleMetadata = await collectSeoMetadata(page, true);
    const articleFindings = findSeoIssues(articleMetadata);
    await attachJson(testInfo, 'T1b-Article-SEO.json', { metadata: articleMetadata, findings: articleFindings });
    await captureScreenshot(page, testInfo, 'T1b-Article-SEO');

    expect(new URL(page.url()).pathname).toBe(articlePath);
    expect.soft(articleMetadata.title).toBe('A new role for AI in speech rehabilitation | NUHS+');
    expect.soft(articleMetadata.description?.trim()).toBeTruthy();
    expect.soft(articleMetadata.canonical).toBe(articleMetadata.url);
    expect.soft(articleMetadata.canonicalCount).toBe(1);
    expect.soft(articleMetadata.duplicateMetaKeys).toEqual([]);
    expect.soft(articleMetadata.headingOrder.filter((level) => level === 1)).toHaveLength(1);
    expect.soft(articleMetadata.headingOrder.some((level, index) => index > 0 && level > articleMetadata.headingOrder[index - 1] + 1)).toBe(false);
    expect.soft(Object.values(articleMetadata.openGraph).every((value) => Boolean(value?.trim()))).toBe(true);
    expect.soft(articleMetadata.twitter.length).toBeGreaterThan(0);
    expect.soft(articleMetadata.heroImageAlt?.trim()).toBeTruthy();
  });
});
