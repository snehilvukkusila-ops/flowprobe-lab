# FlowProbe

A tiny, throwaway React + `react-router-dom` app with real routed pages
(Home, Dashboard, Profile, Settings, Create Report, Team, Team Member detail,
Projects, Notifications, Invite Member, About, a simulated error page, and a
404 catch-all) and **no authentication anywhere**. Built specifically as a
fast, always-reachable target for testing the userflow-track documentation
pipeline's screenshot capture, form-field coverage, navigation-depth
discovery, and network-capture richness — every page is a plain click away,
so exploration can actually reach and screenshot each one instead of
stalling on a login wall.

Deployed via GitHub Pages: https://snehilvukkusila-ops.github.io/flowprobe-screenshot-app/

## Page set

- **Home / Dashboard / Profile / About** — original fixture pages. Dashboard
  fetches `/dashboard.json` on mount and again on a "Refresh" click.
- **Settings** — a real controlled form (theme radio group, language select,
  notification-frequency select, 2FA checkbox, display-name text input) with
  a Save button that only sets client state to show an inline "Saved"
  confirmation. No network submit is ever made — this pipeline's safety
  interceptor blocks non-GET requests, so the fixture models a client-only
  save honestly.
- **Create Report** — existing 2-step form (title + category).
- **Team** — a table of team members fetched from `/team.json`, each row
  linking to `/team/:id`.
- **Team Member detail** (`/team/:id`) — one member's profile plus an
  in-page expandable "Activity log".
- **Projects** — a client-side-filterable table fetched from
  `/projects.json`, with a "Load more" button that appends rows from local
  state (no navigation, no network call).
- **Notifications** — a list of notifications with unread/read badges and a
  "Mark all read" button (client state only).
- **Invite Member** (`/invite`) — email/role/checkbox/date/number field
  coverage.
- **Error demo** (`/error-demo`) and **404 page** (catch-all route) —
  styled error states.

## Deliberate test fixtures

A few things here look like bugs but are intentional pipeline test cases —
please don't "fix" them:

- The **Invite** button (on both the Team page and the Invite Member form)
  is labeled exactly "Invite", which matches this pipeline's own
  `DEFAULT_DENYLIST` verb list. It's meant to be correctly *excluded* from
  click-based discovery while the `/invite` page itself stays reachable via
  a direct nav link — testing that denylist filtering and direct-link
  discovery both work.
- The Team Member detail page's "Back to Dashboard" link deliberately goes
  to `/dashboard` instead of back to `/team`, jumping out of its own
  subtree. This exercises the pipeline's `left_subtree` /
  interaction-safety detection.
- Dashboard's "Refresh" button re-fetches `/dashboard.json` on every click,
  producing multiple real GET calls to the same URL — this gives the
  pipeline's capture-richness "count" evidence something other than 1 to
  work with.

## Local dev

```bash
npm install
npm run dev
```
