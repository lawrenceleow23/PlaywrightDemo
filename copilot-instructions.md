# Playwright AI Lab

## Goal

Generate maintainable Playwright TypeScript automation through complete website discovery and analysis.

The objective is to:

- Discover the entire website
- Discover all navigation structures
- Discover all workflows
- Discover all page types
- Discover all shared components
- Discover all meaningful user journeys
- Discover all validation scenarios

Generate maintainable, reusable, and evidence-driven Playwright coverage.

When website-test-plan.md defines a scope, this objective applies to the scope only (see Scope Control).

Never generate coverage from assumptions.

Always generate coverage from discovered behavior.

---

## Scope Control

website-test-plan.md is the authority for scope.

website.md is the planning input. It is read to produce and update the plan.
After that, the plan is the single source of scope for both planning updates
and generation.

Planning:

1. Read website.md and any existing website-test-plan.md.
2. Resolve the in-scope areas, expanding each to its directly attached
   controls and the destination pages those controls lead to.
3. Record a Scope section in website-test-plan.md containing:
   - In-scope areas
   - Out-of-scope items
   - Scope notes from website.md (for example platform limits, depth limits
     for destination pages, and the popup blocker rule)
4. The Scope section describes website scope only. Role restrictions such as
   "do not generate code" or "planning output only" belong to the planner
   role. Never record them in the Scope section or as out-of-scope items.

Generation:

1. Take scope only from the Scope section of website-test-plan.md. Treat
   website.md as context, not as a second source of scope.
2. Generate only for in-scope areas. Items listed as out of scope stay out
   of generation.
3. If website.md and the plan differ, the plan wins. Run planning first to
   merge the change into the plan.
4. If the Scope section lists code generation or automation as out of
   scope, treat that as a planner role restriction. Ignore it, continue
   generation, and mention it in the summary.
5. If the plan has no Scope section, fall back to website.md. If neither
   defines scope, treat the run as a full-site run.

When scope is defined:

- Do not run full-site discovery.
- The following sections apply to full-site runs only: Discovery Execution
  Order, Navigation Coverage Strategy, Navigation Completeness Requirement,
  Future Navigation Discovery, Navigation Hierarchy Exploration, Shared
  Component Auto Discovery, and Comprehensive Website Discovery.
- The Discovery Termination Rule, Page Completion Verification, and
  Generation Quality Gate apply only to the resolved scope.

When no scope is defined, discover the entire website as described below.

The plan decides where to look. This file decides what must be checked
there. Do not skip a check in this file because the plan does not mention it.

---

## Scope-Triggered Standards

After resolving scope, list the element types found in it. Each type below
triggers mandatory checks, whether or not the plan mentions them.

| Found in scope | Mandatory checks |
|---|---|
| Lighthouse is mandatory for representative in-scope pages. Respect the
plan's device and page scope; do not audit excluded pages or device profiles.
Other optional checks run only when their tooling is available and scope
does not exclude them. |
| Any interaction that changes content (Load More, pagination, infinite scroll, search, filter, sort, carousel) | Network discovery: capture the requests the interaction triggers. Keep the evidence inside the owning workflow. |
| Any expandable or paged content | Load More Discovery: counts before and after each activation, until the end state. |
| Any item that navigates | Destination page type and navigation outcome. |
| Any time-based or automatic behavior (auto-rotation, delayed content) | Validate observable state changes with polling. Never use fixed waits. |
| Any popup or overlay | The popup rule recorded in the plan's Scope section when present, otherwise Popup Handling. Popup persistence only when the plan's scope asks for it. |
| Any generated test | Screenshot Standards, report attachments, failure evidence, and shared helpers. |

Optional checks (Lighthouse and similar) run only when their tooling is
available and scope does not exclude them.

If planning finds that a mandatory check was not covered by the plan, add it
to website-test-plan.md. If generation finds the plan is missing a mandatory
check for an in-scope element, perform that discovery live, add the finding
to website-test-plan.md, then generate coverage from it.

---

## Component Playbook

How to discover and capture each component. These are reused for every run.

### Network And API

For in-scope actions that change content or state, observe network activity
before triggering the action.

- Identify requests caused by the action during discovery.
- Capture all relevant action-triggered requests and responses, not only
  the first matching response.
- Exclude unrelated background and analytics requests.
- Wait for the relevant responses and resulting UI state before completing
  evidence collection.
- Attach request and response evidence to the originating test using a
  reusable helper.
- Remove any network listeners after the workflow.

Follow the API Evidence Collection section for evidence details and
sensitive-data handling.

### SEO

- Check page title, meta description, canonical URL, heading structure (one
  h1, logical order), Open Graph and Twitter metadata, and image alt text.
- Read values from the rendered page. Validate one representative page per
  template and do not repeat it for every item sharing that template.
- Record missing, empty, or duplicated values as findings.

### Load More And Expanding Content

- Record the count before the action, after each activation, and the
  increase per activation. Continue until the control disappears or stops
  adding content. Record the final total.

### Carousels And Auto-Rotation

- Identify the active item. Validate that it changes through arrows and
  through automatic rotation, using polling on the active item. Do not
  assert exact timings.

### Click-Through Items

- Click a representative item, confirm the destination loads, and record the
  page type and URL pattern.

### Screenshots And Evidence

- Capture only at meaningful business states, through the shared helper,
  with T# naming. Attach every screenshot to the Playwright report.

### Popups

- Check before every interaction and after every scroll. Dismiss, verify
  closed, resume, and record one line per appearance.

---

## Planner And Generator Responsibilities

Planner: read website.md, resolve scope, record the Scope section in
website-test-plan.md, list element types, apply the Scope-Triggered
Standards, and record discovered behavior and findings in the plan. Do not
generate code.

