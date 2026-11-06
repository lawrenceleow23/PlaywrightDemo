# NUHS+ Homepage General Content Scoped Test Plan

## Application Overview

Desktop-only analysis of https://websparks-stg.sitefinity.cloud/. Functional coverage is owned by the homepage General Content area (Image & standfirst, with General Image), its Load More control, and one representative image-to-article navigation. Mandatory metadata checks and Lighthouse audits are limited to the representative homepage and article template.

## Scope
**In scope:** Homepage General Content / Image & standfirst cards and directly attached Load More through its end state; initial and expanded counts and fields; action-triggered network evidence; one representative image click-through limited to article type and URL outcome. Apply mandatory rendered SEO metadata checks to the representative homepage and the same article template, keeping article inspection shallow. Retain the once-per-run robots.txt and sitemap.xml checks as SEO validation already in the existing plan. Mandatory desktop Lighthouse audits cover only the representative homepage and article template.

**Out of scope:** All other homepage sections and unrelated site functionality; unrelated shared components, navigation, search, footer, and subscription; article body/content, related content, and article interactions; tablet/mobile; CMS authoring and placeholder configuration. Do not analyze/test popup behavior, persistence, cookies, or storage. Do not try another Load More activation after the control disappears because later behavior is undefined by the source.

**Source scope notes:** Desktop only. The homepage initially should show 3 individual Image & standfirst articles, each with a General Image, Pillar Category, and Title; the whole image links to its individual article; initial placeholder configurable is Yes. One Load More activation should add 6 similarly formatted articles, for 9 total, and hide the control; expansion placeholder configurable is No. Article destination scope is limited to identifying that an in-scope item opens an article page and identifying its type. If a blocking popup or overlay interferes, stop, dismiss through its close/dismiss control, verify closed, and resume the in-scope step; do not analyze or document popup behavior. If dismissal is impossible, document the blockage without popup details and continue within scope where practical.

## In-scope Element Types and Mandatory Checks
- General Content article cards with image, category label(s), title, standfirst, and linked image: verify user-visible card fields and navigation outcome/page type.
- Load More content-changing button: record counts before/after each activation through the end state and capture all action-caused relevant network requests/responses and resulting UI state. Do not assert exact endpoint/payload/status/timing as product acceptance criteria merely because observed; record them as evidence.
- Representative homepage and article template: rendered SEO metadata check for title, description, canonical, heading structure, Open Graph/Twitter metadata, duplicates, and relevant image alt text. Keep article checks shallow.
- Mandatory Lighthouse: Chromium Desktop for homepage and representative article page; record SEO, accessibility, best-practices, and performance; use standard thresholds SEO >= 90, accessibility >= 90, best practices >= 90, performance >= 80. A missing category score is not a pass.
- Test evidence when automation is generated: meaningful screenshots attached to report and reusable evidence/failure helpers; not a separate website feature.

## Requirements and Observed Behavior (2026-11-06)
At desktop 1280x720 CSS pixels, homepage `/` title was `Home | NUHS+`. The live initial list contained exactly 3 in-scope cards: “A new role for AI in speech rehabilitation” (Science), “Test - When does recovery start?” (Multimedia, News, Science), and “Test - What are we not seeing?” (Multimedia, News, Science). All have a General Image, visible category labels, title, standfirst, and descriptive alt text. A repeat targeted check in this review again found 3 cards and the same fields. Rendered labels are visible; mapping them to the CMS Pillar Category field cannot be confirmed on the public homepage.

The representative image opened `https://websparks-stg.sitefinity.cloud/article/a-new-role-for-ai-in-speech-rehabilitation`, title `A new role for AI in speech rehabilitation | NUHS+`; the URL path and rendered page type identify an article. No article body, related content, or other destination interactions were examined.

Load More was rechecked: 3 cards before, exactly 9 afterward (increase of 6), same card format, and control absent at the final state. One action-triggered request was observed: `POST /api/ArticlesApi/LoadMoreArticles`, form payload `loadMoreCount=1&pillarCategory=home`, status 200, content type `application/json; charset=utf-8`; response JSON preview showed `result.GeneralItems`, and the six added items corresponded to rendered cards. The browser tool response-body output exceeded its 110 KB output limit, so the complete raw body could not be retained/read here; only the available JSON shape/count and rendered item results are recorded. No credentials or sensitive values were needed. The relevant request duration was recorded as 170 ms in an earlier discovery and 290 ms in a later browser run; timings are variable evidence only, not an assertion threshold. This review confirmed the request route/status and visible UI result; an exact new duration was not available in the retained request details. The background mailing-list cookie lookup observed on page load is unrelated to the Load More action and excluded.

