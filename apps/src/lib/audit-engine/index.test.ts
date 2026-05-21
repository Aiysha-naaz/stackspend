import { describe, it, expect } from 'vitest';

import { runAuditEngine } from './index';

describe('Audit Engine', () => {
  it('detects redundant Cursor + Copilot usage', () => {
    const result = runAuditEngine({
      teamSize: 2,
      primaryUseCase: 'coding',
      companyName: 'Test',

      tools: {
        cursor: {
          enabled: true,
          plan: 'Pro',
          monthlySpend: 0,
          seats: 2,
        },

        copilot: {
          enabled: true,
          plan: 'Business',
          monthlySpend: 0,
          seats: 2,
        },

        claude: {
          enabled: false,
          plan: 'Pro',
          monthlySpend: 0,
          seats: 1,
        },

        chatgpt: {
          enabled: false,
          plan: 'Plus',
          monthlySpend: 0,
          seats: 1,
        },

        anthropic_api: {
          enabled: false,
          plan: 'API direct',
          monthlySpend: 0,
          seats: 1,
        },

        openai_api: {
          enabled: false,
          plan: 'API direct',
          monthlySpend: 0,
          seats: 1,
        },

        gemini: {
          enabled: false,
          plan: 'Pro',
          monthlySpend: 0,
          seats: 1,
        },

        v0: {
          enabled: false,
          plan: 'Premium',
          monthlySpend: 0,
          seats: 1,
        },
      },

      updateMeta: () => {},
      updateTool: () => {},
    });

    expect(result.insights.length).toBeGreaterThan(0);

    expect(
      result.insights.some(
        (insight) =>
          insight.type === 'redundancy'
      )
    ).toBe(true);
  });
});


//2
it('detects unused seats', () => {
  const result = runAuditEngine({
    teamSize: 2,
    primaryUseCase: 'coding',
    companyName: 'Test',

    tools: {
      cursor: {
        enabled: true,
        plan: 'Business',
        monthlySpend: 0,
        seats: 5,
      },

      copilot: {
        enabled: false,
        plan: 'Business',
        monthlySpend: 0,
        seats: 1,
      },

      claude: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      chatgpt: {
        enabled: false,
        plan: 'Plus',
        monthlySpend: 0,
        seats: 1,
      },

      anthropic_api: {
        enabled: false,
        plan: 'API direct',
        monthlySpend: 0,
        seats: 1,
      },

      openai_api: {
        enabled: false,
        plan: 'API direct',
        monthlySpend: 0,
        seats: 1,
      },

      gemini: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      v0: {
        enabled: false,
        plan: 'Premium',
        monthlySpend: 0,
        seats: 1,
      },
    },

    updateMeta: () => {},
    updateTool: () => {},
  });

  expect(
    result.insights.some(
      (insight) =>
        insight.type === 'tier_mismatch'
    )
  ).toBe(true);
});

//3 credits opp
it('detects API credit optimization opportunities', () => {
  const result = runAuditEngine({
    teamSize: 5,
    primaryUseCase: 'coding',
    companyName: 'Test',

    tools: {
      cursor: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      copilot: {
        enabled: false,
        plan: 'Business',
        monthlySpend: 0,
        seats: 1,
      },

      claude: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      chatgpt: {
        enabled: false,
        plan: 'Plus',
        monthlySpend: 0,
        seats: 1,
      },

      anthropic_api: {
        enabled: true,
        plan: 'API direct',
        monthlySpend: 1200,
        seats: 1,
      },

      openai_api: {
        enabled: false,
        plan: 'API direct',
        monthlySpend: 0,
        seats: 1,
      },

      gemini: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      v0: {
        enabled: false,
        plan: 'Premium',
        monthlySpend: 0,
        seats: 1,
      },
    },

    updateMeta: () => {},
    updateTool: () => {},
  });

  expect(
    result.insights.some(
      (insight) =>
        insight.toolId === 'anthropic_api'
    )
  ).toBe(true);
});


// 4 savings calculations
it('calculates total savings correctly', () => {
  const result = runAuditEngine({
    teamSize: 2,
    primaryUseCase: 'coding',
    companyName: 'Test',

    tools: {
      cursor: {
        enabled: true,
        plan: 'Business',
        monthlySpend: 0,
        seats: 5,
      },

      copilot: {
        enabled: true,
        plan: 'Business',
        monthlySpend: 0,
        seats: 5,
      },

      claude: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      chatgpt: {
        enabled: false,
        plan: 'Plus',
        monthlySpend: 0,
        seats: 1,
      },

      anthropic_api: {
        enabled: false,
        plan: 'API direct',
        monthlySpend: 0,
        seats: 1,
      },

      openai_api: {
        enabled: false,
        plan: 'API direct',
        monthlySpend: 0,
        seats: 1,
      },

      gemini: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      v0: {
        enabled: false,
        plan: 'Premium',
        monthlySpend: 0,
        seats: 1,
      },
    },

    updateMeta: () => {},
    updateTool: () => {},
  });

  expect(
    result.totalMonthlySavings
  ).toBeGreaterThan(0);
});


//5  no false positives 
it('returns no major savings for optimized setups', () => {
  const result = runAuditEngine({
    teamSize: 3,
    primaryUseCase: 'coding',
    companyName: 'Healthy Setup',

    tools: {
      cursor: {
        enabled: true,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 3,
      },

      copilot: {
        enabled: false,
        plan: 'Business',
        monthlySpend: 0,
        seats: 1,
      },

      claude: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      chatgpt: {
        enabled: false,
        plan: 'Plus',
        monthlySpend: 0,
        seats: 1,
      },

      anthropic_api: {
        enabled: false,
        plan: 'API direct',
        monthlySpend: 0,
        seats: 1,
      },

      openai_api: {
        enabled: false,
        plan: 'API direct',
        monthlySpend: 0,
        seats: 1,
      },

      gemini: {
        enabled: false,
        plan: 'Pro',
        monthlySpend: 0,
        seats: 1,
      },

      v0: {
        enabled: false,
        plan: 'Premium',
        monthlySpend: 0,
        seats: 1,
      },
    },

    updateMeta: () => {},
    updateTool: () => {},
  });

  expect(
    result.totalMonthlySavings
  ).toBeLessThan(50);
});