Generator: take scope from the plan's Scope section, confirm the plan covers
every mandatory check for the in-scope elements, fill gaps by discovering them
live and recording them in the plan, then generate or update tests following
the Component Playbook and the helper rules.

---

## Discovery First Principle

Always follow:

Discovery
→ Planning
→ Generation

Never:

Generation
→ Guessing

Coverage must be based on observed functionality.

---

## Discovery Execution Order

Perform discovery in the following order:

1. Homepage
2. Shared Components
3. Top-Level Navigation Areas
4. Sub-Navigation Areas
5. Destination Page Types
6. Related User Journeys
7. Special Modules
8. Unique Page-Specific Functionality

Coverage generation should occur only after discovery is sufficiently complete.

---

## Navigation Coverage Strategy

Discovery should follow actual user navigation.

Follow:

Homepage
→ Shared Components
→ Top Navigation
→ Sub Navigation
→ Landing Pages
→ Destination Pages
→ Related Content
→ Special Modules
→ Unique Features

Do not primarily rely on URL structures.

Do not primarily rely on sitemap assumptions.

Coverage should follow how users navigate the website.

---

## Navigation Completeness Requirement

Do not rely on predefined navigation lists.

Discover all navigation from the actual website structure.

During discovery:

- Identify all top-level navigation areas.
- Identify all sub-navigation areas.
- Identify all landing pages.
- Identify all destination page types.
- Identify all meaningful user journeys.

When additional navigation areas are discovered:

- Include them in planning.
- Include them in coverage.
- Include them in test generation.

Discovery should automatically expand as the website evolves.

---

## Future Navigation Discovery

Navigation names must not be hardcoded.

When new navigation areas are discovered:

- Include them in planning.
- Include them in coverage.
- Generate dedicated spec recommendations.

Examples:

- Research
- Events
- Publications
- Resources
- Awards
- New future sections

New navigation should be automatically discovered without changing prompts.

---

## Navigation Hierarchy Exploration

When navigation contains multiple levels:

Examples:

Menu
→ Submenu
→ Destination Page

Category
→ Subcategory
→ Detail Page

Analyze every discovered level.

For each level:

- Analyze landing pages.
- Analyze interactions.
- Analyze workflows.
- Analyze destination pages.
- Analyze user journeys.

Do not assume lower levels behave the same as higher levels.

---

## Coverage Breadth Before Depth

Prioritize complete navigation coverage before deep exploration.

Preferred:

Homepage
→ Nav A
→ Nav B
→ Nav C
→ Nav D

Avoid:

Homepage
→ Page
→ Related
→ Related
→ Related
→ Related

Do not remain indefinitely within:

- Related-content chains
- Recommendation loops
- Recursive navigation paths
- Popup loops
- Failed-interaction loops

After completing a navigation area:

Return to the appropriate navigation level and continue discovery.

---

## Shared Component Auto Discovery

Do not rely on predefined shared-component lists.

Discover shared functionality by comparing behavior across pages.

When functionality appears consistently across multiple pages:

- Classify it as a Shared Component.
- Generate dedicated shared-component coverage.
- Avoid duplicate tests.

Examples may include:

- Header
- Footer
- Navigation
- Search
- Accessibility
- Social Media
- Subscribe
- Popup
- Cookie Banner
- Scroll-To-Top
- Shared Widgets

These examples are not exhaustive.

Discovery must be based on actual website behavior.

Shared components should be discovered, documented, and validated once during a discovery session unless additional validation is explicitly required.

After a shared component has been identified and documented:

- Continue discovery.
- Prioritise discovering new functionality.
- Avoid repeatedly revisiting identical behaviour.

Examples include:

- MailingList Popup
- Cookie Banner
- Accessibility Controls
- Header
- Footer
- Social Media Links
- Subscribe Widgets
- Scroll-To-Top

When a shared component appears on multiple pages:

- Document the behaviour.
- Record page-specific differences when present.
- Avoid repeatedly validating identical behaviour across pages.

Discovery should prioritise uncovering new functionality over re-validating previously documented shared functionality.

If a shared component blocks discovery:

- Document the behaviour.
- Capture required evidence.
- Dismiss or complete the interaction.
- Continue discovery.

Avoid remaining on the same page solely to repeatedly validate the same shared component.

---

## Coverage Ownership Strategy

Every discovered feature must have one primary owner.

Coverage ownership should be assigned dynamically based on discovered website structure.

Ownership should be determined from:

- Shared functionality
- Navigation structure
- Business domains
- Module boundaries
- User journeys

Avoid assigning ownership based on individual validation scenarios.

Planning should identify ownership areas rather than automation test cases.

Generation should group related validations under the same coverage owner whenever practical.

### Shared Components

Assign ownership to a shared component coverage area.

Examples:

- Header
- Footer
- Search
- Social Media
- Accessibility Controls
- Popup
- Cookie Behaviour
- Scroll-To-Top
- Subscribe Functionality

### Navigation Components

Assign ownership to discovered navigation coverage areas.

### Page-Specific Components

Generate coverage within the owning navigation or module spec.

Examples:

- Calculator
- Directory
- Doctor Finder
- Portal
- Knowledge Base Tool

Avoid duplicate ownership.

---

## Shared Component Coverage

Shared functionality should be assigned to a shared component coverage owner.

Examples:

- Header
- Footer
- Search Access
- Accessibility Controls
- Subscribe Functionality
- Social Media
- Popup Behaviour
- Cookie Persistence
- Scroll-To-Top

Only generate page-specific coverage when behaviour differs.

Coverage ownership should remain conceptual during planning.

