import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PrimaryUseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';
export type AIToolId = 'cursor' | 'copilot' | 'claude' | 'chatgpt' | 'anthropic_api' | 'openai_api' | 'gemini' | 'v0';

export interface ToolSelection {
  enabled: boolean;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditState {
  teamSize: number;
  primaryUseCase: PrimaryUseCase;
  companyName: string;
  tools: Record<AIToolId, ToolSelection>;
  updateMeta: (key: 'teamSize' | 'primaryUseCase' | 'companyName', value: any) => void;
  updateTool: (toolId: AIToolId, updates: Partial<ToolSelection>) => void;
}

const initialTools: Record<AIToolId, ToolSelection> = {
  cursor: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 1 },
  copilot: { enabled: false, plan: 'Individual', monthlySpend: 0, seats: 1 },
  claude: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 1 },
  chatgpt: { enabled: false, plan: 'Plus', monthlySpend: 0, seats: 1 },
  anthropic_api: { enabled: false, plan: 'API direct', monthlySpend: 0, seats: 1 },
  openai_api: { enabled: false, plan: 'API direct', monthlySpend: 0, seats: 1 },
  gemini: { enabled: false, plan: 'Pro', monthlySpend: 0, seats: 1 },
  v0: { enabled: false, plan: 'Premium', monthlySpend: 0, seats: 1 },
};

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      teamSize: 1,
      primaryUseCase: 'mixed',
      companyName: '',
      tools: initialTools,
      updateMeta: (key, value) => set((state) => ({ ...state, [key]: value })),
      updateTool: (toolId, updates) => set((state) => ({
        tools: { ...state.tools, [toolId]: { ...state.tools[toolId], ...updates } }
      })),
    }),
    { name: 'stackspend-audit-cache' }
  )
);