# Decision Wheel App

## Cursor Cloud specific instructions

This is a zero-dependency, static HTML/CSS/JS application. There is no build step, no package manager, no Node.js requirement, and no external services.

### Running the app

Serve the files with any static HTTP server from the workspace root:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser.

### Key notes

- No linting, testing framework, or build tooling is configured. Validation is done by loading the app in a browser and interacting with it.
- All data is stored in browser `localStorage` — no database or backend.
- The app uses Canvas API for wheel rendering and Web Audio API for sound effects (audio requires user interaction in the browser before it plays).
- Files: `index.html` (entry point), `app.js` (all logic), `styles.css` (styling).