Final spec file organization should be determined during generation based on discovered coverage ownership areas.

---

## Shared Component Generation Rules

Shared component implementation must follow the validation location selected during discovery and documented in website-test-plan.md.

Do not arbitrarily select alternate pages during generation.

When generating shared component coverage:

- Follow the preferred validation location documented in website-test-plan.md.
- Do not substitute another page for convenience.
- Do not introduce additional navigation when equivalent coverage already exists.

When multiple pages provide equivalent coverage:

- Use the preferred location documented during planning.
- Avoid unnecessary navigation.

Generation should follow planning decisions rather than introducing new validation locations.

---

## Comprehensive Website Discovery

Discover the entire website.

Do not stop at:

- Navigation discovery
- Page discovery
- Feature discovery
- Workflow discovery

Continue until meaningful functionality remains unexplored.

---

## Discovery Completeness Strategy

For every page:

- Analyze structure.
- Identify sections.
- Identify interactions.
- Identify workflows.
- Identify user journeys.
- Identify dynamic behavior.
- Identify state changes.

Scroll through the entire page.

Inspect:

- Above-the-fold content
- Below-the-fold content
- Expanded content
- Dynamic content
- Lazy-loaded content
- Interaction-revealed content

Do not stop after discovering the first feature.

---

## Full Page Review Requirement

Every page should be reviewed completely.

For every page:

- Review all visible sections.
- Review all interactive sections.
- Review all expandable sections.
- Review all dynamic sections.
- Review all destination links.
- Review all workflows.
- Review all significant user actions.

Continue until no meaningful content remains unexplored.

---

## Page Completion Verification

Before leaving a page verify:

- All visible sections reviewed.
- All interactive sections reviewed.
- All expandable sections reviewed.
- All dynamic content reviewed.
- All workflows identified.
- All significant actions evaluated.
- All meaningful destination paths reviewed.

If any answer is no:

Continue discovery.

---

## Interaction Discovery Strategy

Identify all meaningful interactions.

Examples may include:

- Navigation
- Click Actions
- Forms
- Search
- Filtering
- Sorting
- Load More
- Pagination
- Infinite Scroll
- Expand / Collapse
- Media Interactions
- Downloads
- Widgets

For every interaction identify:

- Trigger
- Outcome
- State Change
- Navigation Change
- Data Change
- Additional Workflow Opportunities

---

## State Discovery Strategy

Identify meaningful states.

Examples:

- Initial State
- Loading State
- Active State
- Selected State
- Expanded State
- Collapsed State
- Empty State
- No Result State
- Error State
- Completed State

Coverage should validate meaningful state transitions.

---

## Workflow Discovery Strategy

For every feature identify:

- Entry Points
- User Actions
- Expected Outcomes
- Alternate Paths
- Error Paths
- Recovery Paths

Generate tests from workflows rather than isolated controls.

---

## Validation Scenario Discovery

For every feature identify:

- Positive Scenarios
- Negative Scenarios
- Empty-State Scenarios
- Boundary Scenarios
- Recovery Scenarios
- Repeated-Use Scenarios

Examples:

Search:

- Existing Value
- Partial Value
- Empty Search
- Invalid Search
- No Result Search

Forms:

- Valid Submission
- Invalid Submission
- Required Validation

Filtering:

- Single Filter
- Multiple Filters
- Filter Reset

Discovery is incomplete until meaningful validation scenarios are identified.

---

## Common CMS Functionality Discovery

When present discover:

- Featured Content
- Highlighted Content
- General Content
- Content Cards
- Search
- Filter
- Sort
- Pagination
- Load More
- Infinite Scroll
- Related Content
- Recommended Content
- Share Functionality
- Detail Pages
- Video Content
- Media Content

These examples are not exhaustive.

Discover functionality based on actual website behavior.

---

## Load More Discovery

When Load More exists:

Discover:

- Initial Content Count
- Updated Content Count
- Content Increase Per Action
- Multiple Activations
- End-of-Results Behavior

Record findings for use during test generation.

---

## Search Discovery

When search exists:

Discover:

- Existing Value Search
- Partial Value Search
- Empty Search
- Invalid Search
- No Result Search
- Result Navigation

Document observed behavior and validation opportunities.

---

## Popup Handling

Follow the popup rule recorded in the plan's Scope section when present.

If a blocking popup appears and popup behavior is not in scope:

1. Pause the current interaction.
2. Dismiss it using its observed close or dismiss control.
3. Verify it is no longer visible and no longer blocks the interaction.
4. Resume the interrupted step.

Do not create popup validation or persistence coverage unless it is in scope.
If it cannot be safely dismissed, report the blocker and affected coverage.

Discovery should pause while a blocking popup remains visible.

Do not continue:

- Scrolling
- Navigation
- Search exploration
- Page discovery
- Workflow discovery
- Component discovery
- SEO discovery

while a blocking popup, modal, overlay, Mailing List Subscription Popup,
subscribe prompt, cookie banner, consent dialog, or similar blocking
component remains visible.

Popup dismissal takes precedence over continued discovery.

Discovery findings gathered while a blocking popup remains visible should not
be considered complete until the popup has been dismissed.

Continue discovery after the popup has been dismissed. Document and validate
popup behavior only when the plan includes it in scope.

Check for blocking popups when an interaction is obstructed and before
capturing evidence of the intended page state. A popup may appear after
navigation, scrolling, or another action. Use a reusable dismissal helper;
do not force-click through the overlay.

Do not repeatedly trigger and revalidate the same popup during the same
discovery session unless persistence behaviour is being analysed.

---

## Popup Persistence Discovery

In a scoped run, analyze popup persistence only when the plan's Scope section asks for it.

When popup functionality exists:

Analyze:

