// import { AuditState } from '@/hooks/useAuditStore';
// import { OptimizationInsight } from '@/types/audit';

// export function detectCreditsOpportunity(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   const openAISpend = state.tools.openai_api.enabled
//     ? state.tools.openai_api.monthlySpend
//     : 0;

//   const anthropicSpend = state.tools.anthropic_api.enabled
//     ? state.tools.anthropic_api.monthlySpend
//     : 0;

//   const totalApiSpend = openAISpend + anthropicSpend;

//   if (totalApiSpend <= 0) return insights;

//   if (totalApiSpend >= 500) {
//     insights.push({
//       id: 'api-credits-opportunity',
//       toolId:
//         openAISpend >= anthropicSpend
//           ? 'openai_api'
//           : 'anthropic_api',

//       type: 'tier_mismatch',
//       severity: 'critical',

//       message:
//         'Your API usage volume may qualify for discounted infrastructure credits and committed-use savings.',

//       potentialSavings: Math.round(totalApiSpend * 0.2),
//     });
//   }

//   return insights;
// }





// import { AuditState } from '@/hooks/useAuditStore';
// import { OptimizationInsight } from '@/types/audit';

// export function detectCreditsOpportunity(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   const openAISpend = state.tools.openai_api.enabled
//     ? state.tools.openai_api.monthlySpend
//     : 0;

//   const anthropicSpend = state.tools.anthropic_api.enabled
//     ? state.tools.anthropic_api.monthlySpend
//     : 0;

//   const totalApiSpend = openAISpend + anthropicSpend;

//   if (totalApiSpend <= 0) return insights;

//   if (totalApiSpend >= 500) {
//     insights.push({
//       id: 'api-credits-opportunity',
//       toolId:
//         openAISpend >= anthropicSpend
//           ? 'openai_api'
//           : 'anthropic_api',
//       type: 'credits_opportunity', // ✅ FIXED
//       severity: 'critical',
//       message:
//         'Your API usage volume may qualify for discounted infrastructure credits and committed-use savings.',
//       potentialSavings: Math.round(totalApiSpend * 0.2),
//     });
//   }

//   return insights;
// }





// import { AuditState } from '@/hooks/useAuditStore';
// import { OptimizationInsight } from '@/types/audit';

// export function detectCreditsOpportunity(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   const openAISpend = state.tools.openai_api.enabled
//     ? state.tools.openai_api.monthlySpend
//     : 0;

//   const anthropicSpend = state.tools.anthropic_api.enabled
//     ? state.tools.anthropic_api.monthlySpend
//     : 0;

//   const totalApiSpend = openAISpend + anthropicSpend;

//   if (totalApiSpend <= 0) return insights;

//   if (totalApiSpend >= 500) {
//     insights.push({
//       id: 'api-credits-opportunity',
//       toolId:
//         openAISpend >= anthropicSpend
//           ? 'openai_api'
//           : 'anthropic_api',
//       type: 'credits_opportunity',
//       severity: 'critical',
//       message:
//         'High API usage may qualify for credits or committed-use discounts.',
//       potentialSavings: Math.round(totalApiSpend * 0.2),
//     });
//   }

//   return insights;
// }



import { AuditState } from '@/hooks/useAuditStore';
import { OptimizationInsight } from '@/types/audit';

export function detectCreditsOpportunity(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];

  const openAI = state.tools.openai_api;
  const anthropic = state.tools.anthropic_api;

  const openAISpend = openAI?.enabled ? openAI.monthlySpend : 0;
  const anthropicSpend = anthropic?.enabled ? anthropic.monthlySpend : 0;

  const totalSpend = openAISpend + anthropicSpend;

  if (totalSpend <= 0) return insights;

  // dominance: which provider is primary
  const dominantShare =
    Math.max(openAISpend, anthropicSpend) / totalSpend;

  // scaling tiers instead of flat threshold
  let baseMultiplier = 0;

  if (totalSpend >= 1500) baseMultiplier = 0.35;
  else if (totalSpend >= 800) baseMultiplier = 0.25;
  else if (totalSpend >= 500) baseMultiplier = 0.15;
  else return insights;

  // concentration increases credit opportunity likelihood
  const concentrationFactor = 0.5 + dominantShare;

  const savings = totalSpend * baseMultiplier * concentrationFactor;

  const toolId =
    openAISpend >= anthropicSpend ? 'openai_api' : 'anthropic_api';

  const confidence = Math.min(1, concentrationFactor * baseMultiplier * 2);

  insights.push({
    id: 'api-credits-opportunity',
    toolId,
    type: 'credits_opportunity',
    severity: totalSpend >= 1500 ? 'critical' : 'warning',
    message:
      dominantShare > 0.7
        ? 'API spend is highly concentrated in one provider, increasing eligibility for committed-use discounts or credits.'
        : 'Multi-provider API spend may qualify for consolidated credits or volume-based discounts.',
    potentialSavings: Math.round(savings),
   // @ts-expect-error confidence not yet added to type
    confidence,
  });

  return insights;
}