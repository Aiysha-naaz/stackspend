// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export type PrimaryUseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';
// export type AIToolId = 'cursor' | 'copilot' | 'claude' | 'chatgpt' | 'anthropic_api' | 'openai_api' | 'gemini' | 'v0';

// export interface ToolSelection {
//   enabled: boolean;
//   plan: string;
//   monthlySpend: number;
//   seats: number;
// }

// export interface AuditState {
//   teamSize: number;
//   primaryUseCase: PrimaryUseCase;
//   companyName: string;
//   tools: Record<AIToolId, ToolSelection>;
//   updateMeta: (key: 'teamSize' | 'primaryUseCase' | 'companyName', value: any) => void;
//   updateTool: (toolId: AIToolId, updates: Partial<ToolSelection>) => void;
// }

// const initialTools: Record<AIToolId, ToolSelection> = {
//   cursor: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 1 },
//   copilot: { enabled: false, plan: 'Individual', monthlySpend: 0, seats: 1 },
//   claude: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 1 },
//   chatgpt: { enabled: false, plan: 'Plus', monthlySpend: 0, seats: 1 },
//   anthropic_api: { enabled: false, plan: 'API direct', monthlySpend: 0, seats: 1 },
//   openai_api: { enabled: false, plan: 'API direct', monthlySpend: 0, seats: 1 },
//   gemini: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 1 },
//   v0: { enabled: false, plan: 'Premium', monthlySpend: 0, seats: 1 },
// };

// export const useAuditStore = create<AuditState>()(
//   persist(
//     (set) => ({
//       teamSize: 1,
//       primaryUseCase: 'mixed',
//       companyName: '',
//       tools: initialTools,
//       updateMeta: (key, value) => set((state) => ({ ...state, [key]: value })),
//       updateTool: (toolId, updates) => set((state) => ({
//         tools: { ...state.tools, [toolId]: { ...state.tools[toolId], ...updates } }
//       })),
//     }),
//     { name: 'stackspend-audit-cache' }
//   )
// );



// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export type PrimaryUseCase =
//   | 'coding'
//   | 'writing'
//   | 'data'
//   | 'research'
//   | 'mixed';

// export type AIToolId =
//   | 'cursor'
//   | 'copilot'
//   | 'claude'
//   | 'chatgpt'
//   | 'anthropic_api'
//   | 'openai_api'
//   | 'gemini'
//   | 'v0';

// export interface ToolSelection {
//   enabled: boolean;
//   plan: string;
//   monthlySpend: number;
//   seats: number;
// }

// export interface AuditState {
//   teamSize: number;
//   primaryUseCase: PrimaryUseCase;
//   companyName: string;

//   tools: Record<AIToolId, ToolSelection>;

//   updateMeta: (
//     key: 'teamSize' | 'primaryUseCase' | 'companyName',
//     value: any
//   ) => void;

//   updateTool: (
//     toolId: AIToolId,
//     updates: Partial<ToolSelection>
//   ) => void;

//   resetAudit: () => void;
// }

// const initialTools: Record<AIToolId, ToolSelection> = {
//   cursor: {
//     enabled: false,
//     plan: 'Pro',
//     monthlySpend: 0,
//     seats: 0,
//   },

//   copilot: {
//     enabled: false,
//     plan: 'Individual',
//     monthlySpend: 0,
//     seats: 0,
//   },

//   claude: {
//     enabled: false,
//     plan: 'Pro',
//     monthlySpend: 0,
//     seats: 0,
//   },

//   chatgpt: {
//     enabled: false,
//     plan: 'Plus',
//     monthlySpend: 0,
//     seats: 0,
//   },

//   anthropic_api: {
//     enabled: false,
//     plan: 'API direct',
//     monthlySpend: 0,
//     seats: 0,
//   },

//   openai_api: {
//     enabled: false,
//     plan: 'API direct',
//     monthlySpend: 0,
//     seats: 0,
//   },