- First Visit Appearance
- Dismissal
- Refresh Behavior
- Navigation Behavior
- Cookie Persistence
- Local Storage Persistence
- Reappearance After Cleanup

Document discovered behavior.

---

## Discovery Termination Rule

Discovery is complete only when:

- No additional navigation areas can be found.
- No additional page types can be found.
- No additional modules can be found.
- No additional shared components can be found.
- No additional user journeys can be found.
- No meaningful functionality remains unexplored.

---

## Spec File Organization

Organize functional specs around discovered website coverage areas. Assign
every in-scope behavior one primary owner.

- Put genuinely shared, cross-page components and behavior in
  `global.spec.ts`.
- Put each distinct navigation area, page, or module in its own
  appropriately named spec when it has in-scope behavior.
- Keep an area's directly attached controls and workflows in that area's
  spec. Do not create a separate spec for each control, assertion, or
  test scenario.
- When a shared component has a meaningful page-specific variation,
  cover its common behavior in `global.spec.ts` and the variation in the
  relevant area spec. Do not duplicate the common checks.
- Keep Lighthouse audits in their own suite, separate from functional specs.

Discover the navigation areas and shared components from the website and
the plan. Do not assume particular pages or create empty spec files.

Follow the repository's existing folder and naming conventions. Reuse
suitable existing specs where appropriate, and create files only for
coverage in scope.

The planning document should describe coverage ownership conceptually.
Apply the file organization during generation. When updating existing
tests, preserve valid and unrelated coverage, and account for it before
moving or removing files.

---

## Test Case Organization

Within each spec file:

- Use test.describe()
- Create multiple focused tests
- Create independent tests
- Validate one meaningful workflow or scenario per test whenever practical

Avoid:

- Mega tests
- Long end-to-end validations covering unrelated functionality
- Duplicate validations

---

## Validation Principles

Validate:

- User Outcomes
- Navigation Outcomes
- Data Changes
- Content Changes
- Workflow Completion
- Business Outcomes
- State Transitions

Avoid element-existence-only testing when better behavioral validation exists.

---

### Behaviour-Driven Validation

When validating configurable controls, accessibility features, preferences, display settings, or user-adjustable options:

Prefer validating observable user behaviour over implementation details.

Examples may include:

- Text Resizers
- Accessibility Controls
- Theme Changes
- Language Selection
- Sorting Options
- Filtering Options
- View Preferences
- Personalization Features

Validate:

- Available options
- Active state behaviour
- State transitions
- Relative changes
- User-visible outcomes

Prefer:

- Smaller than Default
- Equal to Default
- Larger than Default

Prefer:

- Before State
- Changed State
- Restored State

Avoid:

- Exact pixel values
- Exact CSS values
- Fragile rendering-dependent values
- Browser-specific rendering assumptions

Generate validations based on business behaviour and user experience whenever practical.

Prefer validating what the user experiences instead of validating internal implementation details.

When validating responsive or device-specific behaviour:

Prefer executing tests using the appropriate browser or device profile.

Examples:

- Mobile Navigation → Mobile Device Profile
- Tablet Navigation → Tablet Device Profile
- Desktop Navigation → Desktop Browser

Avoid validating mobile behaviour solely through desktop viewport resizing when an appropriate device profile is available.

Prefer validating behaviour under realistic user conditions.

---

## Dynamic Content And Network Validation

Network discovery is mandatory for every in-scope interaction that changes content (see Scope-Triggered Standards). "When practical" below applies only to optional detail.

Identify:

- REST APIs
- GraphQL APIs
- AJAX Requests
- Fetch Requests
- XHR Requests
- Dynamic Rendering
- Lazy Loading

When practical:

- Validate request success.
- Validate response success.
- Validate UI updates.
- Validate business outcomes.

---

### API Discovery And Validation

When practical discover:

- REST APIs
- GraphQL APIs
- AJAX Requests
- Fetch Requests
- XHR Requests

Identify:

- Page-load requests
- User-triggered requests
- Background requests
- State-change requests
- Dynamic content requests

For discovered requests capture:

- Request URL
- Request Method
- Request Payload when available
- Response Status
- Response Timing
- Response Summary when available

Document discovered APIs and their associated user journeys.

Do not rely on predefined API endpoints.

Discover and associate network activity dynamically based on observed application behaviour.

### API Evidence Collection

Capture network activity that contributes to an in-scope workflow,
interaction, state change, or user-visible outcome.

Begin observing before the triggering action. Identify the relevant
requests from observed behavior and associate them with the workflow.
Do not assume that every action triggers an API request.

For each relevant request, capture and attach when available:

- Request URL and method
- Request payload
- Response status and content type
- Response body, not only a summary
- Timing
- Request failure or response-body read error

Capture all relevant requests caused by the action. Wait for the relevant
responses and the expected UI state, then stop observation and remove
listeners. Do not rely on arbitrary fixed delays.

Redact credentials, tokens, cookies, personal data, and other sensitive
information from URLs, headers, payloads, and response bodies before
attaching evidence. If a body cannot be read or must be truncated, record
that explicitly with the reason. Do not silently discard capture errors.

Use the evidence to show:

- Which action triggered the request
- What request and response were observed
- How the response relates to the resulting user-visible outcome

Keep network validation within the owning workflow whenever practical.
Do not create a separate API-only test when the request belongs to a
functional workflow.

Do not assert exact endpoints, payloads, status codes, response structures,
or timings unless they are specified or established as reliable contracts.

---

## SEO And Performance Validation

SEO metadata validation and Lighthouse audits are mandatory for representative
in-scope page types, regardless of whether the functional specification
mentions them (see Scope-Triggered Standards).

When practical analyze:

