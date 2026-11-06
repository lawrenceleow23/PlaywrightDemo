# NUHS+ Homepage General Content Scoped Test Plan

## Application Overview

# Application Overview

Desktop-only scoped review of https://websparks-stg.sitefinity.cloud/. Functional ownership is the homepage General Content area (Image & standfirst with General Image), its directly attached Load More control through the end state, and one representative image-to-article destination confirmed only as an article page. Mandatory cross-cutting rendered SEO checks are shallow and limited to the representative homepage and the same article template; Lighthouse applies only to these desktop representative pages. No out-of-scope homepage areas or article content are explored.

## Scope

**In-scope website functionality:** Homepage General Content / Image & standfirst cards with General Images; initial and expanded counts and visible card fields; directly attached Load More through its end state; relevant action-caused request/response evidence; one representative image click-through, limited to confirming article URL and page type.

**Mandatory cross-cutting validation:** Desktop rendered SEO metadata checks for homepage and representative article template, including title, description, canonical, heading structure, Open Graph/Twitter metadata, duplicates, and relevant image alt text. Preserve existing once-per-run robots.txt and sitemap.xml observations. Mandatory Chromium Desktop Lighthouse audits for the homepage and representative article template only; thresholds SEO >= 90, accessibility >= 90, best practices >= 90, performance >= 80.

**Out of scope:** Every other homepage section, unrelated shared/cross-site components and functionality, other navigation/search/footer/subscription, article body/content, related content, article interactions, mobile/tablet, CMS authoring, and popup behavior/persistence/cookies/storage. Do not attempt another Load More activation after the control disappears; behavior after the specified end state is undefined.

**Source requirements and blocker setup:** website.md expects 3 initial Image & standfirst articles, each with a General Image, Pillar Category, and Title; the whole image is clickable to the individual article; initial placeholder configurable is Yes. One Load More activation is expected to add 6 similarly formatted articles, for 9 total, hide the control, and use expansion placeholder configurable No. Before starting the homepage workflow, scroll to the bottom as setup; if a blocking popup appears, stop and dismiss it with its close/dismiss control, verify hidden, return to the top, then verify the initial state before starting. This setup rule is not popup coverage. The public frontend can show category labels but cannot establish their CMS field mapping or either placeholder setting. Desktop only. If the blocker cannot be dismissed, record the blockage without popup details and continue within scope where practical.

## In-scope Element Types and Mandatory Checks

- General Content card: verify count and visible image, meaningful alt, category label(s), title, and standfirst. For one representative image click, confirm destination loads and record URL pattern/page type only.
- Content-changing Load More action: observe network before the action; capture every relevant action-caused request/response, response body or explicit capture limitation/error, timing, and resulting UI state. Capture counts before and after each activation through the end state. Do not turn observed endpoint, payload, response structure, status, or timing into acceptance criteria unless established by source contract.
- Representative homepage and article template: read rendered SEO values, headings, duplicates, and scoped image alt text. Keep article inspection to metadata required by standards, without inspecting its body or related content.
- Lighthouse: Chromium Desktop for those two representative pages only; each required category must have a score on a 0–100 scale and meet its threshold; missing scores fail.
- Generated tests must use meaningful report-attached screenshots, failure evidence, and reusable helpers; this is an automation standard, not extra site functionality.

## Requirements and Current Observations (2026-11-06)

At desktop, homepage `/` title is `Home | NUHS+`. After the source-required bottom-scroll setup and return to top, the scoped initial state remained 3 cards, with no change observed to the initial content count.

1. “A new role for AI in speech rehabilitation” — visible category Science; standfirst “Could AI bring rehabilitation beyond the clinic? NUHS is evaluating AISay to support recovery at home while complementing therapists’ care.”; image alt is the title; link `/article/a-new-role-for-ai-in-speech-rehabilitation`.
2. “Test - When does recovery start?” — categories Multimedia, News, Science; standfirst “Test - – Earlier than we thought. For patients undergoing total knee replacement, recovery began before surgery itself and led to a 67 per cent shorter hospital stay.”; image alt is the title; link `/stories/test---when-does--recovery-start`.
3. “Test - What are we not seeing?” — categories Multimedia, News, Science; standfirst “This is to test the standfirst”; image alt is the title; link `/stories/test---what-are-we-not-seeing`.

All three cards have a visible image, nonempty descriptive alt, visible category labels, title, and standfirst. The labels are publicly rendered but CMS Pillar Category mapping cannot be confirmed. Clicking the representative first card image opened `https://websparks-stg.sitefinity.cloud/article/a-new-role-for-ai-in-speech-rehabilitation`, title `A new role for AI in speech rehabilitation | NUHS+`; the URL and title identify an article page. Article body, related content, and other destination interactions were not examined.

