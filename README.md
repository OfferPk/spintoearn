# Spin to Earn (`spintoearn`)

Browser-based Flappy Bird–style game with a spin-to-earn / reward wheel. Static HTML, CSS, and JavaScript — open in a modern browser; no build step required.

## Quick start

1. Clone or download this repository.
2. Open `index.html` (or `flappybirdwithspin.html`) in a browser.
3. Optional: serve locally, e.g. `python -m http.server 8080`, then visit `http://localhost:8080`.

## Project layout

| Path | Description |
|------|-------------|
| `index.html` | Entry redirect to the main game |
| `flappybirdwithspin.html` | Main self-contained playable game |
| `enhanced-flappy-bird.html` | Experimental shell that loads modular features (incomplete — see notes) |
| `login-screen.html` | Standalone login/signup UI demo (localStorage only) |
| `css/` | Styles for modular features (mystery box, referral, rotation, battle royale) |
| `js/` | Scripts for modular features |
| `docs/` | Planning notes and known issues |

## Modular features

These modules are intended for `enhanced-flappy-bird.html`:

- **Mystery box** — `css/mystery-box.css`, `js/mystery-box.js`
- **Battle royale** — `css/battle-royale.css`, `js/battle-royale.js` (optional; not wired into the enhanced shell by default)
- **Referral / screen rotation** — CSS is present; JS files are safe placeholders (earlier copies wrongly stored CSS as `.js`)

`enhanced-flappy-bird.html` still expects `original-game.js` and `original-styles.css`, which are **not** in this repo yet. Prefer `flappybirdwithspin.html` for a working game.

## Notes

- No `package.json` — pure static front-end.
- Login demo stores credentials in `localStorage` (demo only; not secure for production).
- Battle royale code uses placeholder Firebase config values (`YOUR_API_KEY`, etc.); replace before any real multiplayer use.
- Planning notes: `docs/todo.md`, `docs/spin-to-earn-issues.md`.

## License

Not specified in-repo. Contact the repository owner for licensing terms.
