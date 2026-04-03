import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/Labs/lab-29/playwright',
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run dev -- --port 5173',
    port: 5173,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
