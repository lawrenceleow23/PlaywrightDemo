# NUHS+ Homepage General Content Scoped Test Plan

## Application Overview

Desktop-only planning for https://websparks-stg.sitefinity.cloud/. The homepage General Content (Image & standfirst, with General Image), its Load More control, and one representative image-to-article navigation are the functional coverage owner. This is the single authoritative plan; no Playwright code is generated.

## Scope
**In scope:** Homepage General Content / Image & standfirst content cards and their attached Load More control through its end state; inspect initial and expanded card count and fields; capture the action-triggered network request/response; click one representative card image to confirm navigation and identify page type. Apply mandatory rendered SEO checks to the representative homepage; retain the prior representative article-template SEO findings as mandatory shallow page metadata coverage only.

**Out of scope:** Every other homepage section and unrelated shared functionality; navigation/search/footer/subscription; article body/content, related content, and article interactions; mobile/tablet; CMS authoring or placeholder controls. No popup, persistence, cookie, or storage analysis or coverage. After the Load More control disappears, further activation is undefined and must not be attempted.

**Source scope notes:** Desktop only. Expected 3 initial articles with General Image, Pillar Category, and Title; whole image links to individual article; initial placeholder configurable. One Load More activation expected to add 6 similarly formatted articles for total 9 and hide the control; expansion placeholder is not configurable. Article destination depth is limited to identifying its page type, subject to mandatory shallow page metadata checks. If a blocking overlay interferes, stop, dismiss, verify closure, and resume the in-scope action without analyzing or documenting the overlay. If it cannot be dismissed, record the blockage and recovery attempts without describing popup behavior.

## Requirements and Observed Behavior (2026-11-06)
At desktop 1280x720 CSS pixels, homepage `/` loaded with title `Home | NUHS+`. Initially exactly 3 General Content cards were present: “A new role for AI in speech rehabilitation” (Science), “Test - When does recovery start?” (Multimedia, News, Science), and “Test - What are we not seeing?” (Multimedia, News, Science). All showed an image, category label(s), title, standfirst, and descriptive image alt text. The initial and final counts match the source expectation; no functional count discrepancy was found. The rendered category labels were observed; mapping them to a CMS Pillar Category field cannot be confirmed from the public page.

The first card image opened `https://websparks-stg.sitefinity.cloud/article/a-new-role-for-ai-in-speech-rehabilitation`, title `A new role for AI in speech rehabilitation | NUHS+`; destination page type: article. No article content or related content was explored.

One Load More activation changed the count from 3 to 9, adding exactly 6 cards in the same image/category/title/standfirst format; Load More then disappeared. Action-triggered request: `POST /api/ArticlesApi/LoadMoreArticles`; form payload `loadMoreCount=1&pillarCategory=home`; HTTP 200; response content type `application/json; charset=utf-8`; duration 170 ms. The response contained six GeneralItems reflected in the UI. No further activation was attempted.

## Major Functionality
- Initial General Content cards expose linked image, category labels, title, and standfirst.
- Load More appends six cards from an XHR/API response and removes itself after the total reaches nine.
- Selecting a representative card image opens an article detail page.

## User Journeys
1. Open the homepage, locate General Content, inspect its initial three cards, and follow one whole card image to confirm article navigation/type.
2. Return to the homepage if needed, capture the initial General Content count, activate Load More once, associate its request/response with the action, then verify the six-card increase, nine-card total, card format, and hidden end-state control.

## Destination Page Type
Representative destination: `/article/a-new-role-for-ai-in-speech-rehabilitation`; rendered title `A new role for AI in speech rehabilitation | NUHS+`; identified as an article page. Do not inspect body, related content, or interactions. The existing plan's representative article-template SEO observations are retained as shallow mandatory metadata coverage: title and H1 matched; description and canonical present; one H1 and multiple H2 headings; Open Graph title, URL, type, image, and description present; Twitter metadata absent; representative hero image had descriptive alt text.

## Mandatory SEO Findings
Homepage rendered title `Home | NUHS+`; meta description absent; canonical `https://websparks-stg.sitefinity.cloud/home` differs from loaded URL `/`; no H1; rendered heading scan found one H2 (“Podcast”); Open Graph title `Home`, URL `https://websparks-stg.sitefinity.cloud`, type `website`, site name `Default`; Open Graph description/image and Twitter metadata absent. The unrelated H2 text is noted only for the mandatory page-level heading check, not as functional scope. The three in-scope card image alts were descriptive.

Retained once-per-run site-level findings: `/robots.txt` returned HTTP 200 `text/plain; charset=utf-8` with `User-agent: *` and `Disallow: /`; `/sitemap.xml` returned HTTP 200 `text/html; charset=utf-8` containing an HTML Page Not Found document rather than XML.

