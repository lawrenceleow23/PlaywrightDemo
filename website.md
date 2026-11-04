# Website Analysis Request

URL:
https://websparks-stg.sitefinity.cloud/
<WEBSITE_URL>

## Objective

Perform comprehensive website analysis and maintain a complete master test plan.

All findings must be consolidated into:

website-test-plan.md

The objective is to identify:

- Website functionality
- User journeys
- Content relationships
- Validation scenarios
- Destination page types
- Reusable workflow opportunities
- Coverage gaps

---

## Test Plan Management

Use and maintain:

website-test-plan.md

If website-test-plan.md already exists:

- Review existing coverage.
- Update existing coverage.
- Merge newly discovered findings.
- Remove obsolete findings when appropriate.
- Maintain a single consolidated planning document.

Do not create additional planning documents.

website-test-plan.md is the authoritative planning artifact.

---

## Analysis Scope

Analyze the entire website.

Coverage should include all discovered:

- Landing Pages
- Destination Pages
- User Journeys
- Content Relationships
- Search Experiences
- Special Modules
- Validation Scenarios

Analysis should continue until no significant website functionality remains unexplored.

---

## Homepage Requirements

Fully analyze the homepage before continuing.

The Homepage should serve as the primary validation location for shared website functionality whenever practical.

The homepage may contain:

- Featured Content
- Highlighted Content
- General Content

When present:

- Analyze each section independently.
- Analyze user journeys.
- Open representative content items.
- Analyze destination page behavior.
- Analyze related content behavior.

Do not assume every section exists.

Use actual website behavior.

## Shared Component Validation Strategy

The Homepage is the default and preferred validation location for shared component coverage.

Homepage-Preferred Components

- Header
- Footer
- Main Navigation
- Accessibility Controls
- Search Entry Points
- Social Media Links
- Shared Widgets

Cross-Site Components

- Newsletter Popup
- Cookie Banner
- Scroll-To-Top

Homepage-preferred components should be validated from the Homepage whenever practical.

Cross-site components may appear on multiple pages and may depend on page behaviour, scrolling conditions, cookies, local storage, session storage, or other state-management mechanisms.

Prefer the Homepage when equivalent coverage exists.

When another page provides more reliable validation opportunities, use that page and document the rationale in website-test-plan.md.

Only use another page when:

- The component does not exist on the Homepage.
- The workflow requires another page.
- The behaviour differs from the Homepage.
- The validation objective cannot be completed on the Homepage.

Document any page-specific variations in website-test-plan.md.

---

## Cross-Site Component Validation

Some shared components may appear across multiple pages.

Examples:

- Newsletter Popup
- Cookie Banner
- Scroll-To-Top

For these components:

- Discover where the component appears.
- Identify the most reliable page for validation.
- Identify any triggering conditions.
- Determine whether browser state affects visibility.
- Document validation prerequisites.

When a component depends on browser state:

- Document how to reset the state.
- Document how to reproduce the component from a clean browser state.
- Document any cleanup actions required for automation.
- Document whether state is stored in cookies, local storage, session storage, or another persistence mechanism.

Newsletter Popup validation must account for cookie state.

Tests should verify:

- Popup behaviour when the cookie does not exist.
- Popup behaviour when the cookie exists.
- Popup behaviour after cookie removal.

Document the preferred validation location and rationale in website-test-plan.md.

---

## Scroll-To-Top Requirements

When scroll-to-top functionality exists analyze:

- Appearance conditions
- Visibility thresholds
- Activation behaviour
- Return-to-top behaviour

Expected Behaviour

- The control appears after sufficient scrolling.
- The user can activate the control.
- The page returns to the top.

Evidence Requirements

Capture:

- Header visible before scrolling
- Footer or bottom-page content visible after scrolling
- Header visible again after activating Scroll-To-Top

Validation should demonstrate the complete user journey rather than relying solely on scroll position values.

Document observed behaviour in website-test-plan.md.

---

## Mobile Navigation Requirements

When mobile navigation exists analyze:

- Mobile navigation entry points
- Menu expansion behaviour
- Menu collapse behaviour
- Navigation workflows
- Destination accessibility

Expected Behaviour

- Mobile navigation is accessible from mobile devices.
- Users can expand the mobile menu.
- Users can navigate using the mobile menu.
- Users can return to the main page content.

Validation should be performed using a mobile browser or device profile whenever practical.

Prefer:

- Mobile device emulation
- Mobile browser execution

Avoid validating mobile navigation solely through desktop browser viewport resizing when equivalent mobile execution is available.

Document observed behaviour in website-test-plan.md.

---

## Shared Content Pattern

Many content-based areas may share a common structure.

Examples may include:

