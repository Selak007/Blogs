## Ideal User Experience

- Building on the README goals, users should not only access detailed animal content but also control their viewing comfort with a reliable light/dark display option.
- The Navbar clearly shows a sun/moon toggle on its right edge; activating it instantly switches the entire site between light and dark themes without layout shifts.
- The chosen mode persists across navigation and refreshes, so returning visitors see their preferred theme automatically.
- In dark mode, the background adopts `#1a1a1a` while text shifts to `#f0f0f0`, keeping contrast high for readability, including on the animal cards and blog listings.

## Project Structure

```
.
├── .gitignore
├── README.md
├── spec.md
├── backend/
│   ├── app.py
│   └── requirements.txt
├── content/
│   ├── blogs/
│   ├── cat.md
│   ├── dog.md
│   ├── lion.md
│   └── tiger.md
└── frontend/
    ├── README.md
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public/
    ├── src/
    ├── test-results/
    └── vite.config.js
```

## Changelog

- 2026-05-20: Implemented the persistent Navbar dark-mode toggle in `frontend/src/App.jsx` and aligned theme tokens plus global styles in `frontend/src/index.css`. Why: ensure visitors can immediately switch between light and dark presentations without layout shifts. UX Targets Met:
  - [x] Building on the README goals, users should not only access detailed animal content but also control their viewing comfort with a reliable light/dark display option.
  - [x] The Navbar clearly shows a sun/moon toggle on its right edge; activating it instantly switches the entire site between light and dark themes without layout shifts.
  - [x] The chosen mode persists across navigation and refreshes, so returning visitors see their preferred theme automatically.
  - [x] In dark mode, the background adopts `#1a1a1a` while text shifts to `#f0f0f0`, keeping contrast high for readability, including on the animal cards and blog listings.
- 2026-04-28: Added a new deer blog page and updated navigation in `frontend/index.html`. Ensured consistency with style aesthetics using `frontend/styles.css`. Met UX targets.
- 2026-04-28: Tweaked UI for better user interaction and visual appeal in `frontend/styles.css`. Met UX targets.
