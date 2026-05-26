# REFLECTION.md

## 1. The hardest bug I hit this week, and how I debugged it

The hardest issue I faced was debugging inconsistent Open Graph previews for shareable audit URLs. The audit pages rendered correctly in the browser, and Open Graph validators showed valid metadata, but WhatsApp and some other platforms either displayed stale previews or failed to show the generated image entirely.

My first hypothesis was that metadata generation itself was broken. I checked the `generateMetadata` function in the Next.js App Router and verified that the audit data was loading correctly from Supabase. After confirming that titles, descriptions, and image URLs were rendering properly in the HTML, I suspected the issue was related to image generation.

I then isolated the `opengraph-image.tsx` route and tested it directly in the browser. The image rendered correctly, which ruled out the rendering layer. After that, I investigated caching behavior and learned that social platforms cache previews aggressively and often ignore local changes for previously shared URLs.

I tested using production deployment URLs instead of localhost, added unique audit IDs to image paths, forced dynamic rendering, and verified the metadata using Open Graph preview tools. Eventually, I confirmed the issue was mostly platform-level caching rather than broken application logic.

This bug taught me that debugging distributed systems often means validating every layer independently: routing, rendering, metadata generation, caching, and third-party platform behavior.

---

## 2. A decision I reversed mid-week, and what made me reverse it

One major decision I reversed was initially trying to make the audit engine heavily AI-driven. My first idea was to send all user tool configurations into Gemini and let the model generate optimization recommendations dynamically.

After testing this approach, I realized the outputs were inconsistent and difficult to trust financially. Sometimes the recommendations sounded reasonable but produced inflated savings or vague reasoning. Since this product is fundamentally about cost optimization, incorrect recommendations would damage trust immediately.

I stepped back and restructured the system into a deterministic rule-based audit engine. Instead of AI generating savings logic, I used hardcoded optimization rules for plan mismatch detection, redundancy analysis, API credit opportunities, and seat waste calculations. The AI layer was then limited to generating the executive summary paragraph only.

This change made the product significantly stronger. The calculations became explainable, reproducible, and easier to test. It also aligned better with the assignment instructions, which explicitly hinted that knowing when not to use AI was part of the evaluation.

The reversal improved reliability, simplified debugging, and made the audit outputs much more defensible from a finance perspective.

---

## 3. What I would build in week 2 if I had it

If I had another week, I would focus on turning the project from a strong MVP into a more complete growth product.

The first feature I would add is benchmarking. I would show users how their AI spend compares to similar startups by team size and use case. For example: “Your AI spend per developer is 38% higher than comparable engineering teams.” That would make the audit feel more actionable and data-driven.

Second, I would improve the audit engine using usage-weighted scoring instead of static rule matching. Right now the recommendations are deterministic, but I would like to model usage intensity, collaboration needs, and API dependency more accurately.

Third, I would build a proper analytics layer to track audit completion rate, lead conversion rate, and which optimization recommendations users interact with most.

I would also improve the viral sharing system. Right now users can share audit reports, but I would experiment with more visual “savings cards” optimized specifically for X and LinkedIn screenshots.

Finally, I would improve onboarding and polish. The current product works end-to-end, but there are still opportunities to improve animation smoothness, mobile UX, and accessibility details.

The core system is stable now, so week 2 would mainly focus on growth loops, better financial intelligence, and stronger product polish.

---

## 4. How I used AI tools

I used ChatGPT, Gemini, and Cursor throughout the project, but I treated them as assistants rather than autonomous builders.

Cursor was most useful for refactoring repetitive UI code, improving TypeScript types, and speeding up iteration inside the audit engine. ChatGPT helped me reason through architecture decisions, debugging strategies, and documentation structure. Gemini was integrated directly into the product to generate personalized executive summaries for audit reports.

I did not trust AI tools with financial logic or optimization reasoning. All savings calculations, recommendation rules, and pricing decisions were implemented manually because those outputs needed to be deterministic and testable.

One specific case where AI was wrong involved Open Graph metadata generation. An AI-generated solution suggested using static metadata exports, which completely broke dynamic audit previews for shareable URLs. After testing it manually, I realized the solution ignored how dynamic route metadata works in the Next.js App Router.

I reverted that approach and rebuilt the metadata flow using dynamic rendering and audit-specific image generation.

This project reinforced my view that AI tools are excellent accelerators for implementation and exploration, but engineering judgment still matters heavily when correctness, architecture, and product behavior are involved.

---

## 5. Self-rating

### Discipline — 8/10
I maintained progress across the full week, kept consistent commits, and shipped all MVP requirements before focusing on polish and documentation.

### Code quality — 8/10
The codebase is modular and readable overall, especially inside the audit engine, though there are still areas where abstraction and cleanup could be improved further.

### Design sense — 8/10
I focused heavily on clarity, trust, and shareability rather than visual complexity. The UI feels product-oriented and usable, though there is room for more refined visual polish.

### Problem-solving — 8/10
I handled multiple integration issues involving Supabase, email delivery, dynamic metadata generation, and optimization logic debugging while keeping the project moving forward.

### Entrepreneurial thinking — 8/10
I approached the assignment as a real lead-generation product instead of a coding exercise, especially around viral sharing, trust signals, pricing logic, and conversion-focused flows.