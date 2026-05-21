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

export function runAuditEngine(
  state: AuditState
): AuditResults {
  let currentTotalMonthly = 0;

  const insights: OptimizationInsight[] = [];

  const activeTools = Object.entries(
    state.tools
  ).filter(([_, meta]) => meta.enabled);

  // 1. Calculate Current Spend Baseline
  activeTools.forEach(([id, meta]) => {
    const toolId = id as AIToolId;

    if (
      toolId === 'anthropic_api' ||
      toolId === 'openai_api'
    ) {
      currentTotalMonthly += meta.monthlySpend;
    } else {
      const perSeatCost =
        COST_MATRIX[toolId][meta.plan] || 20;

      currentTotalMonthly +=
        perSeatCost * meta.seats;
    }
  });

  // 2. Run Audit Rules

  const redundancyInsights =
    detectRedundancy(state);

  const seatWasteInsights =
    detectSeatWaste(state);

  const planMismatchInsights =
    detectPlanMismatch(state);

  const creditsInsights =
    detectCreditsOpportunity(state);

  insights.push(
    ...redundancyInsights,
    ...seatWasteInsights,
    ...planMismatchInsights,
    ...creditsInsights
  );

  // 3. Aggregate Savings Safely

  let totalSavings = 0;

  insights.forEach((insight) => {
    totalSavings += insight.potentialSavings;
  });

  // Prevent unrealistic optimization claims
  totalSavings = Math.min(
    totalSavings,
    currentTotalMonthly * 0.7
  );

  const optimizedTotalMonthly =
    currentTotalMonthly - totalSavings;

  return {
    currentTotalMonthly: Math.round(
      currentTotalMonthly
    ),

    optimizedTotalMonthly: Math.max(
      0,
      Math.round(optimizedTotalMonthly)
    ),

    totalMonthlySavings: Math.round(
      Math.max(0, totalSavings)
    ),

    insights,
  };
}