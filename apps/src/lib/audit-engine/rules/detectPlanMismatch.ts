// import { AuditState } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// export function detectPlanMismatch(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   // ChatGPT Team -> Plus
//   if (
//     state.tools.chatgpt.enabled &&
//     state.tools.chatgpt.plan === 'Team' &&
//     state.tools.chatgpt.seats <= 2
//   ) {
//     const current =
//       COST_MATRIX.chatgpt.Team *
//       state.tools.chatgpt.seats;

//     const optimized =
//       COST_MATRIX.chatgpt.Plus *
//       state.tools.chatgpt.seats;

//    insights.push({
//   id: 'chatgpt-plan-mismatch',
//   toolId: 'chatgpt',
//   type: 'tier_mismatch',
//   severity: 'warning',
//   message:
//     'ChatGPT Team may be unnecessary for very small teams without advanced workspace controls.',
//   potentialSavings: current - optimized,
// });
//   }

//   // Cursor Business -> Pro
//   if (
//     state.tools.cursor.enabled &&
//     state.tools.cursor.plan === 'Business' &&
//     state.tools.cursor.seats <= 3
//   ) {
//     const current =
//       COST_MATRIX.cursor.Business *
//       state.tools.cursor.seats;

//     const optimized =
//       COST_MATRIX.cursor.Pro *
//       state.tools.cursor.seats;

//    insights.push({
//   id: 'cursor-plan-mismatch',
//   toolId: 'cursor',
//   type: 'tier_mismatch',
//   severity: 'warning',
//   message:
//     'Cursor Business features may be underutilized for smaller engineering teams.',
//   potentialSavings: current - optimized,
// });
//   }

//   return insights;
// }





// import { AuditState } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// function safeCost(
//   tool: keyof typeof COST_MATRIX,
//   plan: string
// ): number {
//   const value = COST_MATRIX[tool]?.[plan];
//   return typeof value === 'number' ? value : 0;
// }

// export function detectPlanMismatch(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   const { tools } = state;

//   /**
//    * CHATGPT: Team → Plus downgrade for small teams
//    */
//   if (
//     tools.chatgpt?.enabled &&
//     tools.chatgpt.plan === 'Team' &&
//     tools.chatgpt.seats <= 3
//   ) {
//     const current = safeCost('chatgpt', 'Team') * tools.chatgpt.seats;
//     const optimized = safeCost('chatgpt', 'Plus') * tools.chatgpt.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'chatgpt-plan-mismatch',
//         toolId: 'chatgpt',
//         type: 'tier_mismatch',
//         severity: 'warning',
//         message:
//           'ChatGPT Team is often unnecessary for small teams without workspace governance needs. A Plus-tier setup is more cost-efficient.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   /**
//    * CURSOR: Business → Pro for small teams
//    */
//   if (
//     tools.cursor?.enabled &&
//     tools.cursor.plan === 'Business' &&
//     tools.cursor.seats <= 5
//   ) {
//     const current = safeCost('cursor', 'Business') * tools.cursor.seats;
//     const optimized = safeCost('cursor', 'Pro') * tools.cursor.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'cursor-plan-mismatch',
//         toolId: 'cursor',
//         type: 'tier_mismatch',
//         severity: 'warning',
//         message:
//           'Cursor Business features are typically underutilized in small engineering teams. Pro tier may be sufficient.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   /**
//    * CLAUDE: Team over-provision heuristic
//    */
//   if (
//     tools.claude?.enabled &&
//     tools.claude.plan === 'Team' &&
//     tools.claude.seats <= 3
//   ) {
//     const current = safeCost('claude', 'Team') * tools.claude.seats;
//     const optimized = safeCost('claude', 'Pro') * tools.claude.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'claude-plan-mismatch',
//         toolId: 'claude',
//         type: 'tier_mismatch',
//         severity: 'warning',
//         message:
//           'Claude Team tier may be overkill for small teams. Pro tier often provides sufficient capability.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   return insights;
// }






// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// function safeCost(
//   tool: keyof typeof COST_MATRIX,
//   plan: string
// ): number {
//   const value = COST_MATRIX[tool]?.[plan];
//   return typeof value === 'number' ? value : 0;
// }

// export function detectPlanMismatch(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];
//   const { tools } = state;

//   if (
//     tools.chatgpt?.enabled &&
//     tools.chatgpt.plan === 'Team' &&
//     tools.chatgpt.seats <= 3
//   ) {
//     const current =
//       safeCost('chatgpt', 'Team') * tools.chatgpt.seats;
//     const optimized =
//       safeCost('chatgpt', 'Plus') * tools.chatgpt.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'chatgpt-plan-mismatch',
//         toolId: 'chatgpt',
//         type: 'plan_mismatch',
//         severity: 'warning',
//         message:
//           'ChatGPT Team is unnecessary for small teams without governance needs.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   if (
//     tools.cursor?.enabled &&
//     tools.cursor.plan === 'Business' &&
//     tools.cursor.seats <= 5
//   ) {
//     const current =
//       safeCost('cursor', 'Business') * tools.cursor.seats;
//     const optimized =
//       safeCost('cursor', 'Pro') * tools.cursor.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'cursor-plan-mismatch',
//         toolId: 'cursor',
//         type: 'plan_mismatch',
//         severity: 'warning',
//         message:
//           'Cursor Business is overkill for small teams. Pro is sufficient.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   if (
//     tools.claude?.enabled &&
//     tools.claude.plan === 'Team' &&
//     tools.claude.seats <= 3
//   ) {
//     const current =
//       safeCost('claude', 'Team') * tools.claude.seats;
//     const optimized =
//       safeCost('claude', 'Pro') * tools.claude.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'claude-plan-mismatch',
//         toolId: 'claude',
//         type: 'plan_mismatch',
//         severity: 'warning',
//         message:
//           'Claude Team is overkill for small teams. Pro is sufficient.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   return insights;
// }