A fresh Load More run recorded 3 cards before activation and 9 after, i.e. 6 added; the control was no longer visible. All six added cards had visible image/alt, category label(s), title, and standfirst. Titles: “Test - Why strength training matters as we age”; “test stand firsy”; “What happens when you go for a C-section? - LTest”; “Test - How AI supports antimicrobial stewardship in primary care”; “Test - IntelliRounds: Smarter patient prioritisation for ward rounds”; and “Test - The doctor-pilot who never stops learning (Safe Zone)”. No discrepancy was observed against the functional count/end-state requirements. Placeholder configurable values remain unverified in CMS, outside the public frontend scope. Further activations were not attempted.

One action-triggered XHR was observed and correlated with the UI expansion: `POST /api/ArticlesApi/LoadMoreArticles`, form payload `loadMoreCount=1&pillarCategory=home`, HTTP 200, `application/json; charset=utf-8`. The response preview showed `result.GeneralItems` and six items corresponding to rendered additions. The browser tool could not return the full 110.8 KB response body because its output limit was exceeded; the preview is not a complete body capture. A previous same-day observation reported duration 208 ms; current browser discovery did not expose a request duration. Timing is variable evidence, never an expectation. A background mailing-list cookie lookup was unrelated to the action and excluded.

## Major Functionality and User Journeys

1. Open homepage; complete blocker setup as specified; verify initial General Content cards; click one representative image and confirm article URL/page type.
2. Open a fresh homepage state; count cards; observe network; activate Load More once; associate relevant responses to rendered changes; verify six additions, same fields, total nine, and hidden control.
3. Perform mandatory shallow rendered metadata and Lighthouse checks for the homepage and the same representative article template only.

## Destination Page Type

Representative destination: `/article/a-new-role-for-ai-in-speech-rehabilitation`; page type: article. Current rendered title is `A new role for AI in speech rehabilitation | NUHS+`. Navigation outcome confirmed; article inspection otherwise remains shallow and limited to mandatory metadata.

## SEO Findings (rechecked 2026-11-06)

**Homepage:** title `Home | NUHS+`; meta description absent; one canonical, `https://websparks-stg.sitefinity.cloud/home`, mismatching loaded URL `/`; headings H1=0, H2=1, H3-H6=0; Open Graph title `Home`, URL `https://websparks-stg.sitefinity.cloud`, type `website`, site name `Default`, description absent, image absent; no Twitter metadata; no duplicate metadata keys. Three scoped card image alt texts are nonempty and descriptive.

**Representative article template:** title `A new role for AI in speech rehabilitation | NUHS+`; description present; one canonical matching the article URL; headings H1=1, H2=3, H3=1, H4-H6=0; Open Graph title, URL, type, site name, image, and description present (`og:type` is `website`); no Twitter metadata; no duplicate metadata keys. Representative hero alt is descriptive. No heading text or article body is recorded.

**Previously recorded once-per-run site-level findings, retained without repeating requests:** `/robots.txt` returned HTTP 200 `text/plain; charset=utf-8` with `User-agent: *` and `Disallow: /`; `/sitemap.xml` returned HTTP 200 `text/html; charset=utf-8` with an HTML Page Not Found document rather than XML.

## Lighthouse Status and Thresholds

Mandatory audits are Chromium Desktop only for the homepage and representative article template. Required thresholds (0–100): SEO >= 90; accessibility >= 90; best practices >= 90; performance >= 80. The repository has an existing dedicated Lighthouse config/spec setup, but Lighthouse audits have not been executed/verified in this planning run. Running the tests under the ordinary default config previously skipped both audits; use `npx playwright test -c tests/lighthouse/playwright.lighthouse.config.ts`. Until both audits produce valid scores and reports, this validation remains pending; do not claim a pass. No mobile audits.

## Validation Opportunities and Coverage Gaps

- Verify initial and expanded fields and meaningful image alts through user-visible card content; do not infer CMS field mapping from rendered labels.
- Capture all relevant action-caused requests/responses and full bodies when practically available. Record body-read/output limitations explicitly, redact sensitive data, and correlate evidence with the resulting UI.
- Placeholder configurability is not verifiable from the public frontend; do not enter CMS authoring.
- Failure/retry behavior has not been induced; source does not establish a contract for it, so do not invent expected behavior.
- Repeated Load More behavior after the end state is undefined and intentionally untested.
- Lighthouse execution remains the principal outstanding mandatory validation gap.

## Coverage Status

**Partially Analyzed.** Current functional requirements are observed and match the specified counts, fields, Load More end state, and representative article navigation. Homepage and representative article metadata were checked; current SEO discrepancies are documented. The raw Load More response body was truncated by the browser tool limit. CMS placeholder configuration/semantic category mapping cannot be verified in the public frontend. Mandatory Lighthouse audits remain pending.

