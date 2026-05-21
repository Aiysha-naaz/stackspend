import { AuditState } from '@/hooks/useAuditStore';
import { OptimizationInsight } from '@/types/audit';

export function detectCreditsOpportunity(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];

  const openAISpend =
    state.tools.openai_api.enabled
      ? state.tools.openai_api.monthlySpend
      : 0;

  const anthropicSpend =
    state.tools.anthropic_api.enabled
      ? state.tools.anthropic_api.monthlySpend
      : 0;

  const totalApiSpend =
    openAISpend + anthropicSpend;

  if (totalApiSpend >= 500) {
    insights.push({
      toolId:
        openAISpend >= anthropicSpend
          ? 'openai_api'
          : 'anthropic_api',

      type: 'tier_mismatch',
      severity: 'critical',

      message:
        'Your API usage volume may qualify for discounted infrastructure credits and committed-use savings.',

      potentialSavings: Math.round(
        totalApiSpend * 0.2
      ),
    });
  }

  return insights;
}