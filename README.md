## Ideal User Experience

The user should be able to type into a search box on the home page. As they type, the grid of animal blogs should instantly filter to show only those animals whose names match the search term. The filtering should be fast, responsive, and case-insensitive.

## Project Structure

```
.
├── backend/
│   ├── app.py
│   └── requirements.txt
├── content/
│   ├── cat.md
│   ├── deer.md
│   ├── dog.md
│   ├── goat.md
│   ├── lion.md
│   ├── sloth.md
│   └── tiger.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .eslintrc.cjs
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── README.md
└── spec.md
```

## Changelog

- 2026-05-20: Implemented a search bar in `frontend/src/App.jsx` to filter animal blogs in real-time. Added comprehensive test coverage in `frontend/src/App.test.jsx`.
  - [x] The user should be able to type into a search box on the home page.
  - [x] As they type, the grid of animal blogs should instantly filter to show only those animals whose names match the search term.
  - [x] The filtering should be fast, responsive, and case-insensitive.
- 2026-04-28: Added a new deer blog page and updated navigation in `frontend/index.html`. Ensured consistency with style aesthetics using `frontend/styles.css`. Met UX targets.
- 2026-04-28: Tweaked UI for better user interaction and visual appeal in `frontend/styles.css`. Met UX targets.
