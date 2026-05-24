# TESTS.md

## Overview

This project includes automated unit tests for the AI Audit Engine using Vitest.

These tests ensure the core business logic is correct, deterministic, and production-safe.

---

## Test File Location :
` src/test-engine.ts`



---

## Test Coverage

### 1. Redundant Tool Detection
- File: `test-engine.ts`
- Ensures the engine detects overlapping AI tools (e.g., Cursor + Copilot)
- Validates that redundancy generates savings recommendations

---

### 2. Over-Provisioned Seats Detection
- File: `test-engine.ts`
- Detects when seat count exceeds team size
- Ensures correct monthly savings calculation

---

### 3. API Optimization Logic
- File: `test-engine.ts`
- Verifies detection of expensive API usage patterns
- Suggests cost reduction alternatives

---

### 4. Savings Calculation Accuracy
- File: `test-engine.ts`
- Validates:
  - monthly savings
  - annual savings
- Ensures arithmetic correctness of audit engine

---

### 5. Optimized Stack Handling
- File: `test-engine.ts`
- Ensures no false savings are generated for already-optimized setups
- Guarantees honesty of output

---

## How to Run Tests

Install dependencies:

```bash
npm install
```

Run tests:
```bash
npm run test
```

## Expected Result :
- Audit Engine (5)
  - redundant tool detection
  - seat optimization detection
  - API optimization detection
  - savings calculation accuracy
  - optimized setup validation


## Notes
- Tests are written in Vitest
- Focus is on deterministic business logic (not UI)
- Used to ensure audit engine reliability before deployment  