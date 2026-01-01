# flowprobe-lab

Synthetic fixture sites for the Doc Writer userflow journeys. Each `site/<name>` branch holds one site's source
tree and nothing else (`site/basic`, `site/admin`, `site/large`, `site/hostile`; `site/admin` also serves the
German twin). `site/hostile` holds security-crawl-maze test cases (Apache-2.0, its `LICENSE` is in the branch)
and crawler traps that only write to an in-memory log.

All people, emails (`@probe.test`) and phone numbers (`555-01xx`) are synthetic. Vendored code keeps its own
permissive licence: see `THIRD_PARTY_NOTICES.md` and `LICENSES/`.

The server, build scripts and selftests live in the Doc Writer agent repository under `scenarios/userflow/probe/`.
