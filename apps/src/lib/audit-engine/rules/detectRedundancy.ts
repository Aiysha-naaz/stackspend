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



// import { AuditState } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// const REDUNDANCY_RULES: Array<{
//   a: string;
//   b: string;
//   message: string;
// }> = [
//   {
//     a: 'cursor',
//     b: 'copilot',
//     message:
//       'Cursor already includes AI coding assistance similar to GitHub Copilot. Running both creates redundant spend.',
//   },
//   {
//     a: 'claude',
//     b: 'chatgpt',
//     message:
//       'Claude and ChatGPT overlap heavily for writing, reasoning, and general assistant workflows.',
//   },
// ];

// export function detectRedundancy(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   for (const rule of REDUNDANCY_RULES) {
//     const toolA = state.tools[rule.a as keyof typeof state.tools];
//     const toolB = state.tools[rule.b as keyof typeof state.tools];

//     if (!toolA?.enabled || !toolB?.enabled) continue;

//     const costB =
//       (COST_MATRIX[rule.b as keyof typeof COST_MATRIX]?.[toolB.plan] ||
//         0) * toolB.seats;

//     insights.push({
//       id: `${rule.a}-${rule.b}-redundancy`,
//       toolId: rule.b,
//       type: 'redundancy',
//       severity: 'critical',
//       message: rule.message,
//       potentialSavings: costB,
//     });
//   }

//   return insights;
// }




// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// type RedundancyRule = {
//   a: AIToolId;
//   b: AIToolId;
//   message: string;
// };

// const REDUNDANCY_RULES: RedundancyRule[] = [
//   {
//     a: 'cursor',
//     b: 'copilot',
//     message:
//       'Cursor already includes AI coding assistance similar to GitHub Copilot. Running both creates redundant spend.',
//   },
//   {
//     a: 'claude',
//     b: 'chatgpt',
//     message:
//       'Claude and ChatGPT overlap heavily for writing, reasoning, and general assistant workflows.',
//   },
// ];

// export function detectRedundancy(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   for (const rule of REDUNDANCY_RULES) {
//     const toolA = state.tools[rule.a];
//     const toolB = state.tools[rule.b];

//     if (!toolA?.enabled || !toolB?.enabled) continue;

//     const costB =
//       (COST_MATRIX[rule.b]?.[toolB.plan] || 0) * toolB.seats;

//     insights.push({
//       id: `${rule.a}-${rule.b}-redundancy`,
//       toolId: rule.b,
//       type: 'redundancy',
//       severity: 'critical',
//       message: rule.message,
//       potentialSavings: costB,
//     });
//   }

//   return insights;
// }




// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// type RedundancyRule = {
//   a: AIToolId;
//   b: AIToolId;
//   message: string;
// };

// const REDUNDANCY_RULES: RedundancyRule[] = [
//   {
//     a: 'cursor',
//     b: 'copilot',
//     message:
//       'Cursor already includes AI coding assistance similar to GitHub Copilot.',
//   },
//   {
//     a: 'claude',
//     b: 'chatgpt',
//     message:
//       'Claude and ChatGPT overlap heavily for general assistant workflows.',
//   },
// ];

// export function detectRedundancy(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   for (const rule of REDUNDANCY_RULES) {
//     const toolA = state.tools[rule.a];
//     const toolB = state.tools[rule.b];

//     if (!toolA?.enabled || !toolB?.enabled) continue;

//     const costB =
//       (COST_MATRIX[rule.b]?.[toolB.plan] || 0) * toolB.seats;

//     insights.push({
//       id: `${rule.a}-${rule.b}-redundancy`,
//       toolId: rule.b,
//       type: 'redundancy',
//       severity: 'critical',
//       message: rule.message,
//       potentialSavings: costB,
//     });
//   }

//   return insights;
// }







// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { OptimizationInsight } from '@/types/audit';

// type RedundancyRule = {
//   a: AIToolId;
//   b: AIToolId;
//   message: string;
// };

// const REDUNDANCY_RULES: RedundancyRule[] = [
//   {
//     a: 'cursor',
//     b: 'copilot',
//     message:
//       'Cursor already includes AI coding assistance similar to GitHub Copilot.',
//   },
//   {
//     a: 'claude',
//     b: 'chatgpt',
//     message:
//       'Claude and ChatGPT overlap heavily for general assistant workflows.',
//   },
// ];

// // export function detectRedundancy(
// //   state: AuditState
// // ): OptimizationInsight[] {
// //   const insights: OptimizationInsight[] = [];

// //   for (const rule of REDUNDANCY_RULES) {
// //     const toolA = state.tools[rule.a];
// //     const toolB = state.tools[rule.b];

// //     if (!toolA?.enabled || !toolB?.enabled) continue;

// //     const costA =
// //       (COST_MATRIX[rule.a]?.[toolA.plan] || 0) * toolA.seats;