## Discovery Limitations

- Full Load More response JSON (110.8 KB) exceeded the browser output limit; only the available preview and rendered item results were inspected.
- Current request timing was not exposed in the browser discovery output; prior same-day observation was 208 ms, recorded as variable evidence only.
- Lighthouse could not be run through the available browser discovery interface. Run with the dedicated Playwright config and inspect HTML reports and all four scores for both pages.
- CMS placeholder values and semantic category-field mapping are not exposed in the scoped public-facing area.
- No unsuccessful Load More response or post-end-state activation was tested, consistent with undefined source behavior.
- No popup behavior, persistence, cookies, or storage were analyzed or recorded; only the source blocker setup/handling rule applies.

## Reusable Workflow Opportunities

- Reuse the General Content card locator/field validation for initial and appended items while keeping the Load More action and network evidence owned by the homepage General Content workflow.
- Reuse shared screenshot, JSON/network evidence, SEO metadata, and failure-evidence helpers in automation. Keep Lighthouse separate.

## Current Automation Evidence References

The repository currently has homepage General Content navigation and Load More functional specs, a representative SEO spec, shared evidence/metadata helpers, and dedicated Lighthouse specs/config. Functional Chromium navigation and Load More passed in a prior run. SEO assertions surface observed metadata discrepancies. Lighthouse has not been executed successfully. This section records coverage context only; the plan remains the sole authority for scope and findings.

## Test Scenarios

### 1. Homepage General Content Owner

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify initial General Content cards and representative image navigation

**File:** `tests/functional/homepage-general-content-navigation.spec.ts`

**Steps:**
  1. Before starting the homepage workflow, scroll to the bottom as setup; if a blocker appears, dismiss it with its close/dismiss control, verify hidden, return to the top, and verify the initial state before continuing. Do not create blocker coverage.
    - expect: The homepage returns to its top with exactly 3 initial scoped cards; source-required setup does not change the initial count.
  2. Inspect only the homepage General Content area before expansion; verify the initial cards and visible fields.
    - expect: Exactly 3 cards are present.
    - expect: Each card has a General Image with meaningful alt, visible category label(s), title, and standfirst; CMS field mapping is not inferred.
  3. Click the representative first card image and inspect only URL and destination page type.
    - expect: The item opens an individual article at /article/a-new-role-for-ai-in-speech-rehabilitation; the page type is article.
    - expect: Do not inspect article body, related content, or other article interactions.

#### 1.2. Exercise Load More through its end state and capture network evidence

**File:** `tests/functional/homepage-general-content-load-more.spec.ts`

**Steps:**
  1. On a fresh homepage state, record the initial count and begin observing action-caused network requests before activating Load More once.
    - expect: Initial count is 3.
    - expect: Capture every relevant action-caused request and response, including URL, method, payload, status, content type, response body or explicit capture limitation/error, timing when available, and correlation to resulting UI. Treat observed network details as evidence, not assumed contracts.
  2. Verify additions, card fields, final total, and hidden end-state control; stop there.
    - expect: Exactly 6 cards are added in the same visible format; total is 9; Load More is hidden.
    - expect: Do not attempt another activation after the end state.

#### 1.3. Check mandatory shallow metadata on representative homepage and article template

**File:** `tests/functional/homepage-seo.spec.ts`

**Steps:**
  1. Read rendered title, description, canonical, heading structure, Open Graph/Twitter, duplicates, and scoped image alt on homepage and the same article template.
    - expect: Record absent, empty, duplicate, or mismatched values as findings; current findings are documented in SEO Findings.
    - expect: Homepage current findings: missing description; canonical /home mismatches /; H1 absent; Open Graph description/image absent; Twitter metadata absent; no duplicate keys.
    - expect: Article current findings: description, matching canonical, one H1, three H2, one H3, Open Graph fields present, no Twitter metadata or duplicate keys; descriptive hero alt.
    - expect: Do not inspect article body or related content.
  2. Preserve the previously recorded once-per-run robots.txt and sitemap.xml findings without unnecessary repeated requests.
    - expect: robots.txt previously returned 200 text/plain with User-agent: * and Disallow: /.
    - expect: sitemap.xml previously returned 200 text/html with an HTML Page Not Found document, not XML.

#### 1.4. Run mandatory desktop Lighthouse audits for representative pages

**File:** `tests/lighthouse/homepage-lighthouse.spec.ts and tests/lighthouse/article-lighthouse.spec.ts`

**Steps:**
  1. Run separate Chromium Desktop Lighthouse audits for the homepage and representative article template and save HTML reports.
    - expect: SEO >= 90; accessibility >= 90; best practices >= 90; performance >= 80, all on 0–100 scale.
    - expect: All category scores must be present. Current execution remains pending until both audits and reports are verified; no pass is claimed.
