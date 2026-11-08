# NUHS+ Homepage General Content — Scoped Coverage Plan

## Application Overview

Desktop-only scoped coverage of the NUHS+ staging homepage at
`https://websparks-stg.sitefinity.cloud/`. The established scope is the
homepage's General Content area, its directly attached Load More control,
and one representative card destination, inspected only as an article page.
Rendered SEO checks and desktop Lighthouse audits are scoped to the homepage
and that representative article page.

## Planning Basis and Interpretation

`website.md` describes discovery, coverage ownership, and planning standards;
it does not provide a site-specific navigation map or business requirements.
The existing plan supplies a concrete, bounded website scope and prior
observations. That scope is retained rather than expanding into a full-site
review or inferring unobserved areas. The scoped homepage workflow, its
representative article destination, and rendered metadata were rechecked
against the live staging site on 2026-11-09. The card counts remain observed
behavior, not requirements corroborated by site-specific content in
`website.md`.

## Scope

**In scope**

- Homepage General Content cards, including their visible images, alt text,
  category labels, titles, and standfirsts.
- The directly attached Load More behavior, from the initial card set through
  the observed end state, including relevant action-triggered network evidence.
- One representative card image click-through, limited to confirming its
  destination URL and article page type.
- Shallow rendered SEO checks for the homepage and the same representative
  article page.
- Chromium Desktop Lighthouse audits for those two representative pages.
- Previously recorded, once-per-run observations of `robots.txt` and
  `sitemap.xml`, without unnecessary repeat requests.

**Out of scope**

- Other homepage sections, site navigation and search, footer, subscription,
  unrelated shared components, and other destination pages.
- Article body/content, related content, and article interactions.
- Mobile and tablet layouts or audits.
- CMS authoring, category-field mapping, and CMS placeholder settings.
- Popup behavior, persistence, cookies, and storage. The popup rule below is
  setup-only and does not create popup coverage.
- Load More activations after the control disappears; behavior beyond that
  end state is undefined in the recorded source information.

**Scope notes**

- Before the homepage workflow, scroll to the bottom as setup. If a blocking
  popup appears, dismiss it with its close/dismiss control, verify it is
  closed, return to the top, and then confirm the initial card state. Do not
  inspect or test popup behavior beyond removing this blocker.
- During the 2026-11-09 live review, a blocking dialog appeared after the
  bottom-scroll setup. Its close control was used and the dialog was verified
  hidden before continuing; no popup behavior or persistence was evaluated.
- Further scoped workflow observations found the same blocking dialog visible
  during a later card interaction despite an earlier check finding no visible
  dialog; the backdrop intercepted the card action. The observed dialog was
  titled “Stay informed” and exposed a “Close” control. Treat this only as a
  setup blocker: before resuming the in-scope action, dismiss it and verify
  that it is hidden. This does not add popup coverage.
- If the blocker cannot be dismissed, record the blockage without popup
  details and continue within scope where practical.
- The 2026-11-09 live review confirmed 3 initial cards and one Load More
  activation adding 6 cards, for a total of 9, with the control hidden. The
  existing plan also records configurable placeholder expectations of Yes
  for initial content and No for expanded content. Those configuration
  values cannot be verified from the public frontend and are not acceptance
  checks here.

## Conceptual Coverage Areas and Ownership

| Coverage area | Primary ownership | Boundary and rationale |
|---|---|---|
| Homepage General Content | Homepage editorial content area (scoped boundary) | One scoped owner for the initial cards, their directly attached expansion behavior, and the card-to-article journey. The Load More control and the individual card fields are features within this area, not separate ownership areas. Global uniqueness was not assessed because other navigation areas and modules are outside scope. |

The representative article is a destination page type for shallow metadata
and navigation confirmation; available evidence does not establish a separate
article-content ownership area. No shared-component owner, navigation-area
owner, or special-module owner is identified within this deliberately narrow
scope. Requirement, workflow, and validation topics below describe coverage
within the owner; they do not create ownership areas.

## Navigation Areas, Business Areas, and Page Types

- **Navigation areas:** The homepage exposes header navigation, but its
  navigation areas are out of scope and were not explored or assigned
  ownership. The only scoped navigation outcome is a representative General
  Content card opening an individual article.
- **Business/content area:** Homepage editorial content discovery. No
  clinical, service, or other business workflow is inferred from article
  subject matter.
- **Page types:** Homepage; one representative article page.
- **Modules:** No separate special module was identified in the scoped
  evidence. General Content and its Load More control remain within homepage
  ownership.