// //     const costB =
// //       (COST_MATRIX[rule.b]?.[toolB.plan] || 0) * toolB.seats;

// //     const keepA = costA <= costB;

// //     insights.push({
// //       id: `${rule.a}-${rule.b}-redundancy`,
// //       toolId: keepA ? rule.b : rule.a,
// //       type: 'redundancy',
// //       severity: 'critical',
// //       message: rule.message,
// //       potentialSavings: Math.max(costA, costB) * 0.5,
// //     });
// //   }

// //   return insights;
// // }


// export function detectRedundancy(
//   state: AuditState
// ): OptimizationInsight[] {
//   const insights: OptimizationInsight[] = [];

//   const checkPair = (a: AIToolId, b: AIToolId, message: string) => {
//     const toolA = state.tools[a];
//     const toolB = state.tools[b];

//     if (!toolA?.enabled || !toolB?.enabled) return;

//     const costA =
//       (COST_MATRIX[a]?.[toolA.plan] || 0) * toolA.seats;

//     const costB =
//       (COST_MATRIX[b]?.[toolB.plan] || 0) * toolB.seats;

//     // 🔥 KEY FIX: detect overlap even if costs differ slightly
//     const overlapScore =
//       toolA.seats > 0 && toolB.seats > 0;

//     if (!overlapScore) return;

//     const worseTool = costA >= costB ? a : b;
//     const savings = Math.abs(costA - costB);

//     if (savings < 10) return; // ignore noise

//     insights.push({
//       id: `${a}-${b}-redundancy`,
//       toolId: worseTool,
//       type: 'redundancy',
//       severity: 'critical',
//       message,
//       potentialSavings: savings * 0.6,
//     });
//   };

//   checkPair(
//     'cursor',
//     'copilot',
//     'Cursor and GitHub Copilot overlap significantly in AI coding workflows.'
//   );

//   checkPair(
//     'claude',
//     'chatgpt',
//     'Claude and ChatGPT overlap heavily for general reasoning and writing tasks.'
//   );

//   return insights;
// }






import { AuditState, AIToolId } from '@/hooks/useAuditStore';
import { COST_MATRIX } from '@/lib/pricing/pricingData';
import { OptimizationInsight } from '@/types/audit';

type RedundancyRule = {
  a: AIToolId;
  b: AIToolId;
  overlap: {
    coding?: boolean;
    writing?: boolean;
    research?: boolean;
    data?: boolean;
    mixed?: boolean;
  };
  message: string;
};

// Context-aware rules (keep simple)
const REDUNDANCY_RULES: RedundancyRule[] = [
  {
    a: 'cursor',
    b: 'copilot',
    overlap: {
      coding: true,
      mixed: true,
    },
    message:
      'Cursor and GitHub Copilot overlap in AI-assisted coding workflows.',
  },
  {
    a: 'claude',
    b: 'chatgpt',
    overlap: {
      writing: true,
      research: true,
      mixed: true,
    },
    message:
      'Claude and ChatGPT overlap in general reasoning and writing tasks.',
  },
];

function getCost(tool: AIToolId, plan: string, seats: number) {
  return (COST_MATRIX[tool]?.[plan] || 0) * seats;
}

export function detectRedundancy(
  state: AuditState
): OptimizationInsight[] {
  const insights: OptimizationInsight[] = [];

  const useCase = state.primaryUseCase;

  for (const rule of REDUNDANCY_RULES) {
    const toolA = state.tools[rule.a];
    const toolB = state.tools[rule.b];

    if (!toolA?.enabled || !toolB?.enabled) continue;

    // if (
    //   useCase !== 'mixed' &&
    //   !rule.overlap[useCase as keyof typeof rule.overlap]
    // ) {
    //   continue;
    // }

    const isRelevantUseCase =
  useCase === 'mixed' ||
  Object.values(rule.overlap).includes(true);

if (!isRelevantUseCase) continue;

    const costA = getCost(rule.a, toolA.plan, toolA.seats);
    const costB = getCost(rule.b, toolB.plan, toolB.seats);

    const totalCost = costA + costB;
    if (totalCost <= 0) continue;

    const savings = Math.min(costA, costB);
    const savingsRatio = savings / totalCost;

    if (savingsRatio < 0.15) continue;

    const worseTool = costA >= costB ? rule.a : rule.b;

    const severity: 'warning' | 'critical' =
      savingsRatio > 0.4 ? 'critical' : 'warning';

    insights.push({
      id: `redundancy-${rule.a}-${rule.b}`,
      toolId: worseTool,
      type: 'redundancy',
      severity,
      message: `${rule.message} (${Math.round(
        savingsRatio * 100
      )}% overlap detected)`,
      potentialSavings: Math.round(savings),
    });
  }

  return insights;
}