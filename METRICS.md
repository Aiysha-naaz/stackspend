# METRICS — StackSpend

---

##  North Star Metric

**Qualified Savings-Driven Leads per Week**

A “qualified lead” is defined as a user who:
- completes a full audit, AND
- sees ≥ $100/month in estimated savings, AND
- submits email for report delivery or clicks share/export

### Why this metric

StackSpend is not a usage product — it is a **decision and conversion tool**.

The real business value is not audits completed, but:
- users who discover meaningful savings
- and enter the Credex funnel (email capture / consultation intent)

Optimizing for raw traffic (DAU/MAU) would misrepresent product success.

---

##  Input Metrics (Leading Indicators)

### 1. Audit Completion Rate
% of users who finish full tool input → generate results  
This measures friction in the onboarding flow.

---

### 2. High-Savings Detection Rate
% of audits showing >$100/month savings

This directly reflects:
- pricing model effectiveness
- quality of audit engine rules
- ability to surface meaningful inefficiencies

---

### 3. Lead Capture Conversion Rate
% of audit results that convert into:
- email submission OR
- report export/share action

This measures monetization efficiency of the free tool.

---

##  What We Would Instrument First

1. Funnel tracking:
   - page_view → tool_selection → audit_generated → results_viewed → email_capture

2. Savings distribution analytics:
   - histogram of monthly savings per audit
   - segmentation by team size and use case

3. Tool-level contribution metrics:
   - which AI tools contribute most to detected waste
   - redundancy frequency across tools (e.g., Claude vs ChatGPT overlap)

4. Drop-off points:
   - where users abandon audit creation

---

##  Pivot Trigger

We would consider a product pivot if:

- <20% of users reach audit completion, OR
- <10% of completed audits show meaningful savings (> $100/month), OR
- <5% conversion from audit → lead capture

This would indicate either:
- weak perceived value, OR
- overly aggressive / inaccurate savings detection logic

---

##  Success Definition

StackSpend is successful when:
- users consistently discover real savings
- ≥15–25% of users convert into leads
- high-savings audits (> $500/month) become a repeatable funnel driver for Credex