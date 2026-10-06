# hostile site (port 4105)

Source tree of the FlowProbe hostile site, projected to branch `site/hostile`.

- `html/`, `css/`, `javascript/interactive/`, `javascript/misc/*.html`, `misc/known-files/`:
  static test cases from google/security-crawl-maze (Apache-2.0), byte for byte. The licence
  text is `LICENSE` in this tree (not served); upstream ships no NOTICE file.
- `maze-upstream/expected-results.json`: the upstream list of resources a crawler should find.
- `index.html`, `traps/*.html`, `reveal/*.html`, `robots.txt`, `sitemap.xml`,
  `css/font-face.css`, `javascript/misc/*.js`: ours.
- `package.json` and `src/App.jsx` (ours, not served): the code a reader such as Doc Writer
  ingests. A React Router table declares one screen, the app root, with no base path, so it is
  joined to the run's app address: the home page at `/`, the reveal workbench at `/reveal/`.
- Dynamic routes (`/api/delete`, `/items/:id/delete`, `/pager`, `/traps/huge`, `/traps/slow`,
  `/logout`, `/do-not-click/*`, `/popup/target`, `/shadow/target`, `/api/dialog-accepted`,
  directory listings and the `*.found` resources) are written in `../handler.mjs`.
  `EXPECTED/hostile.json` lists every trap and what a well-behaved crawler does.