- Page Title
- Meta Description
- Canonical URL
- Heading Structure
- Open Graph Metadata
- Twitter Card Metadata
- Image ALT Text
- Robots.txt
- Sitemap.xml

When Lighthouse tooling is available analyze:

- SEO
- Accessibility
- Performance
- Best Practices

Generate dedicated SEO and performance coverage whenever discoverable SEO metadata or SEO-relevant page structures are present.

Capture significant SEO findings in generated reports when practical.

Attach Lighthouse reports to test evidence when supported by the framework.

SEO coverage should focus on representative page types rather than individual content instances when behaviour is inherited from a shared template.

Identify representative page types from discovered website structure.

When multiple pages share the same SEO implementation:

- Select representative pages.
- Validate template behaviour.
- Validate metadata generation behaviour.
- Avoid duplicate SEO coverage across identical content instances.

Prioritize coverage breadth across discovered page types rather than repetitive validation of pages that share the same implementation.

SEO coverage should focus on:

- Template behaviour
- Metadata quality
- Content type coverage

rather than exhaustive validation of every individual page.

---

### Representative SEO Coverage Strategy

When multiple pages share the same template, layout, metadata implementation, or content structure:

Prefer validating representative pages rather than generating duplicate SEO coverage for every content instance.

Examples may include:

- Articles
- News Items
- Blog Posts
- Resources
- Publications
- Directory Entries
- CMS-Generated Detail Pages
- Product Pages

When equivalent SEO behaviour is expected across pages generated from the same template:

- Select representative pages.
- Validate the shared metadata implementation.
- Validate canonical behaviour.
- Validate heading structure.
- Validate structured data where applicable.

Avoid generating identical SEO validations for every content instance when the behaviour is inherited from the same template.

Prioritize coverage breadth across page types rather than repetitive validation of pages that share the same implementation.

SEO coverage should focus on:

- Template behaviour
- Metadata quality
- Content type coverage

rather than exhaustive validation of every individual page.

---

### Lighthouse Configuration Strategy

During planning, identify representative in-scope page types and device
profiles for Lighthouse coverage and record them in website-test-plan.md.
Record any audit limitations or blockers in the plan. Planning produces
planning output only, not test code or configuration.

During generation, create runnable Lighthouse audits for those pages and
profiles, even when Lighthouse is not mentioned in the functional
specification. Reuse an existing compatible setup where available. Otherwise,
create the required test and configuration, and add only necessary
dependencies in accordance with Configuration Handling.

When no compatible Lighthouse setup exists:

- Automatically create a dedicated Playwright Lighthouse configuration and
  Lighthouse spec files in appropriate locations for the existing project.
  Configure test discovery to include the generated audit specs.
- Define or reuse configuration for the base URL, representative in-scope
  pages, device profiles, Lighthouse settings, score thresholds, and report
  output paths. Use the supplied URL or an existing project setting; do not
  invent a URL or credentials. Report missing required inputs as blockers.
- Configure a compatible Chromium-based browser and Lighthouse connection.
  Ensure browser launch settings and audit connection settings agree, and
  prevent debugging-port conflicts between concurrent audits.
- Keep Lighthouse audits separate from unrelated functional tests. Respect
  the plan's device scope; do not generate mobile audits for desktop-only scope.
- Ensure all referenced config modules, imports, dependencies, and output
  paths exist and are consistent. Update the dependency manifest and lockfile
  if a required development dependency is missing.
- Provide commands using the actual configuration and spec paths to list and
  run the Lighthouse suite and view its reports.

Define and export Lighthouse score thresholds in
`playwright.lighthouse.config.ts`. Reuse the existing file or create it
as part of the Lighthouse setup; do not create a separate threshold
configuration file.

Apply the defaults from Lighthouse Threshold Strategy unless project
requirements specify different targets. The audit helper or tests must
import and use the exported values. Do not define conflicting thresholds
inside individual tests or add unsupported properties to the Playwright
configuration object.

Verify that the configuration imports correctly and that a score below a
configured threshold fails the audit. If verification is blocked, report
the reason.

Validate the generated setup by listing the intended tests and running the
audit when the environment and site are accessible. Report setup failures,
inaccessible pages, and failed audits explicitly. Do not claim the setup is
verified if execution is blocked, and do not treat a skipped or empty suite as
a successful audit.

Run audits against representative in-scope device profiles.

Preferred Profiles:

Desktop:
- Chromium Desktop

Mobile, only when in scope:
- Mobile Device Emulation

Select representative pages from the in-scope page types, such as:

- Homepage
- Landing Pages
- Search Pages
- Content Detail Pages

Capture:

- SEO Score
- Accessibility Score
- Performance Score
- Best Practices Score

Report Lighthouse findings as part of generated evidence.

Save an HTML report for each audit, including failing audits. If setup or
execution cannot be completed, report the reason and affected coverage
explicitly; do not silently skip an audit or claim it passed.

---

### Lighthouse Threshold Strategy

Default thresholds:

- SEO >= 90
- Accessibility >= 90
- Best Practices >= 90
- Performance >= 80

When thresholds are violated:

- Fail the audit test.
- Capture Lighthouse evidence.
- Record failing metrics.
- Include findings in generated reports.

Apply thresholds to each audited page and each required category. Interpret
scores and thresholds on a consistent 0–100 scale; convert Lighthouse scores
if the audit tool returns values on a 0–1 scale. A missing category score is
an error, not a pass.

Thresholds may be adjusted when project requirements specify different targets.

---

## Synchronization Strategy

Prefer:

- waitForResponse()
- expect.poll()
- Locator Assertions
- Playwright Native Waiting

Avoid:

- waitForTimeout()
- Arbitrary Delays

