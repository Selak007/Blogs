## Ideal User Experience

Building on the README goals, visitors should seamlessly explore BlogWrites animal content while instantly switching between light and dark visuals. The navbar will always expose a clearly labeled toggle button with sun/moon iconography; activating it immediately updates the entire site theme, persists the preference, and maintains readability (dark mode uses #1a1a1a background with #f0f0f0 text). The transition should feel polished and accessible without disrupting navigation.

## Project Structure

```
.
├── .git/
├── .gitignore
├── README.md
├── backend/
│   ├── app.py
│   └── requirements.txt
├── content/
│   ├── blogs/
│   ├── cat.md
│   ├── dog.md
│   ├── lion.md
│   └── tiger.md
├── frontend/
│   ├── .gitignore
│   ├── README.md
│   ├── dist/
│   ├── e2e/
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── playwright.config.ts
│   ├── public/
│   ├── src/
│   ├── test-results/
│   └── vite.config.js
└── spec.md
```

## Changelog

- 2026-05-20: What changed: Added persistent dark mode toggle across `frontend/src/App.jsx`, `frontend/src/hooks/useDarkMode.js`, `frontend/src/index.css`, and `frontend/index.html`. Why: Ensures the navbar control updates the `<html>` theme class immediately and keeps the user’s preference after refresh. UX Targets Met: [x] Instant light/dark switching without disrupting exploration, [x] Stored preference preserving #1a1a1a/#f0f0f0 readability, [x] Accessible sun/moon toggle labeled for clarity.
- 2026-04-28: Added a new deer blog page and updated navigation in `frontend/index.html`. Ensured consistency with style aesthetics using `frontend/styles.css`. Met UX targets.
- 2026-04-28: Tweaked UI for better user interaction and visual appeal in `frontend/styles.css`. Met UX targets.
