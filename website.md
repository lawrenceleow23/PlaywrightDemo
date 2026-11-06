# Website Analysis Request

URL:
https://websparks-stg.sitefinity.cloud/

---

## Objective

This document defines the in-scope website analysis requirements. Maintain
findings in `website-test-plan.md`.

Identify:

- Website functionality
- User journeys
- Content relationships
- Validation scenarios
- Destination page types
- Reusable workflow opportunities
- Coverage gaps

---

## Test Plan Management

`website-test-plan.md` is the single authoritative planning artifact.

If it exists:

- Review and update existing coverage.
- Merge newly discovered findings.
- Remove obsolete findings when appropriate.
- Do not create additional planning documents.

If live behavior differs from the source document, record both as a spec
discrepancy. Do not silently choose one.

---

## Analysis Scope

Analyze only the Homepage General Content area (Image & standfirst, with
General Image) and its directly attached Load More behavior. For the article
destination, only confirm that a representative content item opens an article
page and identify the page type. Do not analyze that page in depth.

Validation is desktop only. Exclude all other source requirements and
unrelated live-site functionality.

---

## Homepage Requirements

The Homepage is the primary page for this run. Analyze only the in-scope
General Content area and its directly attached Load More control. Use actual
website behavior. Do not analyze other Homepage sections or unrelated shared
functionality.

Expected Behaviour (per spec)

- The Homepage initially displays 3 individual Image & standfirst articles
  (expected per spec).
- Each article includes a General Image, Pillar Category, and Title.
- The whole image is clickable and redirects to the individual article page.
- Placeholder configurable: Yes.

Validation Scenarios

- Verify the initial content count and the specified article fields.
- Click a representative item's image; confirm that an article page opens
  and identify its page type. Do not analyze its content in depth.

### Blocker Rule

If a blocking popup or overlay appears:

- Stop the current interaction.
- Dismiss it using its close or dismiss control.
- Verify it is closed.
- Resume the interrupted in-scope step.
- Do not analyze, test, or document the popup, persistence, cookies, or
  storage.
- Do not create popup coverage scenarios.

If it cannot be dismissed, record the blockage under Discovery Limitations
and continue elsewhere within scope when practical.

---

## Shared Component Validation Strategy

No shared components are specified as necessary for this scope.

---

## Cross-Site Component Validation

No cross-site components are specified for this scope. Do not expand
cross-site analysis beyond the in-scope content area and Load More behavior.

---

## Content Expansion Behavior

Analyze the Load More behavior for the in-scope Image & standfirst content.

Expected Behaviour (per spec)

- Activating Load More adds 6 more Image & standfirst articles in the same
  format as the initial 3.
- The final total is 9 Image & standfirst articles (expected per spec).
- Load More disappears after all articles are shown.
- Placeholder configurable: No.

Validation Scenarios

1. Record the initial article count (expected per spec: 3).
2. Activate Load More and verify that 6 additional articles appear in the
   specified format.
3. Verify the total is 9 articles (expected per spec) and Load More is no
   longer visible.
4. Record the actual live counts and any discrepancy from the specification.

Repeated activations beyond reaching the specified total are not defined in
the source; mark any additional behavior "to be discovered" without adding an
expected outcome.

---

## Content Detail Pages

Article destinations are in scope only to confirm that selecting a
representative item from the in-scope General Content area opens an article
page and to identify its page type. Do not analyze article-page content,
related content, or other article interactions in depth.

---

## Related Content Requirements

Related-content analysis is out of scope for this run.

---

## Special Module Requirements

Special modules are out of scope for this run.

---

## Coverage Verification

For the in-scope General Content and Load More behavior, document:

- Coverage Scope
- User Journeys
- Major Functionality
- Validation Scenarios
- Destination Page Type for the limited article click-through
- Coverage Status: Fully Analyzed, Partially Analyzed, or Not Analyzed

Do not report out-of-scope items as coverage gaps.

---

## Discovery Limitations

If an in-scope interaction cannot be completed, document the limitation,
affected functionality, resulting coverage gap, and any recovery attempts.
Continue within scope whenever practical.

---

## Completion Criteria

Analysis is complete when:

- The in-scope General Content and Load More behavior has been analyzed.
- A representative in-scope content item has been checked for article
  navigation and its destination page type identified.
- In-scope validation scenarios and coverage status are documented.
- Any in-scope coverage gaps or limitations are documented.
- No blocking popup remains open during an interaction.