Wait for business outcomes rather than elapsed time.

---

## Screenshot Standards

Each test case should produce at least one successful validation screenshot
and failure evidence when it fails.

Capture and attach screenshots at meaningful points in the workflow.
A screenshot may be taken before an action, after an action, or at both
points when useful.

Choose evidence points based on what a reviewer needs to understand:

- The starting state
- The action or relevant control
- A significant state change
- The validation outcome
- A failure

Use descriptive attachment names and reusable screenshot helpers. Ensure
screenshots show the relevant content and do not expose sensitive data.

Do not enforce the same screenshot sequence for every workflow.

---

### Screenshot Optimization

Capture evidence only when it provides meaningful validation value.

Preferred evidence points include:

- Initial State
- Significant State Changes
- Final Validation
- Failure Evidence

Avoid capturing screenshots for every individual action when assertions already validate the outcome.

The number of screenshots should be proportional to the complexity of the workflow.

Simple workflows should capture evidence only for key validation points.

Complex workflows may capture additional evidence when:

- Multiple significant state transitions exist.
- Business validation requires proof of each stage.
- Workflow progression must be demonstrated.
- Troubleshooting benefits from additional context.

Generate the minimum evidence necessary to support:

- Validation
- Reporting
- Troubleshooting
- Failure Analysis

Evidence requirements should be determined by workflow type.

State-Based Validation

Capture evidence for significant validation states.

Examples:

- Small Validation
- Medium Validation
- Large Validation
- Theme Validation
- Language Validation
- Accessibility Validation

Workflow-Based Validation

Capture evidence for meaningful workflow progression.

Examples:

- Popup Appears
- Popup Dismissed
- Persistence Validation

- Header Visible
- Footer Visible
- Returned To Top

- Search Executed
- Results Displayed
- Result Navigation

Do not automatically apply the same evidence pattern to every workflow.

Prefer evidence that demonstrates business outcomes rather than framework-driven stages.

---

### Workflow Evidence Strategy

When a workflow contains multiple related actions within the same validation scenario:

Capture evidence for meaningful validation points rather than every individual action.

Preferred evidence points include:

- Initial State
- Significant State Changes
- Validation State
- Final State
- Failure State

Screenshots may be captured before an action, after an action, or at both
points when useful to demonstrate the workflow and its outcome.

For workflows that visibly change content, capture the relevant state before
the action and after the updated content is displayed when practical.

The amount of evidence should be proportional to the complexity of the workflow.

Simple workflows should capture evidence only for key validation points.

Complex workflows may capture additional evidence when:

- Multiple significant state transitions exist
- Business validation requires proof of each stage
- Workflow progression must be demonstrated
- Troubleshooting benefits from additional context

Evidence should be aligned to meaningful business states rather than framework-defined stages.

Additional screenshots should represent meaningful business outcomes rather than individual clicks, selections, or interactions.

Examples:

Text Resizer

- Small Validation
- Medium Validation
- Large Validation

Popup Persistence

- Popup Appears
- Popup Dismissed
- Persistence Validation

Search

- Search Executed
- Results Displayed
- Result Navigation

Prefer evidence that demonstrates business outcomes over evidence that merely records individual interactions.

Each test case should produce evidence.

At minimum:

- One successful validation screenshot per test case
- Failure evidence when failures occur

Evidence should be understandable without requiring test reproduction.

A reviewer should be able to understand:

- What was validated
- What state was reached
- Whether validation succeeded

From the associated evidence and report attachments.

During discovery, avoid repeatedly validating the same component when its behaviour has already been captured.

Shared components should be documented once and reused within planning unless behaviour changes are observed.

---

## Screenshot Naming Convention

Test cases should be numbered sequentially within each spec file.

Examples:

T1 - Font Size Adjustment
T2 - Popup Persistence
T3 - Scroll To Top

When multiple screenshots exist within a test case, use sub-identifiers.

Examples:

T1a-Initial-State.png
T1b-State-Change.png
T1c-Final-Validation.png

T2a-Popup-Appears.png
T2b-Popup-Dismissed.png
T2c-Persistence-Validation.png

Failure Evidence:

T1-Failure.png
T2-Failure.png
T3-Failure.png

The same test identifier should be reused across:

- Test Names
- Screenshots
- Report Attachments
- Failure Evidence
- AI Healing Analysis

Meaningful state transitions should receive unique screenshot identifiers.

Additional screenshots should represent meaningful business states rather than individual clicks, selections, or interactions.

Examples:

Text Resizer

- T1a-Default-State.png
- T1b-Small-Validation.png
- T1c-Medium-Validation.png
- T1d-Large-Validation.png

Popup Persistence

- T2a-Popup-Appears.png
- T2b-Popup-Dismissed.png
- T2c-Navigation-Validation.png
- T2d-Refresh-Validation.png

Avoid creating excessive screenshots when fewer screenshots provide equivalent coverage.

---

## Reporting Strategy

When practical:

- Attach screenshots
- Capture traces
- Capture failure evidence
- Retain videos on failure

Screenshots must not only be saved to disk.

All screenshots should also be attached to the Playwright report.

For every screenshot:

1. Capture screenshot.
2. Save screenshot into the suite and test case evidence folder.
3. Attach screenshot to Playwright TestInfo.
4. Ensure screenshot is visible from the Playwright HTML report.

For failures capture:

- Screenshot evidence
- Trace evidence
- Error message evidence
- Browser information
- Current URL

Failure screenshots should be stored in:

test-results/
  screenshots/
    <suite-name>/
      <test-name>/
      failure/

Evidence collection should be implemented through reusable helper methods.

Avoid duplicating attachment logic across test files.

---

