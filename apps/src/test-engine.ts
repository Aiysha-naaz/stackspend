import { runAuditEngine } from '@/lib/audit-engine';

const result = runAuditEngine({
  teamSize: 2,
  primaryUseCase: 'coding',
  companyName: 'Test Startup',

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
      enabled: true,
      plan: 'Team',
      monthlySpend: 0,
      seats: 2,
    },

    anthropic_api: {
      enabled: true,
      plan: 'API direct',
      monthlySpend: 600,
      seats: 1,
    },

    openai_api: {
      enabled: true,
      plan: 'API direct',
      monthlySpend: 500,
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

console.log(result);