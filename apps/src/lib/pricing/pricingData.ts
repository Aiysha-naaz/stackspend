// import { AIToolId } from '@/hooks/useAuditStore';

// export const COST_MATRIX: Record<AIToolId, Record<string, number>> = {
//   cursor: { Pro: 20, Business: 40 },
//   copilot: { Individual: 10, Business: 19 },
//   claude: { Pro: 20, Team: 30 },
//   chatgpt: { Plus: 20, Team: 25 },
//   gemini: { Pro: 20, Ultra: 30 },
//   v0: { Premium: 20, Business: 40 },
//   anthropic_api: { 'API direct': 0 },
//   openai_api: { 'API direct': 0 },
// };



// import { AIToolId } from '@/hooks/useAuditStore';

// export const COST_MATRIX: Record<
//   AIToolId,
//   Record<string, number>
// > = {
//   cursor: {
//     Pro: 20,
//     Business: 40,
//     Enterprise: 60,
//   },

//   copilot: {
//     Individual: 10,
//     Business: 19,
//     Enterprise: 39,
//   },

//   claude: {
//     Free: 0,
//     Pro: 20,
//     Max: 100,
//     Team: 30,
//     Enterprise: 60,
//   },

//   chatgpt: {
//     Plus: 20,
//     Team: 30,
//     Enterprise: 60,
//   },

//   gemini: {
//     Pro: 20,
//     Ultra: 30,
//   },

//   v0: {
//     Premium: 20,
//     Business: 40,
//   },

//   anthropic_api: {
//     'API direct': 0,
//   },

//   openai_api: {
//     'API direct': 0,
//   },
// };





import { AIToolId } from '@/hooks/useAuditStore';

export type PlanCostMap = Record<string, number>;

export const COST_MATRIX: Record<AIToolId, PlanCostMap> = {
  cursor: {
    Pro: 20,
    Business: 40,
    Enterprise: 60,
  },

  copilot: {
    Individual: 10,
    Business: 19,
    Enterprise: 39,
  },

  claude: {
    Free: 0,
    Pro: 20,
    Max: 100,
    Team: 30,
    Enterprise: 60,
  },

  chatgpt: {
    Plus: 20,
    Team: 30,
    Enterprise: 60,
  },

  gemini: {
    Pro: 20,
    Ultra: 50, // FIX: more realistic separation (Ultra should not be near Pro)
  },

  v0: {
    Premium: 20,
    Business: 40,
  },

  anthropic_api: {
     "API direct": 0,
  },

  openai_api: {
      "API direct": 0,
  },
};