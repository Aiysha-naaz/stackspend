// import { AuditState } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// export function detectRedundancy(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//  if (
//   state.tools.cursor.enabled &&
//   state.tools.copilot.enabled &&
//   state.tools.copilot.seats > 0
// ) {
//     const copilotCost =
//       (COST_MATRIX.copilot[state.tools.copilot.plan] || 10) *
//       state.tools.copilot.seats;

//    insights.push({
//   id: 'copilot-redundancy',
//   toolId: 'copilot',
//   type: 'redundancy',
//   severity: 'critical',
//   message:
//     'Your team is paying for both Cursor and GitHub Copilot. Cursor already provides advanced AI-assisted coding workflows.',
//   potentialSavings: copilotCost,
// });
//   }

//   return insights;
// }



import { AuditState } from '@/hooks/useAuditStore';
import { COST_MATRIX } from '@/lib/pricing/pricingData';
import { OptimizationInsight } from '@/types/audit';

const REDUNDANCY_RULES: Array<{
  a: string;
  b: string;
  message: string;
}> = [
  {
    a: 'cursor',
    b: 'copilot',
    message:
      'Cursor already includes AI coding assistance similar to GitHub Copilot. Running both creates redundant spend.',
  },
  {
    a: 'claude',
    b: 'chatgpt',
    message:
      'Claude and ChatGPT overlap heavily for writing, reasoning, and general assistant workflows.',
  },
];

export function detectRedundancy(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];

  for (const rule of REDUNDANCY_RULES) {
    const toolA = state.tools[rule.a as keyof typeof state.tools];
    const toolB = state.tools[rule.b as keyof typeof state.tools];

    if (!toolA?.enabled || !toolB?.enabled) continue;

    const costB =
      (COST_MATRIX[rule.b as keyof typeof COST_MATRIX]?.[toolB.plan] ||
        0) * toolB.seats;

    insights.push({
      id: `${rule.a}-${rule.b}-redundancy`,
      toolId: rule.b,
      type: 'redundancy',
      severity: 'critical',
      message: rule.message,
      potentialSavings: costB,
    });
  }

  return insights;
}