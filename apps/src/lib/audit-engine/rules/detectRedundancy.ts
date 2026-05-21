import { AuditState } from '@/hooks/useAuditStore';
import { COST_MATRIX } from '@/lib/pricing/pricingData';
import { OptimizationInsight } from '@/types/audit';

export function detectRedundancy(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];

  if (state.tools.cursor.enabled && state.tools.copilot.enabled) {
    const copilotCost =
      (COST_MATRIX.copilot[state.tools.copilot.plan] || 10) *
      state.tools.copilot.seats;

    insights.push({
      toolId: 'copilot',
      type: 'redundancy',
      severity: 'critical',
      message:
        'Your team is paying for both Cursor and GitHub Copilot. Cursor already provides advanced AI-assisted coding workflows.',
      potentialSavings: copilotCost,
    });
  }

  return insights;
}