## Validation Opportunities
- Recheck initial count and required image/category/title fields, plus standfirst as part of the Image & standfirst format.
- Measure each Load More activation through the end state (observed only one activation was needed); associate request URL, method, payload, response status/content type/timing/summary with UI change.
- A controlled request-failure/recovery and content-boundary check could be considered if a supported test environment defines expected behavior; no failure was induced and source acceptance behavior is undefined.
- Repeated activation after the control disappears is explicitly undiscovered/undefined and must not be attempted.
- Placeholder configurability cannot be verified on the public homepage and must not trigger CMS authoring scope.

## Coverage Status
**Partially Analyzed.** Functional content count/format, Load More request and end state, and representative article navigation were observed. Homepage SEO findings were recorded. Mandatory desktop Lighthouse audits remain pending, and CMS placeholder configurability/category-field mapping cannot be verified from the scoped public-facing area.

## Discovery Limitations
- Lighthouse is mandatory for the desktop homepage and representative article destination, covering SEO, accessibility, performance, and best practices. No mobile audit. The repository has `lighthouse` and `playwright-lighthouse` dependencies and a Desktop Chrome project, but no Lighthouse execution interface was available in this planning session; no audit was run and no Lighthouse result is claimed.
- Initial placeholder configurability and semantic mapping of rendered category labels to the CMS Pillar Category field are not verifiable on the public homepage.
- No unsuccessful Load More response was induced; error and retry behavior have no source-defined acceptance outcome.
- No interaction beyond the observed end state was attempted, consistent with the source limitation on repeated activations.
- Site-level robots/sitemap findings are retained from the existing plan; this run did not repeat those requests.
- No popup coverage is created; blocker handling is operational only.

## Test Scenarios

### 1. Homepage General Content and directly attached Load More

**Seed:** `N/A — planning only; no Playwright code is generated.`

#### 1.1. Verify initial General Content cards and representative image navigation

**File:** `Planning scenario`

**Steps:**
  1. At desktop viewport, inspect only the homepage General Content / Image & standfirst area before expansion.
    - expect: Exactly 3 initial article cards are present.
    - expect: Each initial card has a General Image, visible category label(s), title, standfirst, and meaningful image alt text.
  2. Click the whole image of one representative General Content card and inspect only the resulting URL and page type.
    - expect: The image navigates to an individual article page.
    - expect: Record the destination URL and identify the destination as an article; do not inspect its content or related-content features.

#### 1.2. Exercise Load More through its end state and capture network evidence

**File:** `Planning scenario`

**Steps:**
  1. Record the initial General Content count, then activate Load More once while observing the action-triggered request and response.
    - expect: The count increases from 3 to 9, an increase of exactly 6.
    - expect: Capture request URL, method, payload, response status, content type, duration, and corresponding UI change.
    - expect: Observed request: POST /api/ArticlesApi/LoadMoreArticles; payload loadMoreCount=1&pillarCategory=home; status 200; JSON response; observed duration 170 ms.
  2. Inspect the six added cards and the control end state; do not attempt another activation after the control disappears.
    - expect: All 6 new cards use the General Image/category/title/standfirst format.
    - expect: The final card count is 9 and Load More is no longer visible.
    - expect: Further activation is undefined by the source and remains undiscovered.

#### 1.3. Validate mandatory desktop SEO and site-level checks

**File:** `Planning scenario`

**Steps:**
  1. Read rendered SEO metadata on the homepage and one representative article template, limiting article inspection to title, description, canonical, heading structure, Open Graph/Twitter metadata, and representative image alt text.
    - expect: Record missing, empty, mismatched, or duplicated values as findings.
    - expect: Homepage findings: no description; canonical differs from loaded URL; no H1; observed H2; Open Graph description/image and Twitter metadata absent.
    - expect: Representative article-template findings are retained in the Observed results above; do not inspect article body, related content, or other destination behavior.
  2. Request /robots.txt and /sitemap.xml once each and record status, content type, and returned content.
    - expect: Retain the existing robots.txt 200 text/plain result with Disallow: / and sitemap.xml 200 HTML Page Not Found result rather than XML; do not repeat during this run.

#### 1.4. Run mandatory desktop Lighthouse audits

**File:** `Planning scenario`

**Steps:**
  1. When a local Lighthouse execution runner is available, audit only the desktop homepage and the same representative article page; record Lighthouse category scores and findings without adding unsupported score thresholds.
    - expect: Audits are limited to the in-scope page types and desktop profile.
    - expect: Current status remains pending because no local Lighthouse execution interface was available in this planning session; do not claim Lighthouse coverage complete.
