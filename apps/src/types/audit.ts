import { AIToolId } from '@/hooks/useAuditStore';

export interface OptimizationInsight {
    id: string; 
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