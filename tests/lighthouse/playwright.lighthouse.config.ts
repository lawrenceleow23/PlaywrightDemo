import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: resolve(process.cwd(), 'tests/lighthouse'),
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 180_000,
  reporter: [['html', { outputFolder: resolve(process.cwd(), 'playwright-report/lighthouse'), open: 'never' }]],
  outputDir: resolve(process.cwd(), 'test-results/lighthouse'),
  use: {
    baseURL: 'https://websparks-stg.sitefinity.cloud/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium-lighthouse',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { args: ['--remote-debugging-port=9222'] },
      },
    },
  ],
});
