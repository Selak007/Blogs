import { defineConfig } from '@playwright/test';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '.');

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:5173' },
  webServer: {
    command: 'npm run dev -- --host=127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: true,
    cwd: rootDir,
  },
});