// import { AuditState } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// function safeCost(
//   tool: keyof typeof COST_MATRIX,
//   plan: string
// ): number {
//   const value = COST_MATRIX[tool]?.[plan];
//   return typeof value === 'number' ? value : 0;
// }

// export function detectPlanMismatch(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   const { tools } = state;

//   if (
//     tools.chatgpt?.enabled &&
//     tools.chatgpt.plan === 'Team' &&
//     tools.chatgpt.seats <= 3
//   ) {
//     const current =
//       safeCost('chatgpt', 'Team') * tools.chatgpt.seats;
//     const optimized =
//       safeCost('chatgpt', 'Plus') * tools.chatgpt.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'chatgpt-plan-mismatch',
//         toolId: 'chatgpt',
//         type: 'tier_mismatch',
//         severity: 'warning',
//         message:
//           'ChatGPT Team is unnecessary for small teams without governance needs.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   if (
//     tools.cursor?.enabled &&
//     tools.cursor.plan === 'Business' &&
//     tools.cursor.seats <= 5
//   ) {
//     const current =
//       safeCost('cursor', 'Business') * tools.cursor.seats;
//     const optimized =
//       safeCost('cursor', 'Pro') * tools.cursor.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'cursor-plan-mismatch',
//         toolId: 'cursor',
//         type: 'tier_mismatch',
//         severity: 'warning',
//         message:
//           'Cursor Business is overkill for small teams. Pro is sufficient.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   if (
//     tools.claude?.enabled &&
//     tools.claude.plan === 'Team' &&
//     tools.claude.seats <= 3
//   ) {
//     const current =
//       safeCost('claude', 'Team') * tools.claude.seats;
//     const optimized =
//       safeCost('claude', 'Pro') * tools.claude.seats;

//     if (current > optimized) {
//       insights.push({
//         id: 'claude-plan-mismatch',
//         toolId: 'claude',
//         type: 'tier_mismatch',
//         severity: 'warning',
//         message:
//           'Claude Team is overkill for small teams. Pro is sufficient.',
//         potentialSavings: current - optimized,
//       });
//     }
//   }

//   return insights;
// }



import { AuditState, AIToolId } from '@/hooks/useAuditStore';
import { COST_MATRIX } from '@/lib/pricing/pricingData';
import { OptimizationInsight } from '@/types/audit';

function safeCost(tool: AIToolId, plan: string): number {
  const value = COST_MATRIX[tool]?.[plan];
  return typeof value === 'number' ? value : 0;
}

type PlanRule = {
  tool: AIToolId;
  currentPlan: string;
  alternativePlan: string;
  maxSeats: number;
  message: string;
};

const RULES: PlanRule[] = [
  {
    tool: 'chatgpt',
    currentPlan: 'Team',
    alternativePlan: 'Plus',
    maxSeats: 5,
    message:
      'ChatGPT Team is unnecessary for small teams without collaboration or governance needs.',
  },
  {
    tool: 'cursor',
    currentPlan: 'Business',
    alternativePlan: 'Pro',
    maxSeats: 8,
    message:
      'Cursor Business is overkill for small teams without enterprise requirements.',
  },
  {
    tool: 'claude',
    currentPlan: 'Team',
    alternativePlan: 'Pro',
    maxSeats: 5,
    message:
      'Claude Team adds collaboration features that are often unnecessary for small teams.',
  },
];

export function detectPlanMismatch(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];
  const { tools, primaryUseCase } = state;

  for (const rule of RULES) {
    const tool = tools[rule.tool];

    if (!tool?.enabled) continue;
    if (tool.plan !== rule.currentPlan) continue;

    // optional simple context filter (no heuristics)
    if (primaryUseCase === 'coding' && rule.tool === 'chatgpt') {
      continue;
    }

    if (tool.seats > rule.maxSeats) continue;

    const currentCost =
      safeCost(rule.tool, rule.currentPlan) * tool.seats;

    const optimizedCost =
      safeCost(rule.tool, rule.alternativePlan) * tool.seats;

    if (optimizedCost >= currentCost) continue;

    const savings = currentCost - optimizedCost;

    insights.push({
      id: `${rule.tool}-plan-mismatch`,
      toolId: rule.tool,
      type: 'tier_mismatch',
      severity: 'warning',
      message: rule.message,
      potentialSavings: Math.round(savings),
    });
  }

  return insights;
}