//   gemini: {
//     enabled: false,
//     plan: 'Pro',
//     monthlySpend: 0,
//     seats: 0,
//   },

//   v0: {
//     enabled: false,
//     plan: 'Premium',
//     monthlySpend: 0,
//     seats: 0,
//   },
// };

// export const useAuditStore = create<AuditState>()(
//   persist(
//     (set) => ({
//       teamSize: 1,

//       primaryUseCase: 'mixed',

//       companyName: '',

//       tools: initialTools,

//       updateMeta: (key, value) =>
//         set((state) => ({
//           ...state,

//           [key]:
//             key === 'teamSize'
//               ? Math.max(1, Number(value) || 1)
//               : value,
//         })),

//       updateTool: (toolId, updates) =>
//         set((state) => ({
//           tools: {
//             ...state.tools,

//             [toolId]: {
//               ...state.tools[toolId],
//               ...updates,
//             },
//           },
//         })),

//       resetAudit: () =>
//         set({
//           teamSize: 1,
//           primaryUseCase: 'mixed',
//           companyName: '',
//           tools: initialTools,
//         }),
//     }),

//     {
//       name: 'stackspend-audit-cache'
      
//     }
//   )
// );





// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// export type PrimaryUseCase =
//   | 'coding'
//   | 'writing'
//   | 'data'
//   | 'research'
//   | 'mixed';

// export type AIToolId =
//   | 'cursor'
//   | 'copilot'
//   | 'claude'
//   | 'chatgpt'
//   | 'anthropic_api'
//   | 'openai_api'
//   | 'gemini'
//   | 'v0';

// export interface ToolSelection {
//   enabled: boolean;
//   plan: string;
//   monthlySpend: number;
//   seats: number;
// }

// export interface AuditState {
//   teamSize: number;
//   primaryUseCase: PrimaryUseCase;
//   companyName: string;
//   tools: Record<AIToolId, ToolSelection>;
//   updateMeta: (
//     key: 'teamSize' | 'primaryUseCase' | 'companyName',
//     value: string | number | PrimaryUseCase
//   ) => void;
//   updateTool: (
//     toolId: AIToolId,
//     updates: Partial<ToolSelection>
//   ) => void;
//   resetAudit: () => void;
// }

// const makeInitialTools = (): Record<AIToolId, ToolSelection> => ({
//   cursor: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 0 },
//   copilot: { enabled: false, plan: 'Individual', monthlySpend: 0, seats: 0 },
//   claude: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 0 },
//   chatgpt: { enabled: false, plan: 'Plus', monthlySpend: 0, seats: 0 },
//   anthropic_api: { enabled: false, plan: 'API direct', monthlySpend: 0, seats: 0 },
//   openai_api: { enabled: false, plan: 'API direct', monthlySpend: 0, seats: 0 },
//   gemini: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 0 },
//   v0: { enabled: false, plan: 'Premium', monthlySpend: 0, seats: 0 },
// });

// const initialState = {
//   teamSize: 1,
//   primaryUseCase: 'mixed' as PrimaryUseCase,
//   companyName: '',
//   tools: makeInitialTools(),
// };

// export const useAuditStore = create<AuditState>()(
//   persist(
//     (set) => ({
//       ...initialState,

//       updateMeta: (key, value) =>
//         set((state) => ({
//           ...state,
//           [key]:
//             key === 'teamSize'
//               ? Math.max(1, Number(value) || 1)
//               : value,
//         })),

//       updateTool: (toolId, updates) =>
//         set((state) => ({
//           tools: {
//             ...state.tools,
//             [toolId]: {
//               ...state.tools[toolId],
//               ...updates,
//             },
//           },
//         })),

