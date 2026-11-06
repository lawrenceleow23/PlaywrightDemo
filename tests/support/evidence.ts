import { test as base, expect } from '@playwright/test';
import { attachJson, captureScreenshot } from './helpers';

type Fixtures = {
  runtimeEvidence: void;
};

export const test = base.extend<Fixtures>({
  runtimeEvidence: [async ({ page }, use, testInfo) => {
    const diagnostics: Array<Record<string, string>> = [];
    page.on('console', (message) => {
      if (message.type() === 'error') diagnostics.push({ type: 'console-error', text: message.text() });
    });
    page.on('pageerror', (error) => diagnostics.push({ type: 'page-error', message: error.message, stack: error.stack ?? '' }));
    page.on('requestfailed', (request) => diagnostics.push({
      type: 'request-failed',
      method: request.method(),
      url: request.url(),
      error: request.failure()?.errorText ?? 'No failure detail provided',
    }));

    await use();

    if (diagnostics.length > 0) {
      await attachJson(testInfo, 'Runtime-Diagnostics.json', diagnostics);
    }

    if (testInfo.status !== testInfo.expectedStatus) {
      const browser = page.context().browser();
      const failureId = testInfo.title.replace(/[^a-zA-Z0-9-]+/g, '-');
      await attachJson(testInfo, `${failureId}-Failure-Metadata.json`, {
        testId: testInfo.testId,
        testName: testInfo.title,
        browserName: browser?.browserType().name() ?? testInfo.project.name,
        browserVersion: browser?.version() ?? null,
        currentUrl: page.isClosed() ? null : page.url(),
        timestamp: new Date().toISOString(),
        errors: testInfo.errors.map((error) => ({ message: error.message, stack: error.stack ?? '' })),
      });
      if (!page.isClosed()) {
        await captureScreenshot(page, testInfo, `${failureId}-Failure`);
      }
    }
  }, { auto: true }],
});

export { expect };
