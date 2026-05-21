## Day 1 — 2026-05-20

**Hours worked:** 2

**What I did:**
- Initialized the Next.js + TypeScript project
- Set up the base folder structure
- Installed Zustand and testing dependencies
- Planned the audit engine structure and optimization flow

**What I learned:**
This assignment is much more product-focused than a normal coding challenge, so architecture and execution discipline matter early.

**Blockers / what I'm stuck on:**
Still deciding how to structure optimization rules cleanly without creating a huge monolithic audit file.

**Plan for tomorrow:**
Start building the audit engine and pricing logic.



## Day 2 — 2026-05-21

**Hours worked:** 3.5

**What I did:**
Built and refined the core AI spend audit engine. Integrated multiple optimization rules including redundancy detection, seat waste analysis, plan mismatch detection, and API credit optimization. Improved the engine to handle conflict resolution between overlapping insights and ensured savings are not double-counted. Began integrating UI components for tool configuration and audit visualization.

**What I learned:**
I learned how financial optimization logic can easily produce inflated savings if multiple rules overlap. I implemented deduplication and per-tool optimization resolution to ensure the results are realistic and defensible from a finance perspective. I also improved my understanding of how to structure rule-based systems in a modular way.

**Blockers / what I'm stuck on:**
Still working on fully connecting the UI with the audit engine output in a clean results dashboard format. Need to build better persistence and a shareable audit result flow next.

**Plan for tomorrow:**
Build the results page UI, connect audit engine output to frontend dashboard, and start implementing shareable URL structure for audit results.