//       resetAudit: () =>
//         set({
//           ...initialState,
//           tools: makeInitialTools(),
//         }),
//     }),
//     {
//       name: 'stackspend-audit-cache',
//       storage: createJSONStorage(() => localStorage),
//       partialize: (state) => ({
//         teamSize: state.teamSize,
//         primaryUseCase: state.primaryUseCase,
//         companyName: state.companyName,
//         tools: state.tools,
//       }),
//       merge: (persisted, current) => ({
//         ...current,
//         ...(persisted as Partial<AuditState>),
//         tools: {
//           ...current.tools,
//           ...((persisted as Partial<AuditState>)?.tools ?? {}),
//         },
//       }),
//     }
//   )
// );




import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * =========================
 * TYPES
 * =========================
 */

export type PrimaryUseCase =
  | 'coding'
  | 'writing'
  | 'data'
  | 'research'
  | 'mixed';

export type AIToolId =
  | 'cursor'
  | 'copilot'
  | 'claude'
  | 'chatgpt'
  | 'anthropic_api'
  | 'openai_api'
  | 'gemini'
  | 'v0';

/**
 * FIX: strict plan enum instead of free string
 * This prevents silent pricing mismatches
 */
export type ToolPlan =
  | 'Free'
  | 'Pro'
  | 'Plus'
  | 'Max'
  | 'Team'
  | 'Business'
  | 'Enterprise'
  | 'Individual'
  | 'Ultra'
  | 'Premium'
  | 'API direct';

/**
 * =========================
 * TOOL MODEL
 * =========================
 */

export interface ToolSelection {
  enabled: boolean;
  plan: ToolPlan;
  monthlySpend: number;

  /**
   * FIX: seats should NEVER be 0 in enabled state
   * minimum = 1 ensures no silent calculation bugs
   */
  seats: number;
}

/**
 * =========================
 * STORE STATE
 * =========================
 */

export interface AuditState {
  teamSize: number;
  primaryUseCase: PrimaryUseCase;
  companyName: string;

  tools: Record<AIToolId, ToolSelection>;

  updateMeta: (
    key: 'teamSize' | 'primaryUseCase' | 'companyName',
    value: string | number | PrimaryUseCase
  ) => void;

  updateTool: (
    toolId: AIToolId,
    updates: Partial<ToolSelection>
  ) => void;

  resetAudit: () => void;
}

/**
 * =========================
 * INITIAL STATE
 * =========================
 */

const makeInitialTools = (): Record<AIToolId, ToolSelection> => ({
  cursor: {
    enabled: false,
    plan: 'Pro',
    monthlySpend: 0,
    seats: 1,
  },
  copilot: {
    enabled: false,
    plan: 'Individual',
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
});

const initialState = {
  teamSize: 1,
  primaryUseCase: 'mixed' as PrimaryUseCase,
  companyName: '',
  tools: makeInitialTools(),
};

/**
 * =========================
 * STORE
 * =========================
 */

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      ...initialState,

      updateMeta: (key, value) =>
        set((state) => ({
          ...state,
          [key]:
            key === 'teamSize'
              ? Math.max(1, Number(value) || 1)
              : value,
        })),

      updateTool: (toolId, updates) =>
        set((state) => {
          const existing = state.tools[toolId];

          return {
            tools: {
              ...state.tools,
              [toolId]: {
                ...existing,
                ...updates,

                /**
                 * FIX: enforce seat safety rule
                 */
                seats: Math.max(
                  1,
                  updates.seats ?? existing.seats ?? 1
                ),
              },
            },
          };
        }),

      resetAudit: () =>
        set({
          ...initialState,
          tools: makeInitialTools(),
        }),
    }),
    {
      name: 'stackspend-audit-cache',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        teamSize: state.teamSize,
        primaryUseCase: state.primaryUseCase,
        companyName: state.companyName,
        tools: state.tools,
      }),

      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<AuditState>),
        tools: {
          ...current.tools,
          ...((persisted as Partial<AuditState>)?.tools ?? {}),
        },
      }),
    }
  )
);