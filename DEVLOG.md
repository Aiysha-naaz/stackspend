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


## Day 3 — 2026-05-22

**Hours worked:** 3–5

**What I did:**
Improved audit engine logic by refining redundancy detection between AI tools and fixing inconsistencies in seat waste and plan mismatch calculations. Cleaned up tool configuration and improved how insights are filtered to avoid duplicate or conflicting recommendations. Also tested multiple real-world scenarios in the UI to validate savings calculations and optimization outputs.

**What I learned:**
Small inconsistencies in rule ordering and filtering can completely change financial outputs in an audit system. The difference between showing correct vs misleading savings depends more on logic structure than raw calculations.

**Blockers / what I'm stuck on:**
Need to further refine plan mismatch detection and ensure all tools behave consistently across different team sizes and usage patterns.

**Plan for tomorrow:**
Improve detectPlanMismatch logic, reduce edge-case inconsistencies, and tighten overall audit accuracy for more realistic savings outputs.



## Day 4 — 2026-05-23

**Hours worked:** 6

**What I did:**
- Fixed and stabilized the audit engine after multiple real input tests
- Integrated AI-generated executive summary using Gemini API with fallback logic
- Added PDF export functionality for audit reports using jsPDF
- Set up Supabase project for storing audit data (initial schema + connection configured)
- Tested multiple end-to-end flows from input → audit → summary → output report

**What I learned:**
External API integration (Gemini) requires proper handling for key validation, quotas, and model availability. Also learned that fallback design is critical — the product must still work even if AI or external services fail.

**Blockers / what I'm stuck on:**
Need to refine Supabase schema design and decide what exactly should be stored for shareable audit URLs.

**Plan for tomorrow:**
- Connect Supabase to store audit results
- Implement shareable audit URLs
- Improve results page UX and structure

----



## Day 5 — 2026-05-24

**Hours worked:** 8

**What I did:**

Today I focused on completing the full end-to-end system: audit engine → UI → lead capture → email → shareable results.

The product is now fully functional as a complete flow from input to viral sharing.

---

## Major Features Completed

### 1. Lead Capture System Fixed
- Fixed Supabase RLS issues blocking inserts
- Lead data now correctly stored in `leads` table
- Rate limiting + honeypot protection added
- Transactional email flow integrated via Resend

---

### 2. Email System Stabilized
- Fixed Resend sandbox restrictions
- Confirmed transactional emails are sending
- HTML email includes summary + key metrics

---

### 3. Shareable Public URLs
- `/audit/[id]` public result pages working
- Sensitive data stripped (email, company name removed)
- Open Graph + Twitter Card metadata added
- Link previews optimized for WhatsApp/Twitter sharing

---

### 4. UI Improvements
- Added trust badges:
  - No login required
  - Instant audit
  - Shareable report
- Improved readability of homepage CTA section

---

### 5. Testing
- Vitest suite for audit engine (5 tests)
- Covers redundancy, seat waste, API optimization, and savings logic
- All tests passing

-----


## What I learned:

- Supabase RLS can silently block valid inserts
- Email sandbox restrictions often cause “fake success” confusion
- Shareable URLs + OG tags are critical for viral loop behavior


**Blockers / what I'm stuck on:**
- Email initially appeared successful but wasn’t reaching inbox due to Resend sandbox restrictions
- Supabase RLS policies blocked inserts until explicitly configured
- OG image preview debugging was unstable in development (localhost vs production mismatch issues)

----


## Plan for tomorrow:

- Deploy production build
- Verify OG previews on real domain
- Final polish for submission