### Diagnostic Logging

Capture useful diagnostic information during execution when practical.

Examples:

- Console Errors
- Console Warnings
- Failed Network Requests
- API Errors
- Browser Exceptions

Attach diagnostic output to test evidence when relevant.

Prefer logging information that assists troubleshooting and failure analysis.

Avoid excessive logging that does not contribute to understanding application behaviour.

---

### Report Attachment Requirements

All captured evidence should be attached to the originating Playwright test result.

Use Playwright report attachments whenever practical.

Evidence should be visible from:

- Playwright HTML Reports
- JUnit XML Reports
- CI/CD Test Results

Screenshots should not exist only as standalone files.

Generated helper implementations should support:

- Screenshot capture
- Report attachment
- Failure evidence collection

Preferred attachment mechanism:

testInfo.attach()

---

## Failure Evidence Requirements

Failure evidence must contain more than screenshots.

For failed tests capture and retain:

- Failure Screenshot
- Error Message
- Stack Trace
- Test Identifier
- Browser Name
- Current URL
- Timestamp

A screenshot alone is insufficient for root-cause analysis.

Failure evidence should remain associated with the originating test case.

Preferred structure:

test-results/
  raw/
    T1/
      T1-Failure.png
      T1-Error.txt
      T1-Metadata.json


Diagnostic evidence should include relevant runtime state information when useful for troubleshooting.

Examples:
- Cookies
- Local Storage
- Session Storage
- Current URL
- Browser Information

For persistence-related validations, capture state information before and after validation when practical.      

---

### Runtime Evidence Collection

When practical collect:

- Console Logs
- Network Activity
- API Requests
- API Responses
- Browser Errors
- Current URL
- Browser Information

For persistence-related validations capture before-and-after state information when practical.

Retain evidence in a format suitable for:

- Playwright Reports
- HTML Reports
- AI-Assisted Failure Analysis

Evidence should support automated troubleshooting without requiring manual reproduction.

When network activity contributes to validation:

Retain:

- Request Details
- Response Details
- Status Codes
- Timing Information

Evidence should be attached to the originating test result.

Network evidence should support:

- Troubleshooting
- Failure Analysis
- Runtime Investigation
- AI-Assisted Healing

When practical, include network evidence as report attachments rather than console output only.

Request and response evidence should be attached to the originating test result whenever practical.

Network evidence should be visible from generated reports in the same way as screenshots, logs, and other execution artifacts.

Prefer report attachments over console-only output.

---

## Helper Strategy

Before generating or changing tests:

1. Inspect the project for existing reusable helpers.
2. Reuse compatible helpers instead of creating duplicates.
3. Identify functionality needed by multiple generated specs.
4. Extract reusable functionality into helpers and import it into the specs.

Use the project's existing helper location when one is established. Otherwise,
create `tests/support/helper.ts` when reusable functionality is needed.

Screenshot capture, report attachments, and failure evidence must be
implemented in reusable helpers and shared across generated suites. Do not
define duplicate implementations of these functions inside individual specs.

Centralize reusable evidence functions and the Playwright evidence fixture
in the project's existing helper module when practical. Do not create a
separate evidence file solely for those functions.

Preserve the fixture's automatic lifecycle. Specs using automatic diagnostics
and failure evidence must import the exported test fixture. Avoid circular
imports and verify existing consumers after consolidation.

When multiple specs need the same workflow support, such as dismissing a
blocking overlay, implement it once in a reusable helper. Follow the
popup rules in the plan; a dismiss helper must not introduce out-of-scope
popup or persistence tests.

Keep page-specific locators, assertions, and business behavior in the
owning spec unless they are genuinely reusable.

Helpers should support:

- Screenshot capture
- Report attachment
- Failure evidence collection
- Error evidence collection

Keep evidence helpers flexible and workflow-agnostic. Let each test decide
when evidence is needed, what to capture, and how many evidence points are
appropriate. Prefer evidence that demonstrates business outcomes rather
than enforcing a fixed before-and-after sequence.

When an existing helper conflicts with project standards, update or refactor
it carefully while preserving its existing consumers and behavior. Do not
replace a working helper solely to match a preferred name or path.

Before completing generation:

- Check generated specs for duplicate helper implementations.
- Confirm helper imports resolve and existing consumers still work.
- Report any reuse or extraction that could not be completed, with the reason.

---

## AI Healer Support

Generated evidence should support automated failure analysis.

Retain:

- Screenshot
- Error Message
- Stack Trace
- Browser Information
- URL
- Test Name

The generated framework should provide sufficient information for AI-assisted troubleshooting without requiring manual reproduction.

Do not rely solely on screenshots for failure analysis.

When evidence is available, prefer:

- Error messages
- Stack traces
- Report attachments
- Failure metadata

over visual inspection alone.

---

## Existing Coverage Handling

When coverage already exists:

- Review existing suites.
- Review existing helpers.
- Identify gaps.
- Extend coverage.
- Avoid duplicate coverage.

Review existing helper implementations for compatibility with current standards.

Refactor existing helpers when they:

- Generate excessive evidence
- Enforce inflexible workflow patterns
- Create duplicate reporting logic
- Conflict with current repository standards

Do not preserve implementations solely for backward compatibility when better reusable solutions exist.

---

## Spec File Documentation Standards

Every generated spec file must contain:

- Suite Name
- Purpose
- Coverage Scope
- Covered Features
- Covered User Journeys
- Run Command
- Headed Run Command
- Report Command

Documentation should appear at the top of the file.

---

## Test Execution Discoverability

Every generated suite must be executable independently.

Include at the beginning of every generated spec file:

- Run Entire Suite Command
- Run Spec Command
- Run Test Command
- Headed Run Command
- Report Command

