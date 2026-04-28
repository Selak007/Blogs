# BlogWrites

An engaging and educational platform for blogs about animals.

## Ideal User Experience

To maintain the consistency of the current website, the new content about sloths will be integrated as a dedicated HTML page within the existing site structure, ensuring consistent style and navigation.

### 1. Creation of Sloth Blog Page
- **File:** `frontend/sloth.html`
- **Content Sections:**
  - Introduction to Sloths 
  - Habitat of Sloths
  - Behavior of Sloths
  - Conservation efforts for Sloths
- **Styling:** Utilize the existing styles defined in `frontend/styles.css` to ensure the new page is visually harmonious with the current site design.

### 2. Update Navigation on Index Page
- **File:** `frontend/index.html`
- **Modification:** Add a new link for the sloth page. Ensure it is consistent with the existing animal links and styled appropriately.

### 3. Verify Styles and Links
- **File:** `frontend/styles.css`
- **Task:** Confirm that all styles and links, particularly those newly added, are functional and adhere to site-wide consistency.

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
frontend/
    cat.html
    dog.html
    goat.html
    index.html
    lion.html
    sloth.html
    styles.css
    tiger.html
```

## Changelog

- 2026-04-28: Added Sloth blog and updated navigation and styles to include the new sloth page using frontend/sloth.html, frontend/index.html, and frontend/styles.css. Met UX targets.
- 2026-04-28: Added Goat blog, updated navigation and styling using frontend/goat.html, frontend/index.html, and frontend/styles.css. Met UX targets.

## Status
Development ongoing, with foundational structures in place and initial content created for Cat, Dog, and Lion blogs.

---

This document serves as a dynamic README for the BlogWrites project and will be updated as the project evolves.