No functional discrepancy from website.md was found for initial count, added count, final total/control state, fields, or image navigation. Placeholder configurability remains unverified because CMS authoring is out of scope. Additional activations after the end state remain undefined and were not attempted.

## Major Functionality
- Three initial Image & standfirst cards expose a General Image, visible category label(s), title, standfirst, and linked image.
- Load More appends six cards and hides at nine total.
- A representative card image opens an article detail page.

## User Journeys
1. Open the homepage, inspect only the initial three General Content cards, and follow one representative whole-card image to confirm article URL and type.
2. Open the homepage, count the initial cards, observe network, activate Load More once, associate all relevant action-caused responses with the UI update, verify six additions, same card format, final count nine, and hidden control.
3. For mandatory shallow metadata and performance checks, use the representative homepage and same article template only; do not inspect article content or related content.

## Destination Page Type
Representative destination: `/article/a-new-role-for-ai-in-speech-rehabilitation`; page type: article. Current rendered title is `A new role for AI in speech rehabilitation | NUHS+`. Functional destination outcome is confirmed. Article depth remains limited to metadata needed by mandatory standards.

## SEO Findings
Homepage current findings: title `Home | NUHS+`; meta description absent; canonical `https://websparks-stg.sitefinity.cloud/home` mismatches loaded URL `/`; zero H1 and one H2; Open Graph title `Home`, URL `https://websparks-stg.sitefinity.cloud`, type `website`, site name `Default`; Open Graph description and image absent; no Twitter metadata. Targeted duplicate check found no duplicate meta keys and exactly one canonical tag. All three in-scope card images have descriptive alt text.

Representative article template current findings: title `A new role for AI in speech rehabilitation | NUHS+`; meta description and canonical present, canonical matches article URL; heading counts are one H1, three H2, one H3; Open Graph title, URL, type (`website`), site name, image, and description present; no Twitter metadata. Targeted duplicate check found no duplicate meta keys and exactly one canonical tag. Representative hero image alt text is descriptive. No heading text or article body is recorded here to avoid expanding destination depth.

Retained once-per-run site-level findings: `/robots.txt` returned HTTP 200 `text/plain; charset=utf-8` with `User-agent: *` and `Disallow: /`; `/sitemap.xml` returned HTTP 200 `text/html; charset=utf-8` with an HTML Page Not Found document rather than XML. These are SEO findings; do not repeat the requests in this review.

## Lighthouse Status and Thresholds
Mandatory audits are Chromium Desktop only, for the homepage and the same representative article template. Required thresholds: SEO >= 90; accessibility >= 90; best practices >= 90; performance >= 80, all on 0–100 scale. The project already contains Lighthouse dependencies and dedicated audit specs/configuration at `tests/lighthouse/`; reports are intended to be saved as HTML per page. Audits have not been executed/verified in this planning review. A prior Playwright MCP run against the default config skipped both audit tests because it selected the ordinary Chromium project rather than the dedicated Lighthouse project. The tool interface in this review does not expose a local command runner; the dedicated CLI command should be run as `npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts`. Until that command runs and reports valid scores/reports, Lighthouse coverage remains pending; do not claim a pass. No mobile audits.

## Validation Opportunities and Coverage Gaps
- Verify initial and expanded card fields using visible content and meaningful alt text; avoid assuming CMS field mapping from rendered labels.
- Continue capturing all relevant Load More requests/responses and response body where practically readable. If a body is too large, record the output limit and retained summary; redact credentials, tokens, cookies, personal data, and other sensitive values.
- Controlled request failure/retry behavior could be tested only if a supported environment defines expected behavior; no failure was induced and source behavior is unspecified.
- Placeholder configurability and semantic CMS Pillar Category mapping cannot be verified from the scoped public frontend; do not open CMS authoring screens.
- Lighthouse remains the outstanding mandatory validation gap until both desktop audits execute with reports and threshold results.

