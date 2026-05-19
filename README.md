## Ideal User Experience

The user should be able to:
1.  See a search bar on the homepage (`/`).
2.  Type into the search bar to filter the list of displayed animals in real-time.
3.  See only the animals whose names match the search query.
4.  Click on a filtered animal card to navigate to its detailed page.

## Project Structure

```
.
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
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   ├── src/
│   └── vite.config.js
└── spec.md
```

## Changelog

- 2026-05-20: Added a search bar to filter animals on the homepage (`frontend/src/App.jsx`).
  - [x] See a search bar on the homepage (`/`).
  - [x] Type into the search bar to filter the list of displayed animals in real-time.
  - [x] See only the animals whose names match the search query.
  - [x] Click on a filtered animal card to navigate to its detailed page.
- 2026-04-28: Added a new deer blog page and updated navigation in `frontend/index.html`. Ensured consistency with style aesthetics using `frontend/styles.css`. Met UX targets.
- 2026-04-28: Tweaked UI for better user interaction and visual appeal in `frontend/styles.css`. Met UX targets.