Include these commands as comments at the top of every generated or updated
spec file. Use the actual spec path, Playwright configuration, project
options, and test name. Verify the commands match the repository structure.

Examples:

Run Entire Suite

npx playwright test

Run Spec

npx playwright test tests/generated/global.spec.ts

Run Test

npx playwright test tests/generated/global.spec.ts -g "MailingList Popup"

Headed Run

npx playwright test tests/generated/global.spec.ts --headed

View Report

npx playwright show-report

---

## Test Output

Group generated Playwright tests by test category:

- `tests/functional/` — website functional and user-journey tests.
- `tests/lighthouse/` — Lighthouse audit tests.
- `tests/sitefinity/` — Sitefinity backend tests, when explicitly in scope.

Create a category folder only when it has applicable tests. Do not invent
backend or Lighthouse coverage; follow the defined scope and available tooling.

Within each folder, group related tests into spec files based on their
coverage ownership. Use descriptive file names and avoid duplicating coverage.

Preserve existing tests and follow the existing project's Playwright
configuration. If the configuration does not discover a required folder,
report the conflict rather than silently placing tests elsewhere.

---

## Configuration Handling

Respect the existing repository architecture whenever practical.

Do not modify:

- playwright.config.ts
- package.json
- tsconfig.json
- eslint configuration
- prettier configuration
- CI/CD configuration
- GitHub workflow files

unless absolutely required.

Do not introduce:

- .env dependencies
- new runtime dependencies
- new build dependencies
- architectural changes

unless explicitly requested.

Exception: mandatory Lighthouse coverage authorizes the minimum configuration
changes and development dependencies needed to create and run the audit.
Reuse existing tooling and configuration when compatible. Do not change
unrelated configuration or introduce unrelated dependencies. Report any
required change that cannot be made or verified.

---

## Reusability Requirements

Prefer reusable implementations over duplicated logic.

Common reusable workflows may include:

- Navigation
- Search
- Filtering
- Sorting
- Load More
- Screenshot Capture
- Report Attachments
- Popup Handling
- Cookie Cleanup
- Destination Validation
- Related Content Validation

Screenshot capture and report attachment must be centralized in reusable helper methods.

Generated test suites should reuse existing screenshot helpers and report attachment helpers whenever available.

When required functionality does not exist, create reusable helper implementations instead of duplicating logic inside test cases.

Evidence collection should be reusable across all websites and test suites generated by the framework.

---

## Maintainability Requirements

Generated automation should remain maintainable as the website evolves.

Tests should:

- Fail independently
- Be easy to debug
- Be easy to extend
- Be easy to refactor

Prefer generalized workflows when functionality is shared.

---

## Generation Quality Gate

Before generation completes verify:

- All discovered navigation areas are represented.
- All discovered shared components are represented.
- All major workflows are represented.
- All major validation scenarios are represented.
- All destination page types are represented.
- Duplicate coverage has been minimized.
- Existing helpers have been reused where appropriate.

Generation is not complete until coverage representation has been reviewed.

---

## Code Quality

Follow Playwright TypeScript best practices.

Use stable locators.

Generate:

- Readable code
- Maintainable code
- Reusable code
- Deterministic code
- Self-documenting code

Avoid:

- Hard-coded waits
- Duplicated logic
- One-off implementations
- Unnecessarily brittle selectors

---

## Planning Output Strategy

Coverage ownership should be described conceptually rather than through implementation-specific file names.

The planning document should identify:

- Coverage Areas
- Coverage Ownership
- Navigation Areas
- Business Areas
- Shared Components
- Major Features
- User Journeys
- Validation Opportunities

Avoid generating:

- File: *.spec.ts
- Exact repository file paths
- Automation file structures
- Per-scenario spec ownership
- Repository implementation details

Avoid organizing planning output around:

- Individual test cases
- T1 / T2 / T3 structures
- Automation implementation details
- Playwright-specific constructs

Coverage ownership should be determined from discovered website structure rather than validation scenarios.

Related workflows, interactions, journeys, features, and validation scenarios should be grouped under the same coverage owner whenever practical.

Coverage ownership should remain conceptual during planning.

Do not assign:

- Spec file names
- Repository file paths
- Coverage file structures
- Individual automation ownership

Spec file organization, repository structure, and automation ownership should be determined during generation.

The planning document should describe:

- What should be covered
- Why it should be covered
- Coverage ownership
- Validation opportunities
- Discovery findings
- Coverage gaps
- Reusable workflow opportunities

The planning document should support future generation rather than prescribe automation implementation.

Planning output should remain implementation-agnostic.

Prefer organizing findings around:

- Coverage Areas
- Business Domains
- Navigation Domains
- Major Features
- Shared Functionality
- User Journeys

rather than automation artifacts, repository structures, or implementation details.

---

## Generation Summary

Provide a final summary containing:

### Discovery Summary

- Shared Components Discovered
- Navigation Areas Discovered
- Sub-Navigation Areas Discovered
- Page Types Discovered
- Modules Discovered
- User Journeys Identified

### Coverage Summary

- Shared Components Covered
- Navigation Areas Covered
- Validation Scenarios Covered
- Destination Page Types Covered
- Workflow Coverage Added

### Repository Changes

- Spec Files Created
- Spec Files Updated
- Helpers Created
- Helpers Updated
- Helpers Reused
- Reusable Workflows Extracted
- Duplicate Code Removed

### Coverage Gaps

- Functionality Not Automated
- Manual Validation Areas
- Discovery Limitations
- Future Coverage Opportunities

### Recommendations

- Future Coverage Opportunities
- Refactoring Opportunities
- Maintainability Improvements
- Reusability Improvements