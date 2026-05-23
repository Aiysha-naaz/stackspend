// import { AIToolId } from '@/hooks/useAuditStore';

// export interface OptimizationInsight {
//     id: string; 
//   toolId: AIToolId;
//   type: 'redundancy' | 'tier_mismatch';
//   severity: 'warning' | 'critical';
//   message: string;
//   potentialSavings: number;
// }

// export interface AuditResults {
//   currentTotalMonthly: number;
//   optimizedTotalMonthly: number;
//   totalMonthlySavings: number;
//   insights: OptimizationInsight[];
// }





// import { AIToolId } from '@/hooks/useAuditStore';
// export type InsightType =
//   | 'redundancy'
//   | 'tier_mismatch'
//   | 'seat_waste'
//   | 'credits_opportunity';

// export interface OptimizationInsight {
//   id: string;
//   toolId: AIToolId;
//   type: InsightType;
//   severity: 'warning' | 'critical';
//   message: string;
//   potentialSavings: number;
// }

// export interface AuditResults {
//   currentTotalMonthly: number;
//   optimizedTotalMonthly: number;
//   totalMonthlySavings: number;
//   insights: OptimizationInsight[];
// }


// import { AIToolId } from '@/hooks/useAuditStore';

// export type InsightType =
//   | 'redundancy'
//   | 'seat_waste'
//   | 'plan_mismatch'
//   | 'credits_opportunity';

// export interface OptimizationInsight {
//   id: string;
//   toolId: AIToolId;
//   type: InsightType;
//   severity: 'warning' | 'critical';
//   message: string;
//   potentialSavings: number;
// }

// export interface AuditResults {
//   currentTotalMonthly: number;
//   optimizedTotalMonthly: number;
//   totalMonthlySavings: number;
//   insights: OptimizationInsight[];
// }






import { AIToolId } from '@/hooks/useAuditStore';

export type InsightType =
  | 'redundancy'
  | 'tier_mismatch'
  | 'credits_opportunity';

export interface OptimizationInsight {
  id: string;
  toolId: AIToolId;
  type: InsightType;
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