## Coverage Status
**Partially Analyzed.** Functional card count/format, Load More counts/end state, relevant request route/status/payload, and representative article navigation were observed and match source requirements. Homepage and representative article metadata were checked; SEO discrepancies are documented. Mandatory desktop Lighthouse results remain unverified. CMS placeholder configurability and the semantic CMS category-field mapping are not verifiable within this scope.

## Discovery Limitations
- The Load More JSON response-body output exceeded the browser tool's 110 KB output limit. The result shape and six GeneralItems were visible in the available preview; the complete raw response body could not be retained/read. Do not represent the truncated response as a complete body capture.
- Current Load More duration was not available from retained network details. Earlier observed durations were 170 ms and 290 ms; they vary and are not requirements.
- Lighthouse dependencies/specs/configuration exist, but this planning session has no local command runner to execute the dedicated configuration. Prior default-config test discovery skipped both Lighthouse tests. Run and verify with the dedicated config command above.
- Placeholder configurability and CMS field mapping are not verifiable from the public-facing scoped area.
- No unsuccessful Load More response or post-end-state activation was tested, consistent with the undefined source behavior.
- Popup appearance/behavior, persistence, cookies, and storage are not findings or coverage; only the source operational blocker rule applies.

## Test Scenarios

### 1. Homepage General Content and directly attached Load More

**Seed:** `Desktop browser, fresh page at homepage URL; if an overlay blocks an in-scope interaction, dismiss and verify closed before resuming per the source blocker rule.`

#### 1.1. Verify initial General Content cards and representative image navigation

**File:** `tests/functional/homepage-general-content-navigation.spec.ts`

**Steps:**
  1. At desktop viewport, inspect only the homepage General Content / Image & standfirst area before expansion.
    - expect: Exactly 3 initial article cards are present.
    - expect: Each has an image, visible category label(s), title, standfirst, and meaningful image alt text. The rendered category label is observable; CMS Pillar Category field mapping is not assumed.
  2. Click one representative in-scope card image; inspect only the resulting URL and page type.
    - expect: The image opens an individual article page.
    - expect: Record the URL pattern and identify page type as article; do not inspect article body, related content, or other article interactions.

#### 1.2. Exercise Load More through its end state and capture network evidence

**File:** `tests/functional/homepage-general-content-load-more.spec.ts`

**Steps:**
  1. Record the initial General Content count, observe network before the action, then activate Load More once.
    - expect: Initial count is 3.
    - expect: Capture all relevant action-caused requests and responses with URL, method, payload, status, content type, response body or an explicit capture limitation, timing, and resulting UI state; ignore unrelated background requests.
  2. Verify the appended cards and end state; stop after Load More disappears.
    - expect: Exactly 6 new cards appear, each with image, visible category label(s), title, and standfirst.
    - expect: Total is 9; Load More is no longer visible.
    - expect: Do not attempt additional activation because the source defines behavior only through the specified total.

#### 1.3. Validate required metadata and once-per-run site-level SEO observations

**File:** `tests/functional/homepage-seo.spec.ts`

**Steps:**
  1. Check rendered homepage title, description, canonical, heading structure, Open Graph/Twitter metadata, duplicates, and in-scope image alt text.
    - expect: Record missing, empty, mismatched, or duplicate values as findings; current findings are recorded in the SEO Findings section.
  2. Use the same representative article template for shallow metadata only: title, description, canonical, heading structure, Open Graph/Twitter metadata, duplicate metadata, and representative image alt. Check robots.txt and sitemap.xml once when practical.
    - expect: Do not inspect article body or related content. Preserve existing once-per-run robots/sitemap observations; current response findings are recorded in the SEO Findings section.

#### 1.4. Run mandatory desktop Lighthouse audits for the representative homepage and article page

**File:** `tests/lighthouse/homepage-lighthouse.spec.ts and tests/lighthouse/article-lighthouse.spec.ts`

**Steps:**
  1. Run Lighthouse using Chromium Desktop for the homepage and same representative article page, saving an HTML report per audit and recording SEO, accessibility, best-practices, and performance scores.
    - expect: Apply required thresholds: SEO >= 90, accessibility >= 90, best practices >= 90, performance >= 80; every category score must be present and represented on a 0–100 scale.
    - expect: Only desktop audits are in scope. Current audit execution is pending; do not claim a pass.