- **Shared functionality:** No cross-area shared behavior was assessed.
  Similar card presentation within one content area is not sufficient
  evidence to assign shared-component ownership.

## Major Features and Recorded Findings

### General Content cards

At desktop, the homepage title was `Home | NUHS+`. After the source-required
bottom-scroll setup, dismissal of the blocker, and return to the top, the
initial scoped state remained at 3 cards. The first card image opened
`/article/a-new-role-for-ai-in-speech-rehabilitation`; the loaded destination
was confirmed as an article page.

| Card title | Visible category label(s) | Recorded standfirst |
|---|---|---|
| A new role for AI in speech rehabilitation | Science | Could AI bring rehabilitation beyond the clinic? NUHS is evaluating AISay to support recovery at home while complementing therapists' care. |
| Test - When does recovery start? | Multimedia, News, Science | Test - – Earlier than we thought. For patients undergoing total knee replacement, recovery began before surgery itself and led to a 67 per cent shorter hospital stay. |
| Test - What are we not seeing? | Multimedia, News, Science | This is to test the standfirst |

All three cards had a visible image with nonempty alt text matching the card
title, visible category labels, a title, and a standfirst. Each card was a
link to an individual destination. The representative article rendered the
title `A new role for AI in speech rehabilitation | NUHS+`; its body, related
content, and other interactions were not inspected.

One homepage console error was observed during the live review:
`TypeError: Cannot read properties of undefined (reading 'Constructor')`
from `bootstrap-select.min.js`. Its effect on the scoped card workflow was
not determined; the observed workflow remained usable.

### Load More

A fresh live run on 2026-11-09 showed 3 cards before one activation and 9
afterward: 6 cards were added, all with a visible image and nonempty alt,
category label(s), title, and standfirst. The control was no longer visible.
The added titles were:

- Test - Why strength training matters as we age
- test stand firsy
- What happens when you go for a C-section? - LTest
- Test - How AI supports antimicrobial stewardship in primary care
- Test - IntelliRounds: Smarter patient prioritisation for ward rounds
- Test - The doctor-pilot who never stops learning (Safe Zone)

No discrepancy was observed against the counts and end state recorded by the
existing plan. No later activation was attempted.

The action triggered `POST /api/ArticlesApi/LoadMoreArticles` with form
payload `loadMoreCount=1&pillarCategory=home`, HTTP 200,
`application/json; charset=utf-8`, and an observed duration of 670 ms. The
returned UI contained six cards matching the added titles. A previous
response preview contained `result.GeneralItems`, but its 110.8 KB body
exceeded the output limit; the preview was incomplete. A prior duration of
208 ms was also observed. Durations are variable evidence, not expectations.
Unrelated background mailing-list requests were excluded from the action
evidence; popup and cookie behavior were not analyzed.

## Workflows and User Journeys

1. **Browse homepage content:** Reach the homepage's initial General Content
   cards, inspect their visible fields, and follow one representative card
   image to confirm its article destination and URL pattern.
2. **Expand homepage content:** From a fresh homepage state, record the
   initial card count, activate Load More once, associate relevant
   action-triggered network evidence with the rendered change, and confirm
   the added cards and terminal hidden-control state.
3. **Review representative page metadata:** Check rendered metadata for the
   homepage and the same article page, without expanding into article content.
4. **Assess representative page quality:** Run the required desktop
   Lighthouse assessment on those two pages and compare category scores to
   the required thresholds; the latest available run reported failures.

## Validation Opportunities

- Confirm visible content and meaningful image alt text on initial and
  expanded cards; do not infer CMS field mappings from rendered labels.
- Confirm initial, per-activation, and final card counts, the six-item
  increase, and the hidden Load More end state.
- Observe network activity before expansion; capture every relevant
  action-triggered request/response, available response body, and resulting
  UI correlation. Record capture limitations explicitly and treat observed
  payload/status/timing as evidence rather than an assumed contract.
- Confirm the representative card destination loads as an article and record
  its URL pattern; keep article inspection limited to scope.
- For the homepage and representative article, inspect rendered title,
  description, canonical URL, heading structure, Open Graph and Twitter
  metadata, duplicate metadata, and scoped image alt text.
- Preserve the established thresholds for both desktop Lighthouse
  assessments: SEO >= 90, accessibility >= 90, best practices >= 90, and
  performance >= 80. Each score must be present on a 0–100 scale.
