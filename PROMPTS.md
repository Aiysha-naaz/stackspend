# PROMPTS USED IN STACKSPEND AI AUDIT

This document contains the LLM prompts used in the StackSpend audit system, along with design rationale, trade-offs, and iterations.

---

## 1. Core Audit Summary Prompt

### Purpose
Generate a short, user-friendly summary of AI tooling inefficiencies based on structured audit output.

### Prompt

You are an expert SaaS cost optimization analyst.

Given the following AI tooling audit data:
- team size
- primary use case
- tool list with spend and insights
- total monthly and annual savings

Write a clear 80–120 word summary.

Rules:
- Do NOT exaggerate savings.
- If savings are low or zero, clearly state the stack is already well optimized.
- Focus on practical cost optimization insights, not generic advice.
- Use simple, direct language for startup founders and engineering managers.

Audit Data:
{{audit_json}}

Return only the summary paragraph.

---

### Why this works
- Keeps output deterministic and short
- Prevents hallucinated recommendations
- Forces grounding in structured audit data
- Avoids overuse of marketing tone

---

### What didn’t work (iteration notes)

1. Early version used "marketing-style SaaS copy"
   → Result: inflated savings + unrealistic urgency

2. Unstructured prompts with tool descriptions included
   → Result: inconsistent formatting and hallucinated tools

3. Very long prompts with examples
   → Result: slower response + occasional token overflow

---

## 2. Fallback Summary Prompt (used when API fails)

### Purpose
Ensure system never breaks if LLM API fails or is rate-limited.

### Prompt

You are a SaaS cost optimization assistant.

Write a neutral fallback summary based on this audit:

- If savings > 0: mention there are optimization opportunities.
- If savings is low: say the stack is already reasonably optimized.

Keep response under 80 words.

Audit:
{{audit_json}}

Return only the summary text.

---

### Why this exists
- Ensures product reliability during API failures
- Prevents broken UI states
- Keeps UX consistent under rate limits (Gemini / Anthropic 429 cases)

---

## 3. Email Lead Capture Message Prompt

### Purpose
Generate a short transactional-style email message after audit completion.

### Prompt

Write a concise follow-up email for a user who just received an AI tooling cost audit.

Include:
- total monthly savings
- suggestion to review optimization opportunities
- mention Credex can help unlock additional savings for high-spend teams

Tone:
- professional
- non-pushy
- startup-friendly

Do not exaggerate savings.

Audit:
{{audit_json}}

Return subject + email body.

---

### Why this works
- Keeps email non-spammy
- Avoids aggressive sales tone
- Improves conversion without hurting trust

---

## 4. Design Decisions for Prompting Strategy

We intentionally use minimal prompting instead of complex multi-step reasoning chains.

### Key decisions:

- Structured JSON input only (no free-form text mixing)
- Short prompts (<150 words each)
- No chain-of-thought prompting
- No tool reasoning exposed to model
- Hard constraints on output length

---

## 5. What we explicitly avoided

- No “Let’s think step by step” prompts (caused verbose outputs)
- No multi-agent prompting (overkill for MVP)
- No reinforcement-style self-critique loops (increased latency)
- No dynamic prompt injection from UI text (security risk)

---

## 6. Overall philosophy

The audit engine itself is deterministic.

The LLM is ONLY used for:
- summarization
- communication polish
- user-friendly explanation

We deliberately avoid using AI for:
- pricing logic
- savings calculations
- tool comparisons

This separation ensures reliability and auditability.