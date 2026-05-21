// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import {
//   AuditResults,
//   OptimizationInsight,
// } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// export function runAuditEngine(state: AuditState): AuditResults {
//   let currentTotalMonthly = 0;
//   const insights: OptimizationInsight[] = [];

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   // 1. Baseline spend
//   activeTools.forEach(([id, meta]) => {
//     const toolId = id as AIToolId;

//     if (toolId === 'anthropic_api' || toolId === 'openai_api') {
//       currentTotalMonthly += meta.monthlySpend;
//     } else {
//       const perSeatCost = COST_MATRIX[toolId][meta.plan] || 20;
//       currentTotalMonthly += perSeatCost * meta.seats;
//     }
//   });

//   // 2. Run rules
//   const allRules = [
//     detectRedundancy,
//     detectSeatWaste,
//     detectPlanMismatch,
//     detectCreditsOpportunity,
//   ];

//   const seen = new Set<string>();

//   allRules.forEach((rule) => {
//     const ruleInsights = rule(state);

//     for (const insight of ruleInsights) {
//       if (seen.has(insight.id)) continue;
//       seen.add(insight.id);

//       insights.push(insight);
//     }
//   });

//   // 3. Safe savings aggregation
//   let totalSavings = 0;

//   for (const insight of insights) {
//     totalSavings += insight.potentialSavings;
//   }

//   // 4. Hard safety cap (prevents nonsense outputs)
//   totalSavings = Math.min(totalSavings, currentTotalMonthly * 0.7);

//   const optimizedTotalMonthly = currentTotalMonthly - totalSavings;

//   return {
//     currentTotalMonthly: Math.round(currentTotalMonthly),

//     optimizedTotalMonthly: Math.max(0, Math.round(optimizedTotalMonthly)),

//     totalMonthlySavings: Math.round(Math.max(0, totalSavings)),

//     insights,
//   };
// }




import { AuditState, AIToolId } from '@/hooks/useAuditStore';
import { COST_MATRIX } from '@/lib/pricing/pricingData';
import {
  AuditResults,
  OptimizationInsight,
} from '@/types/audit';

import { detectSeatWaste } from './rules/detectSeatWaste';
import { detectRedundancy } from './rules/detectRedundancy';
import { detectPlanMismatch } from './rules/detectPlanMismatch';
import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

/**
 * Executes the complete financial auditing engine logic.
 */
export function runAuditEngine(state: AuditState): AuditResults {
  let currentTotalMonthly = 0;

  const activeTools = Object.entries(state.tools).filter(
    ([_, meta]) => meta.enabled
  );

  // 1. Baseline spend calculation
  for (const [id, meta] of activeTools) {
    const toolId = id as AIToolId;

    if (toolId === 'anthropic_api' || toolId === 'openai_api') {
      currentTotalMonthly += meta.monthlySpend;
    } else {
      const perSeatCost = COST_MATRIX[toolId]?.[meta.plan] ?? 20;
      currentTotalMonthly += perSeatCost * meta.seats;
    }
  }

  // 2. Run all audit rules
  const allRules = [
    detectRedundancy,
    detectSeatWaste,
    detectPlanMismatch,
    detectCreditsOpportunity,
  ];

  const seen = new Set<string>();
  const ruleInsightsAll: OptimizationInsight[] = [];

  for (const rule of allRules) {
    const ruleInsights = rule(state);

    for (const insight of ruleInsights) {
      if (!insight.id) continue;
      if (seen.has(insight.id)) continue;

      seen.add(insight.id);
      ruleInsightsAll.push(insight);
    }
  }

  // 3. REDUNDANCY-FIRST FILTER (fixes Copilot/Cursor conflict issue)
  const redundantTools = new Set<string>(
    ruleInsightsAll
      .filter(i => i.type === 'redundancy')
      .map(i => i.toolId)
  );

  const filteredInsights = ruleInsightsAll.filter((insight) => {
    // always keep redundancy itself
    if (insight.type === 'redundancy') return true;

    // if tool is fully redundant → ignore all other optimizations
    if (redundantTools.has(insight.toolId)) return false;

    return true;
  });

  // 4. Resolve best per tool (after filtering)
  const bestInsightPerTool = new Map<string, OptimizationInsight>();

  for (const insight of filteredInsights) {
    const existing = bestInsightPerTool.get(insight.toolId);

    if (
      !existing ||
      (insight.potentialSavings ?? 0) > (existing.potentialSavings ?? 0)
    ) {
      bestInsightPerTool.set(insight.toolId, insight);
    }
  }

  const finalInsights = Array.from(bestInsightPerTool.values());

  // 5. Compute total savings safely
  let totalSavings = 0;

  for (const insight of finalInsights) {
    const savings = insight.potentialSavings ?? 0;
    if (savings > 0) {
      totalSavings += savings;
    }
  }

  // 6. Realism cap (prevents inflated claims)
  totalSavings = Math.min(totalSavings, currentTotalMonthly * 0.7);

  const optimizedTotalMonthly = currentTotalMonthly - totalSavings;

  return {
    currentTotalMonthly: Math.round(currentTotalMonthly),
    optimizedTotalMonthly: Math.max(0, Math.round(optimizedTotalMonthly)),
    totalMonthlySavings: Math.round(Math.max(0, totalSavings)),
    insights: finalInsights,
  };
}