- Do not invent failure/retry expectations for Load More or repeat-use
  behavior after the recorded end state; no applicable contract is known.

## SEO Findings

The rendered metadata was rechecked on 2026-11-09.

### Homepage

- Title: `Home | NUHS+`.
- Meta description: absent.
- Canonical: one value, `https://websparks-stg.sitefinity.cloud/home`,
  mismatching the loaded `/` URL.
- Headings: no H1; one H2; no H3-H6.
- Open Graph: title `Home`, URL `https://websparks-stg.sitefinity.cloud`,
  type `website`, site name `Default`; description and image absent.
- Twitter metadata: absent.
- Duplicate metadata keys: none recorded.
- Three scoped card image alt texts were recorded as nonempty and descriptive.

### Representative article page

- Title: `A new role for AI in speech rehabilitation | NUHS+`.
- Description: present.
- Canonical: one value matching the article URL.
- Headings: one H1, three H2, one H3, and no H4-H6.
- Open Graph title, URL, type, site name, image, and description were
  present; `og:type` was `website`.
- Twitter metadata and duplicate metadata keys: none recorded.
- The representative hero alt text was descriptive and matched the article
  title.
- No heading text or article body is recorded.

### Previously recorded site-level observations

- `/robots.txt` returned HTTP 200 `text/plain; charset=utf-8` with
  `User-agent: *` and `Disallow: /`.
- `/sitemap.xml` returned HTTP 200 `text/html; charset=utf-8` containing an
  HTML Page Not Found document rather than XML.

These are retained once-per-run observations; they are not reasons to extend
page or workflow scope.

## Lighthouse Status

Chromium Desktop Lighthouse audits are required only for the homepage and
representative article page. The latest available audit run (2026-11-08)
reported these threshold failures:

| Page | Below-threshold categories |
|---|---|
| Representative article | SEO 69 (minimum 90); accessibility 88 (minimum 90) |
| Homepage | SEO 61 (minimum 90); accessibility 89 (minimum 90); performance 46 (minimum 80) |

The required thresholds remain SEO >= 90, accessibility >= 90, best
practices >= 90, and performance >= 80. Do not infer a site defect in a
category not listed as failing or treat variable scores as fixed. Both page
audits remain below at least one required threshold; mobile audits are out of
scope.

## Coverage Status and Gaps

**Status: Scoped findings documented; quality gaps remain.** On 2026-11-09,
the live review confirmed the initial and expanded card states, the observed
Load More request and response status, and the representative article
destination. Rendered SEO findings were refreshed. The latest available
Lighthouse results remain below required thresholds. The expanded response
body was not fully available for inspection.

Known gaps and limitations:

- The full Load More response body was not captured because it exceeded the
  browser output limit.
- The current observed request duration was 670 ms; an earlier observation
  was 208 ms. Neither is a target.
- The public frontend does not expose CMS placeholder values or confirm
  semantic category-field mapping.
- No unsuccessful Load More response or post-end-state activation was
  tested; behavior is undefined in the recorded source information.
- The setup-only blocking dialog was dismissed and verified hidden. Its
  behavior, persistence, cookies, and storage were not analyzed. A later
  appearance intercepted a scoped card click after an earlier absence
  check, so the blocker can appear between workflow steps.
- A homepage JavaScript console error was observed; its impact on the
  in-scope content workflow is undetermined.
- The current `website.md` provides no site-specific requirement source to
  validate the recorded count expectations or CMS settings against.
- No navigation hierarchy, other page types, shared behavior across
  ownership areas, or other modules were discovered within this scope.

## Recommendations

- Keep future work within the existing homepage General Content scope unless
  a separate scope decision is made.
- If authoritative business requirements become available, reconcile them
  with the recorded 3-card initial state and one-activation 6-card increase;
  do not treat the generic planning guidance in `website.md` as that
  business source.
- Treat the unverified CMS placeholder values and category-field mapping as
  manual/source-owner questions, not frontend assertions.
- Review the below-threshold SEO, accessibility, and homepage performance
  findings, then repeat both mandatory desktop Lighthouse assessments to
  record the post-review scores for all four categories.
- Review the observed homepage script error to determine whether it affects
  supported behavior; do not infer an impact from the console message alone.
- Keep blocker handling limited to dismissal and verification immediately
  before resuming a blocked in-scope action; do not add popup or persistence
  scenarios.
- If response evidence is collected again, capture the complete response
  body when practical and explicitly document any capture limitation.
