import { AIToolId } from '@/hooks/useAuditStore';

export const COST_MATRIX: Record<AIToolId, Record<string, number>> = {
  cursor: { Pro: 20, Business: 40 },
  copilot: { Individual: 10, Business: 19 },
  claude: { Pro: 20, Team: 30 },
  chatgpt: { Plus: 20, Team: 25 },
  gemini: { Pro: 20, Ultra: 30 },
  v0: { Premium: 20, Business: 40 },
  anthropic_api: { 'API direct': 0 },
  openai_api: { 'API direct': 0 },
};