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

Never generate coverage from assumptions.

Always generate coverage from discovered behavior.

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

---

## Coverage Ownership Strategy

Every discovered feature must have one primary owner.

### Shared Components

Generate:

global.spec.ts

Examples:

- Header
- Footer
- Search
- Social Media
- Accessibility Controls
- Popup
- Cookie Behavior
- Scroll-To-Top
- Subscribe Functionality

### Navigation Components

Generate:

<navigation>.spec.ts

Examples:

- Landing Pages
- Content Listings
- Content Relationships
- Destination Pages
- Navigation Workflows

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

Shared functionality belongs to:

global.spec.ts

Examples:

- Header
- Footer
- Search Access
- Accessibility Controls
- Subscribe
- Social Media
- Popup Behavior
- Cookie Persistence
- Scroll-To-Top

Only generate page-specific coverage when behavior differs.

---

## Shared Component Generation Rules

Shared component implementation must follow the validation location selected during discovery and documented in website-test-plan.md.

Do not arbitrarily select alternate pages during generation.

When generating global.spec.ts:

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

### Popup Handling

When popups appear:

- Identify the popup.
- Record discovered behavior.
- Capture any required evidence.
- Close or dismiss the popup.
- Verify the popup no longer blocks interaction.
- Continue discovery.

Discovery should pause while a blocking popup remains visible.

Do not continue:

- Scrolling
- Navigation
- Exploration
- Workflow discovery
- Component discovery
- Validation discovery

while a blocking popup, modal, overlay, newsletter prompt, or cookie prompt remains visible.

---

## Popup Persistence Discovery

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

Generate one spec file per:

- Shared Component Area
- Navigation Area
- Business Area
- Major Feature Area

Examples:

- global.spec.ts
- homepage.spec.ts
- news.spec.ts
- search.spec.ts
- directory.spec.ts
- special-module.spec.ts

Do not combine unrelated navigation areas.

Do not duplicate coverage owned elsewhere.

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

For discovered requests capture:

- Request URL
- Request Method
- Response Status
- Response Timing

Document discovered APIs and their associated user journeys.

---

### API Evidence Collection

Capture API activity when it contributes to understanding application behaviour.

Examples:

Automatic Page Activity

- Homepage Load
- Search Page Load
- Detail Page Load

User Actions

- Search Submission
- Filtering
- Sorting
- Load More
- Pagination
- Form Submission
- Content Navigation
- Button Click Actions

Capture:

- Request
- Response
- Status Code
- Response Time

Include relevant API evidence in generated reports when practical.

---

## SEO And Performance Validation

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

Generate reusable SEO and performance validations whenever sufficient information is available.

Capture significant SEO findings in generated reports when practical.

Attach Lighthouse reports to test evidence when supported by the framework.

---

### Lighthouse Configuration Strategy

When executing Lighthouse audits:

Run audits against representative device profiles.

Preferred Profiles:

Desktop:
- Chromium Desktop

Mobile:
- Mobile Device Emulation

When practical validate:

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

---

### Lighthouse Threshold Strategy

Default thresholds:

- SEO >= 90
- Accessibility >= 90
- Best Practices >= 90
- Performance >= 80

When thresholds are violated:

- Capture Lighthouse evidence
- Record failing metrics
- Include findings within generated reports

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

Capture:

1. Before Action
2. After Action
3. After Validation

Do not save screenshots directly into the root test-results folder.

Screenshots should be grouped by suite and test case.

Preferred structure:

test-results/
  screenshots/
    <suite-name>/
      <test-name>/
        before.png
        after.png
        validation.png

Examples:

test-results/
  screenshots/
    global/
      scroll-to-top/
        before.png
        after.png
        validation.png

test-results/
  screenshots/
    global/
      newsletter-popup-dismiss/
        before.png
        after.png
        validation.png

Use reusable helper methods for screenshot generation.

Avoid hardcoded screenshot paths inside individual test cases.

Screenshot functionality should be reusable across all generated test suites.

All screenshot paths should be generated automatically by shared helper utilities.

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

Avoid generating screenshots before and after every action when equivalent validation evidence can be provided with fewer captures.

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

---

## Helper Strategy

Store reusable functionality in:

support/helper.ts

Fallback:

tests/support/helper.ts

Before creating new code:

1. Review existing helpers.
2. Reuse helper methods.
3. Avoid duplicate implementations.
4. Extract repeated workflows.

Store reusable evidence collection functionality in helper utilities.

Examples:

- captureScreenshot()
- captureValidationScreenshot()
- captureFailureScreenshot()
- attachScreenshotToReport()
- captureEvidence()

Screenshot capture and report attachment should be implemented once and reused across all generated suites.

Do not generate duplicate screenshot handling logic inside individual spec files.

Evidence collection should be centralized and shared across all generated test suites.

Generated helper implementations should support:

- Screenshot capture
- Report attachment
- Failure evidence collection
- Error evidence collection

Avoid creating duplicate screenshot and reporting implementations across test suites.

Evidence collection should be centralized whenever practical.

Helpers should remain workflow-agnostic.

Do not enforce a fixed evidence lifecycle for all workflows.

Examples of fixed patterns that should not be universally applied:

- Before Action
- After Action
- Validation

Different workflows may require different evidence strategies.

Capture evidence at meaningful validation points rather than enforcing a predefined sequence.

Prefer flexible helper methods that allow generated tests to decide:

- When evidence is required
- What evidence is required
- How many evidence points are required

Avoid generating helper implementations that assume all workflows follow the same structure.

Prefer evidence that demonstrates business outcomes rather than individual interactions whenever practical.

When existing helper implementations conflict with repository standards, generation should refactor or replace them.

Do not continue reusing helper implementations that enforce workflow patterns inconsistent with discovered business behaviour.

Helper reuse is preferred, but correctness, maintainability, and alignment with current standards take precedence over reuse.

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
- Debug Command
- UI Mode Command
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

Commands should reflect the actual generated repository structure whenever practical.

Examples:

Run Entire Suite

npx playwright test

Run Spec

npx playwright test tests/generated/global.spec.ts

Run Test

npx playwright test tests/generated/global.spec.ts -g "Newsletter Popup"

Headed Run

npx playwright test tests/generated/global.spec.ts --headed

View Report

npx playwright show-report

---

## Test Output

Store generated tests in:

tests/generated

Generate logical suite structures based on discovered website architecture.

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