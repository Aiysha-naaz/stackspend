import { AIToolId } from '@/hooks/useAuditStore';

export interface ToolConfig {
  id: AIToolId;
  name: string;
  plans: string[];
  category: 'editor' | 'chat' | 'api';
}

export const TOOL_CONFIGS: ToolConfig[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'editor',
    plans: ['Pro', 'Business', 'Enterprise'],
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'editor',
    plans: ['Individual', 'Business', 'Enterprise'],
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'chat',
    plans: ['Free', 'Pro', 'Max', 'Team', 'Enterprise'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'chat',
    plans: ['Plus', 'Team', 'Enterprise'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    category: 'chat',
    plans: ['Pro', 'Ultra'],
  },
  {
    id: 'v0',
    name: 'v0',
    category: 'editor',
    plans: ['Premium', 'Business'],
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    category: 'api',
    plans: ['API direct'],
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    category: 'api',
    plans: ['API direct'],
  },
];