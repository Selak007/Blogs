import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry'
  },
  /* Configure projects for major browsers */
  projects: [{
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome']
    }
  }, {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox']
    }
  }, {
    name: 'webkit',
    use: {
      ...devices['Desktop Safari']
    }
  }],
  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkZWZpbmVDb25maWciLCJkZXZpY2VzIiwidGVzdERpciIsImZ1bGx5UGFyYWxsZWwiLCJmb3JiaWRPbmx5IiwicHJvY2VzcyIsImVudiIsIkNJIiwicmV0cmllcyIsIndvcmtlcnMiLCJ1bmRlZmluZWQiLCJyZXBvcnRlciIsInVzZSIsImJhc2VVUkwiLCJ0cmFjZSIsInByb2plY3RzIiwibmFtZSIsIndlYlNlcnZlciIsImNvbW1hbmQiLCJ1cmwiLCJyZXVzZUV4aXN0aW5nU2VydmVyIl0sInNvdXJjZXMiOlsicGxheXdyaWdodC5jb25maWcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBkZXZpY2VzIH0gZnJvbSAnQHBsYXl3cmlnaHQvdGVzdCc7XG5cbi8qKlxuICogQHNlZSBodHRwczovL3BsYXl3cmlnaHQuZGV2L2RvY3MvdGVzdC1jb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRlc3REaXI6ICcuL3Rlc3RzJyxcbiAgLyogUnVuIHRlc3RzIGluIGZpbGVzIGluIHBhcmFsbGVsICovXG4gIGZ1bGx5UGFyYWxsZWw6IHRydWUsXG4gIC8qIEZhaWwgdGhlIGJ1aWxkIG9uIENJIGlmIHlvdSBhY2NpZGVudGFsbHkgbGVmdCB0ZXN0Lm9ubHkgaW4gdGhlIHNvdXJjZSBjb2RlLiAqL1xuICBmb3JiaWRPbmx5OiAhIXByb2Nlc3MuZW52LkNJLFxuICAvKiBSZXRyeSBvbiBDSSBvbmx5ICovXG4gIHJldHJpZXM6IHByb2Nlc3MuZW52LkNJID8gMiA6IDAsXG4gIC8qIE9wdCBvdXQgb2YgcGFyYWxsZWwgdGVzdHMgb24gQ0kuICovXG4gIHdvcmtlcnM6IHByb2Nlc3MuZW52LkNJID8gMSA6IHVuZGVmaW5lZCxcbiAgLyogUmVwb3J0ZXIgdG8gdXNlLiBTZWUgaHR0cHM6Ly9wbGF5d3JpZ2h0LmRldi9kb2NzL3Rlc3QtcmVwb3J0ZXJzICovXG4gIHJlcG9ydGVyOiAnaHRtbCcsXG4gIC8qIFNoYXJlZCBzZXR0aW5ncyBmb3IgYWxsIHRoZSBwcm9qZWN0cyBiZWxvdy4gU2VlIGh0dHBzOi8vcGxheXdyaWdodC5kZXYvZG9jcy9hcGkvY2xhc3MtdGVzdG9wdGlvbnMuICovXG4gIHVzZToge1xuICAgIC8qIEJhc2UgVVJMIHRvIHVzZSBpbiBhY3Rpb25zIGxpa2UgYGF3YWl0IHBhZ2UuZ290bygnLycpYC4gKi9cbiAgICBiYXNlVVJMOiAnaHR0cDovL2xvY2FsaG9zdDo1MTczJyxcblxuICAgIC8qIENvbGxlY3QgdHJhY2Ugd2hlbiByZXRyeWluZyB0aGUgZmFpbGVkIHRlc3QuIFNlZSBodHRwczovL3BsYXl3cmlnaHQuZGV2L2RvY3MvdHJhY2Utdmlld2VyICovXG4gICAgdHJhY2U6ICdvbi1maXJzdC1yZXRyeScsXG4gIH0sXG5cbiAgLyogQ29uZmlndXJlIHByb2plY3RzIGZvciBtYWpvciBicm93c2VycyAqL1xuICBwcm9qZWN0czogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdjaHJvbWl1bScsXG4gICAgICB1c2U6IHsgLi4uZGV2aWNlc1snRGVza3RvcCBDaHJvbWUnXSB9LFxuICAgIH0sXG5cbiAgICB7XG4gICAgICBuYW1lOiAnZmlyZWZveCcsXG4gICAgICB1c2U6IHsgLi4uZGV2aWNlc1snRGVza3RvcCBGaXJlZm94J10gfSxcbiAgICB9LFxuXG4gICAge1xuICAgICAgbmFtZTogJ3dlYmtpdCcsXG4gICAgICB1c2U6IHsgLi4uZGV2aWNlc1snRGVza3RvcCBTYWZhcmknXSB9LFxuICAgIH0sXG4gIF0sXG5cbiAgLyogUnVuIHlvdXIgbG9jYWwgZGV2IHNlcnZlciBiZWZvcmUgc3RhcnRpbmcgdGhlIHRlc3RzICovXG4gIHdlYlNlcnZlcjoge1xuICAgIGNvbW1hbmQ6ICducG0gcnVuIGRldicsXG4gICAgdXJsOiAnaHR0cDovL2xvY2FsaG9zdDo1MTczJyxcbiAgICByZXVzZUV4aXN0aW5nU2VydmVyOiAhcHJvY2Vzcy5lbnYuQ0ksXG4gIH0sXG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsWUFBWSxFQUFFQyxPQUFPLFFBQVEsa0JBQWtCOztBQUV4RDtBQUNBO0FBQ0E7QUFDQSxlQUFlRCxZQUFZLENBQUM7RUFDMUJFLE9BQU8sRUFBRSxTQUFTO0VBQ2xCO0VBQ0FDLGFBQWEsRUFBRSxJQUFJO0VBQ25CO0VBQ0FDLFVBQVUsRUFBRSxDQUFDLENBQUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxFQUFFO0VBQzVCO0VBQ0FDLE9BQU8sRUFBRUgsT0FBTyxDQUFDQyxHQUFHLENBQUNDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQztFQUMvQjtFQUNBRSxPQUFPLEVBQUVKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxFQUFFLEdBQUcsQ0FBQyxHQUFHRyxTQUFTO0VBQ3ZDO0VBQ0FDLFFBQVEsRUFBRSxNQUFNO0VBQ2hCO0VBQ0FDLEdBQUcsRUFBRTtJQUNIO0lBQ0FDLE9BQU8sRUFBRSx1QkFBdUI7SUFFaEM7SUFDQUMsS0FBSyxFQUFFO0VBQ1QsQ0FBQztFQUVEO0VBQ0FDLFFBQVEsRUFBRSxDQUNSO0lBQ0VDLElBQUksRUFBRSxVQUFVO0lBQ2hCSixHQUFHLEVBQUU7TUFBRSxHQUFHWCxPQUFPLENBQUMsZ0JBQWdCO0lBQUU7RUFDdEMsQ0FBQyxFQUVEO0lBQ0VlLElBQUksRUFBRSxTQUFTO0lBQ2ZKLEdBQUcsRUFBRTtNQUFFLEdBQUdYLE9BQU8sQ0FBQyxpQkFBaUI7SUFBRTtFQUN2QyxDQUFDLEVBRUQ7SUFDRWUsSUFBSSxFQUFFLFFBQVE7SUFDZEosR0FBRyxFQUFFO01BQUUsR0FBR1gsT0FBTyxDQUFDLGdCQUFnQjtJQUFFO0VBQ3RDLENBQUMsQ0FDRjtFQUVEO0VBQ0FnQixTQUFTLEVBQUU7SUFDVEMsT0FBTyxFQUFFLGFBQWE7SUFDdEJDLEdBQUcsRUFBRSx1QkFBdUI7SUFDNUJDLG1CQUFtQixFQUFFLENBQUNmLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQztFQUNwQztBQUNGLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==