# Blogs Frontend

This is the frontend for the Blogs application.

## End-to-End Testing

We use Playwright for E2E testing.

### Running Tests

To run the tests:

```bash
npm run test:e2e
```

To run the tests in UI mode:

```bash
npm run test:e2e:ui
```

## Setup

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
