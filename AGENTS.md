# AGENTS.md

## Cursor Cloud specific instructions

This is a zero-dependency, vanilla HTML/CSS/JS static web application (Decision Wheel). There is no package manager, no build step, no linter, and no test framework.

### Running the app

Serve the files with any static HTTP server from the repo root:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. See `README.md` for alternative server options.

### Key notes

- **No dependencies to install.** There is no `package.json`, `requirements.txt`, or any dependency manifest.
- **No build/lint/test commands.** The app runs directly from `index.html`, `styles.css`, and `app.js`.
- **Canvas rendering** requires a browser with Canvas API support (Chrome is pre-installed in the VM).
- **Web Audio API** is used for sound effects; some browsers require a user gesture before audio plays.
- **LocalStorage** is used for saving wheel templates; data is browser/domain-scoped.
