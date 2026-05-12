/**
 * table-of-contents.js
 * Automatically generates a sticky Table of Contents sidebar
 * by scanning h2/h3 headings in the main article/section area.
 *
 * Issue: Blogs #44 – Implement automatic table of contents
 */

(function () {
  'use strict';

  /**
   * Assign an id to a heading element if it doesn't already have one.
   * @param {HTMLElement} el
   * @returns {string} the element's id
   */
  function ensureId(el) {
    if (!el.id) {
      el.id = el.textContent
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    return el.id;
  }

  /**
   * Build and inject the TOC into the page.
   */
  function buildTOC() {
    const article = document.querySelector('article, main, .blog-content, section');
    if (!article) return;

    const headings = Array.from(article.querySelectorAll('h2, h3'));
    if (headings.length === 0) return;

    // Create TOC container
    const toc = document.createElement('nav');
    toc.id = 'toc';
    toc.setAttribute('aria-label', 'Table of Contents');
    toc.innerHTML = '<p class="toc-title">📋 Table of Contents</p>';

    const ul = document.createElement('ul');
    ul.className = 'toc-list';

    headings.forEach((heading) => {
      const id = ensureId(heading);
      const li = document.createElement('li');
      li.className = heading.tagName === 'H3' ? 'toc-item toc-sub' : 'toc-item';

      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = heading.textContent.trim();
      a.className = 'toc-link';

      // Smooth scroll
      a.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Mark active
        document.querySelectorAll('.toc-link').forEach((l) => l.classList.remove('toc-active'));
        a.classList.add('toc-active');
      });

      li.appendChild(a);
      ul.appendChild(li);
    });

    toc.appendChild(ul);

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      #toc {
        position: fixed;
        top: 100px;
        right: 16px;
        width: 220px;
        background: #fffde7;
        border: 2px solid #FFD700;
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 999;
        max-height: 70vh;
        overflow-y: auto;
        font-family: Arial, sans-serif;
        font-size: 0.85rem;
      }
      .toc-title {
        font-weight: bold;
        margin: 0 0 8px;
        color: #333;
        font-size: 0.9rem;
      }
      .toc-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .toc-item { margin: 4px 0; }
      .toc-sub { padding-left: 12px; }
      .toc-link {
        color: #0056b3;
        text-decoration: none;
        display: block;
        padding: 2px 4px;
        border-radius: 4px;
        transition: background 0.2s, color 0.2s;
      }
      .toc-link:hover, .toc-active {
        background: #FFD700;
        color: #1a1a1a;
        text-decoration: none;
      }
      @media (max-width: 900px) { #toc { display: none; } }
    `;
    document.head.appendChild(style);

    // Append to body
    document.body.appendChild(toc);

    // Highlight on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll('.toc-link').forEach((l) => {
              l.classList.toggle('toc-active', l.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildTOC);
  } else {
    buildTOC();
  }
})();