- Featured Content
- Highlighted Content
- General Content

When common content patterns are discovered:

- Document the pattern.
- Reuse coverage recommendations.
- Maintain independent navigation-area ownership.

Use actual website behavior.

---

## Content Expansion Behavior

Content sections may provide additional content through:

- Load More
- Pagination
- Infinite Scroll

When present document:

- Initial content count
- Updated content count
- Content increase
- Multiple activations when practical
- End-of-results behavior when practical

Record findings in website-test-plan.md.

---

## Content Detail Pages

Listings may navigate to different destination page types.

Examples may include:

- Articles
- Stories
- Videos
- Publications
- Resources
- Detail Pages

When destination pages are discovered:

Analyze:

- Main content
- Related content
- Available interactions
- Continuing user journeys
- Destination-specific behavior

Document discovered page types.

---

## Search Requirements

When search functionality exists analyze:

- Search execution
- Search results
- Existing value searches
- Partial value searches
- Empty searches
- Invalid searches
- No-result searches
- Result navigation

Document observed behaviors and validation scenarios.

---

## Popup Persistence Requirements

Discovery should not continue while a blocking popup remains visible.

When a popup appears:

1. Record the popup behaviour.
2. Capture required evidence.
3. Dismiss the popup.
4. Verify the popup is closed.
5. Continue discovery.

Do not continue:

- Scrolling
- Navigation
- Link exploration
- Search discovery
- Content discovery

while the popup remains visible.

Popup dismissal takes precedence over continued discovery.

### Newsletter Popup

The newsletter popup is expected to use browser persistence mechanisms to suppress repeated appearances after dismissal.

When practical determine whether suppression is controlled by:

- Cookies
- Local Storage
- Session Storage
- Other browser persistence mechanisms

Expected Behaviour

- The popup may appear when the triggering conditions are met.
- Once dismissed, persistence data is created to suppress future appearances.
- The popup should remain hidden while the persistence data exists.
- The popup may reappear after the relevant persistence data is removed.

Validation Scenarios

- First appearance
- Dismiss popup
- Refresh page
- Navigate to another page
- Verify popup remains hidden while persistence data exists
- Remove persistence data
- Verify popup can appear again

Evidence Requirements

Capture:

- Popup visible before dismissal
- Popup dismissed after close action

When practical:

- Capture popup-related cookies before dismissal
- Capture popup-related cookies after dismissal

Discovery should document:

- Persistence mechanism
- Storage location
- Expiration behaviour
- Reappearance conditions

Document observed persistence behaviour in website-test-plan.md.

---

## Related Content Requirements

When related content exists analyze:

- Visibility
- Navigation
- Relationships
- User journeys

Document discovered behavior.

---

## Special Module Requirements

When unique modules exist, analyze them independently.

Examples may include:

- Directory
- Knowledge Base
- Resource Library
- Finder Tool
- Calculator
- Portal
- Custom Application

For each module:

- Analyze functionality.
- Analyze user journeys.
- Analyze destination pages.
- Identify reusable workflows.
- Generate dedicated coverage recommendations.

---

## Text Resizer Requirements

When text resizing functionality exists analyze:

- Available size options
- Active state behaviour
- User-visible size changes
- State persistence when applicable

Expected Behaviour

- Small decreases text size.
- Medium restores the default text size.
- Large increases text size.

Validation should follow this sequence:

1. Record the default size.
2. Select Small and verify the text is smaller than the default size.
3. Select Medium and verify the text returns to the default size.
4. Select Large and verify the text is larger than the default size.

Validation should focus on:

- Available controls
- Active control state
- Relative size changes
- User-visible behaviour

Prefer validating:

- Small < Default
- Medium = Default
- Large > Default

rather than exact numeric values.

Generate validations based on observed business behaviour rather than implementation details whenever practical.

---

## Coverage Verification

For every discovered business area document:

- Coverage Scope
- User Journeys
- Major Functionality
- Validation Scenarios
- Destination Page Types
- Related Content Behavior
- Reusable Workflow Opportunities
- Coverage Status

Coverage Status:

- Fully Analyzed
- Partially Analyzed
- Not Analyzed

---

## Discovery Limitations

If an interaction cannot be completed:

Document:

- The limitation
- The affected functionality
- The resulting coverage gap
- Any attempted recovery actions

Continue analysis whenever practical.

---

## Completion Criteria

Analysis is complete only when:

- Homepage coverage is complete.
- Search coverage is complete.
- Destination page types have been identified.
- Related-content journeys have been analyzed.
- Special modules have been analyzed.
- Validation scenarios have been identified.
- Reusable workflow opportunities have been identified.
- Coverage gaps have been documented.
- No significant functionality remains unexplored.
