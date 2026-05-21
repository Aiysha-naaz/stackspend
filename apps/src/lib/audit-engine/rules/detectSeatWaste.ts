import { AuditState, AIToolId } from '@/hooks/useAuditStore';
import { COST_MATRIX } from '@/lib/pricing/pricingData';
import { OptimizationInsight } from '@/types/audit';

export function detectSeatWaste(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];

  const activeTools = Object.entries(state.tools).filter(
    ([_, meta]) => meta.enabled
  );

  activeTools.forEach(([id, meta]) => {
    const toolId = id as AIToolId;

    if (
      toolId !== 'anthropic_api' &&
      toolId !== 'openai_api' &&
      meta.seats > state.teamSize
    ) {
      const difference = meta.seats - state.teamSize;

      const perSeatCost =
        COST_MATRIX[toolId][meta.plan] || 20;

      const wastage = perSeatCost * difference;

      if (wastage > 0) {
        insights.push({
          toolId,
          type: 'tier_mismatch',
          severity: 'warning',
          message: `Allocated seat count (${meta.seats}) exceeds your core team size (${state.teamSize}). You are maintaining ${difference} empty unused seats.`,
          potentialSavings: wastage,
        });
      }
    }
  });

  return insights;
}