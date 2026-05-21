import { AIToolId } from '@/hooks/useAuditStore';

export interface OptimizationInsight {
  toolId: AIToolId;
  type: 'redundancy' | 'tier_mismatch';
  severity: 'warning' | 'critical';
  message: string;
  potentialSavings: number;
}

export interface AuditResults {
  currentTotalMonthly: number;
  optimizedTotalMonthly: number;
  totalMonthlySavings: number;
  insights: OptimizationInsight[];
}