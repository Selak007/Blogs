## Ideal User Experience

- [x] Users can visit the `/blogs` page and see a grid of all available animals.
- [x] A search bar is present at the top of the `/blogs` page.
- [x] As the user types into the search bar, the list of animals dynamically filters in real-time.
- [x] The search is case-insensitive.
- [x] Clicking on a filtered animal card navigates the user to that animal's detailed page.

## Project Structure

```
backend/
  app.py
  requirements.txt
content/
  blogs/
  cat.md
  dog.md
  lion.md
  tiger.md
frontend/
  README.md
  eslint.config.js
  index.html
  package-lock.json
  package.json
  public/
  src/
  vite.config.js
README.md
spec.md
```

## Changelog

- 2026-05-20: Implemented a client-side search bar on the Blogs page to filter animals by name.
  - **Files**: `frontend/src/App.jsx`
  - **Why**: To allow users to easily find specific animals without manually scrolling.
  - **UX Targets Met**:
    - [x] Users can visit the `/blogs` page and see a grid of all available animals.
    - [x] A search bar is present at the top of the `/blogs` page.
    - [x] As the user types into the search bar, the list of animals dynamically filters in real-time.
    - [x] The search is case-insensitive.
    - [x] Clicking on a filtered animal card navigates the user to that animal's detailed page.
- 2026-04-28: Added a new deer blog page and updated navigation in `frontend/index.html`. Ensured consistency with style aesthetics using `frontend/styles.css`. Met UX targets.
- 2026-04-28: Tweaked UI for better user interaction and visual appeal in `frontend/styles.css`. Met UX targets.
