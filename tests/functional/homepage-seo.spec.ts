// Suite: Homepage General Content and directly attached Load More
// Purpose: Validate required rendered SEO metadata for the representative homepage and article template.
// Coverage Scope: Homepage metadata, shallow article-template metadata, and once-per-run robots.txt/sitemap.xml checks.
// Covered Features: Title/description/canonical/headings/OG/Twitter metadata, in-scope image alt, site-level SEO responses.
// Covered User Journeys: Inspect homepage metadata, follow one General Content image to an article, record site-level responses.
// Run Entire Suite: npx playwright test
// Run Spec: npx playwright test tests/functional/homepage-seo.spec.ts --project=chromium
// Run Test: npx playwright test tests/functional/homepage-seo.spec.ts --project=chromium -g "Validate mandatory desktop SEO and site-level checks"
// Headed Run: npx playwright test tests/functional/homepage-seo.spec.ts --project=chromium --headed
// Report: npx playwright show-report

import { test, expect } from '../support/evidence';
import { attachJson, captureScreenshot, collectSeoMetadata, dismissBlockingOverlay } from '../support/helpers';

const homepageUrl = 'https://websparks-stg.sitefinity.cloud/';
const articlePath = '/article/a-new-role-for-ai-in-speech-rehabilitation';

test.describe('Homepage General Content and directly attached Load More', () => {
  test('Validate mandatory desktop SEO and site-level checks', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Site-level metadata checks run once on desktop Chromium.');

    // 1. Inspect rendered homepage metadata and the in-scope General Content images.
    await page.goto(homepageUrl);
    await dismissBlockingOverlay(page);

    const homepageMetadata = await collectSeoMetadata(page);
    const homepageFindings: string[] = [];
    if (!homepageMetadata.description) homepageFindings.push('Homepage meta description is absent.');
    if (homepageMetadata.canonical !== homepageMetadata.url) homepageFindings.push('Homepage canonical URL differs from the loaded URL.');
    if (homepageMetadata.headingCounts.h1 !== 1) homepageFindings.push('Homepage does not have exactly one H1.');
    if (!homepageMetadata.openGraph['og:description']) homepageFindings.push('Homepage Open Graph description is absent.');
    if (!homepageMetadata.openGraph['og:image']) homepageFindings.push('Homepage Open Graph image is absent.');
    if (Object.keys(homepageMetadata.twitter).length === 0) homepageFindings.push('Homepage Twitter metadata is absent.');
    await attachJson(testInfo, 'T1a-Homepage-SEO.json', { ...homepageMetadata, findings: homepageFindings });
    await captureScreenshot(page, testInfo, 'T1a-Homepage-SEO');

    expect.soft(homepageMetadata.title).toBeTruthy();
    expect.soft(homepageMetadata.description, 'Homepage should provide a meta description.').toBeTruthy();
    expect.soft(homepageMetadata.canonical).toBe(homepageMetadata.url);
    expect.soft(homepageMetadata.headingCounts.h1).toBe(1);
    expect.soft(homepageMetadata.openGraph['og:title']).toBeTruthy();
    expect.soft(homepageMetadata.openGraph['og:url']).toBeTruthy();
    expect.soft(homepageMetadata.openGraph['og:type']).toBeTruthy();
    expect.soft(Object.keys(homepageMetadata.twitter).length).toBeGreaterThan(0);
    expect.soft(homepageMetadata.generalContentImageAlt).toHaveLength(3);
    for (const alt of homepageMetadata.generalContentImageAlt) expect.soft(alt?.trim().length ?? 0).toBeGreaterThan(0);

    // 2. Follow the representative General Content image and inspect article metadata only.
    await dismissBlockingOverlay(page);
    await page.locator(`#general-articles a.general-post[href="${articlePath}"] img`).click();
    await expect(page).toHaveURL(new RegExp(`${articlePath.replaceAll('/', '\\/')}$`));
    await dismissBlockingOverlay(page);

    const articleMetadata = await collectSeoMetadata(page);
    const articleFindings: string[] = [];
    if (!articleMetadata.description) articleFindings.push('Article meta description is absent.');
    if (articleMetadata.canonical !== articleMetadata.url) articleFindings.push('Article canonical URL differs from the loaded URL.');
    if (articleMetadata.headingCounts.h1 !== 1) articleFindings.push('Article template does not have exactly one H1.');
    if (Object.keys(articleMetadata.twitter).length === 0) articleFindings.push('Article Twitter metadata is absent.');
    await attachJson(testInfo, 'T1b-Article-SEO.json', { ...articleMetadata, findings: articleFindings });
    await captureScreenshot(page, testInfo, 'T1b-Article-SEO');

    expect(new URL(page.url()).pathname).toBe(articlePath);
    expect.soft(articleMetadata.title).toBeTruthy();
    expect.soft(articleMetadata.description).toBeTruthy();
    expect.soft(articleMetadata.canonical).toBe(articleMetadata.url);
    expect.soft(articleMetadata.headingCounts.h1).toBe(1);
    expect.soft(articleMetadata.openGraph['og:title']).toBeTruthy();
    expect.soft(articleMetadata.openGraph['og:url']).toBeTruthy();
    expect.soft(articleMetadata.openGraph['og:type']).toBeTruthy();
    expect.soft(articleMetadata.openGraph['og:image']).toBeTruthy();
    expect.soft(articleMetadata.openGraph['og:description']).toBeTruthy();
    expect.soft(Object.keys(articleMetadata.twitter).length).toBeGreaterThan(0);
    expect.soft(articleMetadata.heroImageAlt?.trim().length ?? 0).toBeGreaterThan(0);

    // 3. Record the once-per-run robots.txt and sitemap.xml response metadata and content.
    const robotsResponse = await page.request.get(new URL('/robots.txt', homepageUrl).toString());
    const robotsBody = await robotsResponse.text();
    const sitemapResponse = await page.request.get(new URL('/sitemap.xml', homepageUrl).toString());
    const sitemapBody = await sitemapResponse.text();
    const siteLevelEvidence = {
      robots: {
        url: robotsResponse.url(),
        status: robotsResponse.status(),
        contentType: robotsResponse.headers()['content-type'] ?? null,
        body: robotsBody,
      },
      sitemap: {
        url: sitemapResponse.url(),
        status: sitemapResponse.status(),
        contentType: sitemapResponse.headers()['content-type'] ?? null,
        bodyExcerpt: sitemapBody.slice(0, 1000),
      },
    };
    await attachJson(testInfo, 'T1c-Site-Level-SEO.json', siteLevelEvidence);

    expect(robotsResponse.status()).toBe(200);
    expect(sitemapResponse.status()).toBe(200);
    expect.soft(siteLevelEvidence.sitemap.contentType?.toLowerCase()).toContain('xml');
  });
});
