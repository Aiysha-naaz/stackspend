# StackSpend — AI Spend Audit Platform

StackSpend is a free AI spend optimization platform designed for startup founders, engineering managers, and small teams using tools like Cursor, Claude, ChatGPT, Gemini, Copilot, and OpenAI APIs. The platform analyzes a company’s current AI tooling stack, identifies unnecessary spend, recommends lower-cost alternatives or plan downgrades, and generates a personalized audit report with projected monthly and annual savings.

The project was built as part of the Credex Web Development Intern Assignment, with a focus on shipping a real product experience rather than a coding exercise. The app includes shareable audit URLs, Open Graph previews, AI-generated summaries, PDF exports, transactional emails, and backend lead capture.

---

# Live Links

## Live App

https://stackspend-mauve.vercel.app/

## GitHub Repository

https://github.com/Aiysha-naaz/stackspend.git

## Demo Video

https://drive.google.com/file/d/1OnGkZHg8iRqf-uwwPv49utna450c0Vda/view?usp=drivesdk

---
## Screenshots

### 1. Landing Page
Cold visitors can select their AI tools, enter pricing details, team size, and primary use case to generate an instant AI spend audit.

![Landing Page](./screenshots/landing.png)

---

### 2. Audit Report
Generated audit report showing current spend, optimized spend, annual savings, and actionable optimization insights with reasoning.

![Audit Report](./screenshots/report.png)

---

### 3. Shareable Open Graph Preview
Each audit generates a public shareable URL with dynamic Open Graph previews for platforms like WhatsApp, Twitter, and LinkedIn.

![OG Preview](./screenshots/OG_preview.png)

---

### 4. PDF Export
Users can download a PDF version of the audit report for sharing internally with their team or finance stakeholders.

![PDF Export](./screenshots/pdf_export.png)
---

# Core Features

## AI Spend Audit Engine

- Evaluates AI tooling spend across:
  - Cursor
  - GitHub Copilot
  - Claude
  - ChatGPT
  - Gemini
  - OpenAI API
  - Anthropic API
  - v0 / Windsurf

- Detects:
  - Overpriced plans
  - Overprovisioned seats
  - Cheaper alternatives
  - Retail vs credit pricing opportunities

- Calculates:
  - Monthly savings
  - Annual savings
  - Per-tool optimization insights

---

## Personalized AI Summaries

- Uses Gemini AI to generate personalized audit summaries
- Graceful fallback handling if the AI request fails
- AI used only for summaries, not financial calculations

---

## Shareable Public Reports

- Unique public audit URLs
- Open Graph + Twitter preview support
- Company/email data stripped from public reports

---

## Lead Capture & Backend

- Lead capture form after audit completion
- Stores audit + lead data in Supabase
- Transactional confirmation emails using Resend
- Simple abuse protection included

---

## Bonus Features Implemented

- PDF export for audit reports
- Open Graph dynamic image generation
- Mobile responsive UI
- Persistent form state across reloads
- CI workflow
- Automated audit engine tests

---

# Tech Stack

## Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## Backend & Infrastructure

- Supabase
- Vercel
- Resend

## AI

- Gemini API

## Testing

- Vitest

---

# Folder Structure

```bash
src/
├── app/
├── components/
├── config/
├── hooks/
├── lib/
├── types/
└── test-engine.ts
```

# Quick Start
1. Clone the Repository
```bash
   git clone https://github.com/Aiysha-naaz/stackspend.git
   cd stackspend/apps
```
2. Install Dependencies
```bash
   npm install
```
3. Configure Environment Variables
Create a .env.local file:   
 
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

GEMINI_API_KEY=

RESEND_API_KEY=

NEXT_PUBLIC_BASE_URL=http://localhost:3000  

4. Run the Development Server
```bash
   npm run dev
```
Open:
`http://localhost:3000`

Running Tests:
```bash
npm run test
```
 
## CI Workflow
GitHub Actions runs:

- linting
- audit engine tests

on every push to main.


# Deployment
The app is deployed using Vercel.

1. Production Build
```bash
npm run build
```

2. Deploy
```bash
vercel
```
----

## How the Audit Flow Works
1. User inputs AI tools, pricing plans, seats, and usage type
2. Audit engine evaluates optimization opportunities
3. Deterministic rules calculate savings
4. Gemini AI generates a personalized summary
5. Audit data is stored in Supabase
6. Public report URL is generated
7. Lead capture flow stores qualified users
8. Transactional email confirms audit completion

---

## Engineering Decisions & Trade-offs
1. Deterministic audit engine instead of AI-generated calculations
I intentionally kept all pricing and optimization logic rule-based instead of relying on an LLM. Financial recommendations should be explainable, predictable, and traceable to real pricing data.


2. No authentication system
The assignment emphasized speed, shareability, and low friction. Removing authentication allowed users to generate audits instantly and improved conversion flow.


3. Next.js App Router over a traditional SPA
Next.js simplified API routes, metadata generation, server rendering, Open Graph previews, and deployment into a single framework.


4. Supabase instead of building a custom backend
Supabase reduced backend setup complexity and enabled faster iteration while still using a real Postgres database and production-ready infrastructure.


5. Honest optimization logic
The app intentionally avoids fake or inflated savings recommendations. If a user’s stack is already efficient, the audit reflects that honestly instead of manufacturing opportunities.

-----

## Accessibility & Performance
The app was designed with:

- semantic HTML
- keyboard-friendly forms
- responsive layouts
- optimized rendering
- mobile-first UI patterns

Target Lighthouse scores:

- Performance ≥ 85
- Accessibility ≥ 90
- Best Practices ≥ 90

----

## Future Improvements
If expanded further, I would add:

- Benchmarking against similar companies
- Team collaboration
- Historical spend tracking
- Referral system
- Embedded audit widgets
- Advanced analytics dashboard
- More granular API usage analysis


-----


## Assignment Context

This project was built for the Credex Web Development Intern Assignment (Round 1). The goal was to demonstrate not only programming ability, but also product thinking, engineering trade-offs, entrepreneurial reasoning, and the ability to ship a polished product under time constraints.