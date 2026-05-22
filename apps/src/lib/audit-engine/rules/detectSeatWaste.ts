// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// export function detectSeatWaste(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   activeTools.forEach(([id, meta]) => {
//     const toolId = id as AIToolId;

//     if (
//       toolId !== 'anthropic_api' &&
//       toolId !== 'openai_api' &&
//       meta.seats > state.teamSize
//     ) {
//       const difference = meta.seats - state.teamSize;

//       const perSeatCost =
//         COST_MATRIX[toolId]?.[meta.plan] ?? 20;

//       const wastage = perSeatCost * difference;

//       if (wastage > 0) {
//        insights.push({
//   id: `${toolId}-seat-waste`,
//   toolId,
//   type: 'tier_mismatch',
//   severity: 'warning',
//   message: `${toolId} is over-provisioned: ${meta.seats} seats for ${state.teamSize} users (${difference} unused seats).`,
//   potentialSavings: wastage,
// });
//       }
//     }
//   });

//   return insights;
// }



// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// export function detectSeatWaste(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   const teamSize = state.teamSize;

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   for (const [id, meta] of activeTools) {
//     const toolId = id as AIToolId;

//     // skip API tools
//     if (toolId === 'anthropic_api' || toolId === 'openai_api') continue;

//     const extraSeats = meta.seats - teamSize;

//     if (extraSeats <= 0) continue;

//     const perSeatCost = COST_MATRIX[toolId]?.[meta.plan] ?? 20;
//     const wastage = perSeatCost * extraSeats;

//     if (wastage <= 0) continue;

//     insights.push({
//       id: `${toolId}-seat-waste`,
//       toolId,
//       type: 'tier_mismatch',
//       severity: 'warning',
//       message: `${toolId} is over-provisioned: ${meta.seats} seats for ${teamSize} users (${extraSeats} unused seats).`,
//       potentialSavings: wastage,
//     });
//   }

//   return insights;
// }




import {
  AuditState,
  AIToolId,
} from '@/hooks/useAuditStore';

import { COST_MATRIX } from '@/lib/pricing/pricingData';

import { OptimizationInsight } from '@/types/audit';

export function detectSeatWaste(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];

  const teamSize = state.teamSize;

  const activeTools = Object.entries(
    state.tools
  ).filter(([_, meta]) => meta.enabled);

  for (const [id, meta] of activeTools) {
    const toolId = id as AIToolId;

    // Skip API tools
    if (
      toolId === 'anthropic_api' ||
      toolId === 'openai_api'
    ) {
      continue;
    }

    const extraSeats =
      meta.seats - teamSize;

    if (extraSeats <= 0) continue;

    const perSeatCost =
      COST_MATRIX[toolId]?.[meta.plan] ??
      20;

    const wastage =
      perSeatCost * extraSeats;

    if (wastage <= 0) continue;

    // Better display names
    const formattedTool =
  toolId === 'chatgpt'
    ? 'ChatGPT'
    : toolId === 'copilot'
    ? 'GitHub Copilot'
    : toolId === 'v0'
    ? 'v0'
    : toolId.charAt(0).toUpperCase() +
      toolId.slice(1);
    insights.push({
      id: `${toolId}-seat-waste`,
      toolId,

      type: 'tier_mismatch',

      severity: 'warning',

      message: `${formattedTool} is over-provisioned: ${meta.seats} seats for ${teamSize} users (${extraSeats} unused seats).`,

      potentialSavings: wastage,
    });
  }

  return insights;
}