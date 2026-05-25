module.exports = {
    use: {
        // Browser options
        headless: true,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure'
    },
    // Test directory
    testDir: 'tests',
    // Timeout for each test in milliseconds
    timeout: 30000,
};