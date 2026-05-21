import { AuditState } from '@/hooks/useAuditStore';
import { COST_MATRIX } from '@/lib/pricing/pricingData';
import { OptimizationInsight } from '@/types/audit';

export function detectPlanMismatch(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];

  // ChatGPT Team -> Plus
  if (
    state.tools.chatgpt.enabled &&
    state.tools.chatgpt.plan === 'Team' &&
    state.tools.chatgpt.seats <= 2
  ) {
    const current =
      COST_MATRIX.chatgpt.Team *
      state.tools.chatgpt.seats;

    const optimized =
      COST_MATRIX.chatgpt.Plus *
      state.tools.chatgpt.seats;

    insights.push({
      toolId: 'chatgpt',
      type: 'tier_mismatch',
      severity: 'warning',
      message:
        'ChatGPT Team may be unnecessary for very small teams without advanced workspace controls.',
      potentialSavings: current - optimized,
    });
  }

  // Cursor Business -> Pro
  if (
    state.tools.cursor.enabled &&
    state.tools.cursor.plan === 'Business' &&
    state.tools.cursor.seats <= 3
  ) {
    const current =
      COST_MATRIX.cursor.Business *
      state.tools.cursor.seats;

    const optimized =
      COST_MATRIX.cursor.Pro *
      state.tools.cursor.seats;

    insights.push({
      toolId: 'cursor',
      type: 'tier_mismatch',
      severity: 'warning',
      message:
        'Cursor Business features may be underutilized for smaller engineering teams.',
      potentialSavings: current - optimized,
    });
  }

  return insights;
}