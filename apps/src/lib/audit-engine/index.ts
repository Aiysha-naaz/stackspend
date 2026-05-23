// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import {
//   AuditResults,
//   OptimizationInsight,
// } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// export function runAuditEngine(state: AuditState): AuditResults {
//   let currentTotalMonthly = 0;
//   const insights: OptimizationInsight[] = [];

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   // 1. Baseline spend
//   activeTools.forEach(([id, meta]) => {
//     const toolId = id as AIToolId;

//     if (toolId === 'anthropic_api' || toolId === 'openai_api') {
//       currentTotalMonthly += meta.monthlySpend;
//     } else {
//       const perSeatCost = COST_MATRIX[toolId][meta.plan] || 20;
//       currentTotalMonthly += perSeatCost * meta.seats;
//     }
//   });

//   // 2. Run rules
//   const allRules = [
//     detectRedundancy,
//     detectSeatWaste,
//     detectPlanMismatch,
//     detectCreditsOpportunity,
//   ];

//   const seen = new Set<string>();

//   allRules.forEach((rule) => {
//     const ruleInsights = rule(state);

//     for (const insight of ruleInsights) {
//       if (seen.has(insight.id)) continue;
//       seen.add(insight.id);

//       insights.push(insight);
//     }
//   });

//   // 3. Safe savings aggregation
//   let totalSavings = 0;

//   for (const insight of insights) {
//     totalSavings += insight.potentialSavings;
//   }

//   // 4. Hard safety cap (prevents nonsense outputs)
//   totalSavings = Math.min(totalSavings, currentTotalMonthly * 0.7);

//   const optimizedTotalMonthly = currentTotalMonthly - totalSavings;

//   return {
//     currentTotalMonthly: Math.round(currentTotalMonthly),

//     optimizedTotalMonthly: Math.max(0, Math.round(optimizedTotalMonthly)),

//     totalMonthlySavings: Math.round(Math.max(0, totalSavings)),

//     insights,
//   };
// }




// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import {
//   AuditResults,
//   OptimizationInsight,
// } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// /**
//  * Executes the complete financial auditing engine logic.
//  */
// export function runAuditEngine(state: AuditState): AuditResults {
//   let currentTotalMonthly = 0;

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   // 1. Baseline spend calculation
//   for (const [id, meta] of activeTools) {
//     const toolId = id as AIToolId;

//     if (toolId === 'anthropic_api' || toolId === 'openai_api') {
//       currentTotalMonthly += meta.monthlySpend;
//     } else {
//       const perSeatCost = COST_MATRIX[toolId]?.[meta.plan] ?? 20;
//       currentTotalMonthly += perSeatCost * meta.seats;
//     }
//   }

//   // 2. Run all audit rules
//   const allRules = [
//     detectRedundancy,
//     detectSeatWaste,
//     detectPlanMismatch,
//     detectCreditsOpportunity,
//   ];

//   const seen = new Set<string>();
//   const ruleInsightsAll: OptimizationInsight[] = [];

//   for (const rule of allRules) {
//     const ruleInsights = rule(state);

//     for (const insight of ruleInsights) {
//       if (!insight.id) continue;
//       if (seen.has(insight.id)) continue;

//       seen.add(insight.id);
//       ruleInsightsAll.push(insight);
//     }
//   }

//   // 3. REDUNDANCY-FIRST FILTER (fixes Copilot/Cursor conflict issue)
//   const redundantTools = new Set<string>(
//     ruleInsightsAll
//       .filter(i => i.type === 'redundancy')
//       .map(i => i.toolId)
//   );

//   const filteredInsights = ruleInsightsAll.filter((insight) => {
//     // always keep redundancy itself
//     if (insight.type === 'redundancy') return true;

//     // if tool is fully redundant → ignore all other optimizations
//     if (redundantTools.has(insight.toolId)) return false;

//     return true;
//   });

//   // 4. Resolve best per tool (after filtering)
//   const bestInsightPerTool = new Map<string, OptimizationInsight>();

//   for (const insight of filteredInsights) {
//     const existing = bestInsightPerTool.get(insight.toolId);

//     if (
//       !existing ||
//       (insight.potentialSavings ?? 0) > (existing.potentialSavings ?? 0)
//     ) {
//       bestInsightPerTool.set(insight.toolId, insight);
//     }
//   }

//   const finalInsights = Array.from(bestInsightPerTool.values());

//   // 5. Compute total savings safely
//   let totalSavings = 0;

//   for (const insight of finalInsights) {
//     const savings = insight.potentialSavings ?? 0;
//     if (savings > 0) {
//       totalSavings += savings;
//     }
//   }

//   // 6. Realism cap (prevents inflated claims)
//   totalSavings = Math.min(totalSavings, currentTotalMonthly * 0.7);

//   const optimizedTotalMonthly = currentTotalMonthly - totalSavings;

//   return {
//     currentTotalMonthly: Math.round(currentTotalMonthly),
//     optimizedTotalMonthly: Math.max(0, Math.round(optimizedTotalMonthly)),
//     totalMonthlySavings: Math.round(Math.max(0, totalSavings)),
//     insights: finalInsights,
//   };
// }










// import {
//   AuditState,
//   AIToolId,
// } from '@/hooks/useAuditStore';

// import { COST_MATRIX } from '@/lib/pricing/pricingData';

// import {
//   AuditResults,
//   OptimizationInsight,
// } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// /**
//  * Executes the complete audit engine.
//  */
// export function runAuditEngine(
//   state: AuditState
// ): AuditResults {
//   let currentTotalMonthly = 0;

//   const insights: OptimizationInsight[] = [];

//   const activeTools = Object.entries(
//     state.tools
//   ).filter(([_, meta]) => meta.enabled);

//   /**
//    * 1. Baseline spend calculation
//    */
//   for (const [id, meta] of activeTools) {
//     const toolId = id as AIToolId;

//     // API tools use direct spend input
//     if (
//       toolId === 'anthropic_api' ||
//       toolId === 'openai_api'
//     ) {
//       currentTotalMonthly +=
//         meta.monthlySpend;

//       continue;
//     }

//     const perSeatCost =
//       COST_MATRIX[toolId]?.[meta.plan];

//     // invalid pricing safety
//     if (
//       typeof perSeatCost !== 'number'
//     ) {
//       continue;
//     }

//     currentTotalMonthly +=
//       perSeatCost * meta.seats;
//   }

//   /**
//    * 2. Run audit rules
//    */
//   const ruleInsights: OptimizationInsight[] =
//     [
//       ...detectRedundancy(state),

//       ...detectSeatWaste(state),

//       ...detectPlanMismatch(state),

//       ...detectCreditsOpportunity(state),
//     ];

//   /**
//    * 3. Deduplicate insights
//    */
//   const seen = new Set<string>();

//   const dedupedInsights =
//     ruleInsights.filter((insight) => {
//       if (!insight.id) {
//         return false;
//       }

//       if (seen.has(insight.id)) {
//         return false;
//       }

//       seen.add(insight.id);

//       return true;
//     });

//   /**
//    * 4. Remove conflicting optimizations
//    * Example:
//    * If Copilot is fully redundant,
//    * don't ALSO show seat waste.
//    */
//   const fullyRedundantTools = new Set(
//     dedupedInsights
//       .filter(
//         (insight) =>
//           insight.type ===
//           'redundancy'
//       )
//       .map((insight) => insight.toolId)
//   );

//   const filteredInsights =
//     dedupedInsights.filter(
//       (insight) => {
//         // always keep redundancy insight
//         if (
//           insight.type ===
//           'redundancy'
//         ) {
//           return true;
//         }

//         // skip lower-priority rules
//         if (
//           fullyRedundantTools.has(
//             insight.toolId
//           )
//         ) {
//           return false;
//         }

//         return true;
//       }
//     );

//   /**
//    * 5. Keep strongest optimization
//    * per tool only
//    */
//   const bestInsightPerTool =
//     new Map<
//       string,
//       OptimizationInsight
//     >();

//   for (const insight of filteredInsights) {
//     const existing =
//       bestInsightPerTool.get(
//         insight.toolId
//       );

//     if (
//       !existing ||
//       insight.potentialSavings >
//         existing.potentialSavings
//     ) {
//       bestInsightPerTool.set(
//         insight.toolId,
//         insight
//       );
//     }
//   }

//   const finalInsights = Array.from(
//     bestInsightPerTool.values()
//   );

//   /**
//    * 6. Calculate total savings
//    */
//   let totalSavings = 0;

//   for (const insight of finalInsights) {
//     if (
//       insight.potentialSavings > 0
//     ) {
//       totalSavings +=
//         insight.potentialSavings;
//     }
//   }

//   /**
//    * 7. Hard realism cap
//    */
//   totalSavings = Math.min(
//     totalSavings,
//     currentTotalMonthly * 0.7
//   );

//   const optimizedTotalMonthly =
//     currentTotalMonthly -
//     totalSavings;

//   return {
//     currentTotalMonthly:
//       Math.round(currentTotalMonthly),

//     optimizedTotalMonthly:
//       Math.max(
//         0,
//         Math.round(
//           optimizedTotalMonthly
//         )
//       ),

//     totalMonthlySavings:
//       Math.round(
//         Math.max(0, totalSavings)
//       ),

//     insights: finalInsights,
//   };
// }






// import {
//   AuditState,
//   AIToolId,
// } from '@/hooks/useAuditStore';

// import { COST_MATRIX } from '@/lib/pricing/pricingData';

// import {
//   AuditResults,
//   OptimizationInsight,
// } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// /**
//  * Executes the complete audit engine.
//  */
// export function runAuditEngine(
//   state: AuditState
// ): AuditResults {
//   let currentTotalMonthly = 0;

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   /**
//    * 1. Baseline spend calculation
//    */
//   for (const [id, meta] of activeTools) {
//     const toolId = id as AIToolId;

//     if (
//       toolId === 'anthropic_api' ||
//       toolId === 'openai_api'
//     ) {
//       currentTotalMonthly += meta.monthlySpend;
//       continue;
//     }

//     const perSeatCost = COST_MATRIX[toolId]?.[meta.plan];

//     if (typeof perSeatCost !== 'number') continue;

//     currentTotalMonthly += perSeatCost * meta.seats;
//   }

//   /**
//    * 2. Run all rules (NO EARLY FILTERING)
//    */
//   let ruleInsights: OptimizationInsight[] = [
//     ...detectRedundancy(state),
//     ...detectSeatWaste(state),
//     ...detectPlanMismatch(state),
//     ...detectCreditsOpportunity(state),
//   ];

//   /**
//    * 3. Remove duplicates only
//    */
//   const seen = new Set<string>();

//   ruleInsights = ruleInsights.filter((insight) => {
//     if (!insight.id) return false;
//     if (seen.has(insight.id)) return false;
//     seen.add(insight.id);
//     return true;
//   });

//   /**
//    * 4. Redundancy-aware filtering (soft, NOT destructive)
//    */
//   const redundantTools = new Set(
//     ruleInsights
//       .filter((i) => i.type === 'redundancy')
//       .map((i) => i.toolId)
//   );

//   const filteredInsights = ruleInsights.filter((insight) => {
//     if (insight.type === 'redundancy') return true;

//     // only suppress SEAT WASTE, not everything
//     if (
//       insight.type === 'seat_waste' &&
//       redundantTools.has(insight.toolId)
//     ) {
//       return false;
//     }

//     return true;
//   });

//   /**
//    * 5. DO NOT collapse per-tool too aggressively
//    * Instead: keep max 2 insights per tool
//    */
//   const perToolMap = new Map<string, OptimizationInsight[]>();

//   for (const insight of filteredInsights) {
//     const list = perToolMap.get(insight.toolId) || [];
//     list.push(insight);
//     perToolMap.set(insight.toolId, list);
//   }

//   const finalInsights = Array.from(perToolMap.values()).flatMap(
//     (insights) =>
//       insights
//         .sort(
//           (a, b) =>
//             (b.potentialSavings ?? 0) -
//             (a.potentialSavings ?? 0)
//         )
//         .slice(0, 2) // keep top 2 per tool
//   );

//   /**
//    * 6. Calculate savings (before caps for realism)
//    */
//   let totalSavings = finalInsights.reduce(
//     (sum, i) => sum + (i.potentialSavings ?? 0),
//     0
//   );

//   /**
//    * 7. Realism cap (soft, not destructive)
//    */
//   const cappedSavings = Math.min(
//     totalSavings,
//     currentTotalMonthly * 0.7
//   );

//   const optimizedTotalMonthly =
//     currentTotalMonthly - cappedSavings;

//   return {
//     currentTotalMonthly: Math.round(currentTotalMonthly),
//     optimizedTotalMonthly: Math.max(0, Math.round(optimizedTotalMonthly)),
//     totalMonthlySavings: Math.round(Math.max(0, cappedSavings)),
//     insights: finalInsights,
//   };
// }







// import {
//   AuditState,
//   AIToolId,
// } from '@/hooks/useAuditStore';

// import { COST_MATRIX } from '@/lib/pricing/pricingData';

// import {
//   AuditResults,
//   OptimizationInsight,
// } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// export function runAuditEngine(
//   state: AuditState
// ): AuditResults {
//   let currentTotalMonthly = 0;

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   // 1. Baseline spend calculation (FIXED)
//   for (const [id, meta] of activeTools) {
//     const toolId = id as AIToolId;

//     if (
//       toolId === 'anthropic_api' ||
//       toolId === 'openai_api'
//     ) {
//       currentTotalMonthly += meta.monthlySpend;
//       continue;
//     }

//     const perSeatCost = COST_MATRIX[toolId]?.[meta.plan];

//     if (typeof perSeatCost !== 'number') continue;

//     currentTotalMonthly += perSeatCost * meta.seats;
//   }

//   // 2. Run rules
//   let ruleInsights: OptimizationInsight[] = [
//     ...detectRedundancy(state),
//     ...detectSeatWaste(state),
//     ...detectPlanMismatch(state),
//     ...detectCreditsOpportunity(state),
//   ];

//   // 3. Deduplicate
//   const seen = new Set<string>();

//   ruleInsights = ruleInsights.filter((insight) => {
//     if (!insight.id) return false;
//     if (seen.has(insight.id)) return false;
//     seen.add(insight.id);
//     return true;
//   });

//   // 4. Redundancy-aware filtering
// //   const redundantTools = new Set(
// //     ruleInsights
// //       .filter((i) => i.type === 'redundancy')
// //       .map((i) => i.toolId)
// //   );

// //   const filteredInsights = ruleInsights.filter((insight) => {
// //     if (insight.type === 'redundancy') return true;

// //     if (
// //   insight.type === 'tier_mismatch' &&
// //   redundantTools.has(insight.toolId)
// // ){
// //       return false;
// //     }

// //     return true;
// //   });
// const filteredInsights = ruleInsights.filter((insight) => {
//   // Always keep redundancy insights
//   if (insight.type === 'redundancy') return true;

//   // Do NOT suppress tier_mismatch anymore (it causes missing UI signals)
//   return true;
// });
//   // 5. Per tool cap
//   const perToolMap = new Map<string, OptimizationInsight[]>();

//   for (const insight of filteredInsights) {
//     const list = perToolMap.get(insight.toolId) || [];
//     list.push(insight);
//     perToolMap.set(insight.toolId, list);
//   }

//   const finalInsights = Array.from(perToolMap.values()).flatMap(
//     (insights) =>
//       insights
//         .sort(
//           (a, b) =>
//             (b.potentialSavings ?? 0) -
//             (a.potentialSavings ?? 0)
//         )
//         .slice(0, 2)
//   );

//   // FIX: prevent redundancy double counting
//   const redundancyTools = new Set(
//     finalInsights
//       .filter(i => i.type === 'redundancy')
//       .map(i => i.toolId)
//   );

//   let totalSavings = finalInsights.reduce((sum, i) => {
//     if (
//       i.type !== 'redundancy' &&
//       redundancyTools.has(i.toolId)
//     ) {
//       return sum;
//     }

//     return sum + (i.potentialSavings ?? 0);
//   }, 0);

//   // 6. realism cap
//   const cappedSavings = Math.min(
//     totalSavings,
//     currentTotalMonthly * 0.7
//   );

//   const optimizedTotalMonthly =
//     currentTotalMonthly - cappedSavings;

//   return {
//     currentTotalMonthly: Math.round(currentTotalMonthly),
//     optimizedTotalMonthly: Math.max(
//       0,
//       Math.round(optimizedTotalMonthly)
//     ),
//     totalMonthlySavings: Math.round(
//       Math.max(0, cappedSavings)
//     ),
//     insights: finalInsights,
//   };
// }





// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { AuditResults, OptimizationInsight } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// export function runAuditEngine(state: AuditState): AuditResults {
//   let currentTotalMonthly = 0;

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   // 1. Baseline spend calculation
//   for (const [id, meta] of activeTools) {
//     const toolId = id as AIToolId;

//     if (toolId === 'anthropic_api' || toolId === 'openai_api') {
//       currentTotalMonthly += meta.monthlySpend;
//       continue;
//     }

//     const perSeatCost = COST_MATRIX[toolId]?.[meta.plan];
//     if (typeof perSeatCost !== 'number') continue;

//     currentTotalMonthly += perSeatCost * meta.seats;
//   }

//   // 2. Run rules
//   let ruleInsights: OptimizationInsight[] = [
//     ...detectRedundancy(state),
//     ...detectSeatWaste(state),
//     ...detectPlanMismatch(state),
//     ...detectCreditsOpportunity(state),
//   ];

//   // 3. Deduplicate by id
//   const seen = new Set<string>();

//   ruleInsights = ruleInsights.filter((insight) => {
//     if (!insight.id) return false;
//     if (seen.has(insight.id)) return false;
//     seen.add(insight.id);
//     return true;
//   });

//   // 4. IMPORTANT FIX:
//   // Do NOT suppress tier_mismatch when redundancy exists.
//   // (This was hiding real signals in UI + reducing insight count)
//   const filteredInsights = ruleInsights;

//   // 5. Cap insights per tool (keep top 2 per tool by savings)
//   const perToolMap = new Map<string, OptimizationInsight[]>();

//   for (const insight of filteredInsights) {
//     const list = perToolMap.get(insight.toolId) || [];
//     list.push(insight);
//     perToolMap.set(insight.toolId, list);
//   }

//   const finalInsights = Array.from(perToolMap.values()).flatMap(
//     (insights) =>
//       insights
//         .sort(
//           (a, b) =>
//             (b.potentialSavings ?? 0) - (a.potentialSavings ?? 0)
//         )
//         .slice(0, 2)
//   );

//   // 6. Avoid double counting redundancy savings
//   const redundancyTools = new Set(
//     finalInsights
//       .filter((i) => i.type === 'redundancy')
//       .map((i) => i.toolId)
//   );

//   const totalSavings = finalInsights.reduce((sum, i) => {
//     if (
//       i.type !== 'redundancy' &&
//       redundancyTools.has(i.toolId)
//     ) {
//       return sum;
//     }

//     return sum + (i.potentialSavings ?? 0);
//   }, 0);

//   // 7. Realism cap (max 70% savings)
//   const cappedSavings = Math.min(
//     totalSavings,
//     currentTotalMonthly * 0.7
//   );

//   const optimizedTotalMonthly =
//     currentTotalMonthly - cappedSavings;

//   return {
//     currentTotalMonthly: Math.round(currentTotalMonthly),
//     optimizedTotalMonthly: Math.max(
//       0,
//       Math.round(optimizedTotalMonthly)
//     ),
//     totalMonthlySavings: Math.round(cappedSavings),
//     insights: finalInsights,
//   };
// }













// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { AuditResults, OptimizationInsight } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// export function runAuditEngine(state: AuditState): AuditResults {
//   let currentTotalMonthly = 0;

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   // 1. Baseline spend calculation (unchanged, correct)
//   for (const [id, meta] of activeTools) {
//     const toolId = id as AIToolId;

//     if (toolId === 'anthropic_api' || toolId === 'openai_api') {
//       currentTotalMonthly += meta.monthlySpend;
//       continue;
//     }

//     const perSeatCost = COST_MATRIX[toolId]?.[meta.plan];
//     if (typeof perSeatCost !== 'number') continue;

//     currentTotalMonthly += perSeatCost * meta.seats;
//   }

//   // 2. Collect insights
//   const ruleInsights: OptimizationInsight[] = [
//     ...detectRedundancy(state),
//     ...detectSeatWaste(state),
//     ...detectPlanMismatch(state),
//     ...detectCreditsOpportunity(state),
//   ];

//   // 3. Deduplicate (stable + safe)
//   const seen = new Set<string>();

//   const uniqueInsights = ruleInsights.filter((i) => {
//     if (!i.id || seen.has(i.id)) return false;
//     seen.add(i.id);
//     return true;
//   });

//   // 4. Apply confidence-aware scoring (NEW FIX)
//   const scoredInsights = uniqueInsights.map((i) => {
//     const confidence = (i as any).confidence ?? 1;

//     return {
//       ...i,
//       weightedSavings: (i.potentialSavings ?? 0) * confidence,
//     };
//   });

//   // 5. Global ranking instead of per-tool slicing (FIXED)
//   const rankedInsights = scoredInsights.sort(
//     (a, b) => b.weightedSavings - a.weightedSavings
//   );

//   // 6. Select top insights globally (not per tool)
//   const finalInsights = rankedInsights.slice(0, 8).map((i) => {
//     const { weightedSavings, ...rest } = i as any;
//     return rest;
//   });

//   // 7. Correct savings aggregation (NO double-count hack)
//   const totalSavings = rankedInsights.reduce(
//     (sum, i) => sum + (i.weightedSavings ?? 0),
//     0
//   );

//   // 8. Realism cap
//   const cappedSavings = Math.min(
//     totalSavings,
//     currentTotalMonthly * 0.7
//   );

//   const optimizedTotalMonthly =
//     currentTotalMonthly - cappedSavings;

//   return {
//     currentTotalMonthly: Math.round(currentTotalMonthly),
//     optimizedTotalMonthly: Math.max(
//       0,
//       Math.round(optimizedTotalMonthly)
//     ),
//     totalMonthlySavings: Math.round(cappedSavings),
//     insights: finalInsights,
//   };
// }








// import { AuditState, AIToolId } from '@/hooks/useAuditStore';
// import { COST_MATRIX } from '@/lib/pricing/pricingData';
// import { AuditResults, OptimizationInsight } from '@/types/audit';

// import { detectSeatWaste } from './rules/detectSeatWaste';
// import { detectRedundancy } from './rules/detectRedundancy';
// import { detectPlanMismatch } from './rules/detectPlanMismatch';
// import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

// export function runAuditEngine(state: AuditState): AuditResults {
//   let currentTotalMonthly = 0;

//   const activeTools = Object.entries(state.tools).filter(
//     ([_, meta]) => meta.enabled
//   );

//   // 1. Baseline spend
//   for (const [id, meta] of activeTools) {
//     const toolId = id as AIToolId;

//     if (toolId === 'anthropic_api' || toolId === 'openai_api') {
//       currentTotalMonthly += meta.monthlySpend;
//       continue;
//     }

//     const perSeatCost = COST_MATRIX[toolId]?.[meta.plan];
//     if (typeof perSeatCost !== 'number') continue;

//     currentTotalMonthly += perSeatCost * meta.seats;
//   }

//   // 2. Collect insights
//   let insights: OptimizationInsight[] = [
//     ...detectRedundancy(state),
//     ...detectSeatWaste(state),
//     ...detectPlanMismatch(state),
//     ...detectCreditsOpportunity(state),
//   ];

//   // 3. Deduplicate
//   const seen = new Set<string>();

//   insights = insights.filter((i) => {
//     if (!i.id || seen.has(i.id)) return false;
//     seen.add(i.id);
//     return true;
//   });

//   // 4. Sort by savings only (NO extra fields)
//   insights.sort(
//     (a, b) => (b.potentialSavings ?? 0) - (a.potentialSavings ?? 0)
//   );

//   // 5. Limit output
//   const finalInsights = insights.slice(0, 8);

//   // 6. Compute savings
//   const totalSavings = finalInsights.reduce(
//     (sum, i) => sum + (i.potentialSavings ?? 0),
//     0
//   );

//   const cappedSavings = Math.min(
//     totalSavings,
//     currentTotalMonthly * 0.7
//   );

//   return {
//     currentTotalMonthly: Math.round(currentTotalMonthly),
//     optimizedTotalMonthly: Math.max(
//       0,
//       Math.round(currentTotalMonthly - cappedSavings)
//     ),
//     totalMonthlySavings: Math.round(cappedSavings),
//     insights: finalInsights,
//   };
// }





import { AuditState, AIToolId } from '@/hooks/useAuditStore';
import { COST_MATRIX } from '@/lib/pricing/pricingData';
import { AuditResults, OptimizationInsight } from '@/types/audit';

import { detectSeatWaste } from './rules/detectSeatWaste';
import { detectRedundancy } from './rules/detectRedundancy';
import { detectPlanMismatch } from './rules/detectPlanMismatch';
import { detectCreditsOpportunity } from './rules/detectCreditsOpportunity';

export function runAuditEngine(state: AuditState): AuditResults {
  let currentTotalMonthly = 0;

  const activeTools = Object.entries(state.tools).filter(
    ([_, meta]) => meta.enabled
  );

  // 1. BASELINE COST
  for (const [id, meta] of activeTools) {
    const toolId = id as AIToolId;

    if (toolId === 'anthropic_api' || toolId === 'openai_api') {
      currentTotalMonthly += meta.monthlySpend;
      continue;
    }

    const perSeatCost = COST_MATRIX[toolId]?.[meta.plan];
    if (typeof perSeatCost !== 'number') continue;

    currentTotalMonthly += perSeatCost * meta.seats;
  }

  // 2. COLLECT INSIGHTS
  let insights: OptimizationInsight[] = [
    ...detectRedundancy(state),
    ...detectSeatWaste(state),
    ...detectPlanMismatch(state),
    ...detectCreditsOpportunity(state),
  ];

  // 3. DEDUPLICATE (stable)
  // const seen = new Set<string>();
  // insights = insights.filter((i) => {
  //   if (!i.id || seen.has(i.id)) return false;
  //   seen.add(i.id);
  //   return true;
  // });

  const seen = new Map<string, OptimizationInsight>();

for (const i of insights) {
  if (!i.id) continue;

  const existing = seen.get(i.id);

  if (!existing) {
    seen.set(i.id, i);
    continue;
  }

  // keep higher savings version if duplicate
  if ((i.potentialSavings ?? 0) > (existing.potentialSavings ?? 0)) {
    seen.set(i.id, i);
  }
}

insights = Array.from(seen.values());

  // 4. SORT BY SAVINGS (simple deterministic logic)
  insights.sort(
    (a, b) => (b.potentialSavings ?? 0) - (a.potentialSavings ?? 0)
  );

  // 5. LIMIT OUTPUT (UI clarity)
  const finalInsights = insights.slice(0, 8);

  // 6. TOTAL SAVINGS
  // const totalSavings = finalInsights.reduce(
  //   (sum, i) => sum + (i.potentialSavings ?? 0),
  //   0
  // );

  const toolSavings = new Map<string, number>();
let apiSavings = 0;

for (const i of finalInsights) {
  if (!i.toolId) continue;

  if (i.type === 'credits_opportunity') {
    apiSavings += i.potentialSavings ?? 0;
    continue;
  }

  const existing = toolSavings.get(i.toolId) ?? 0;

  // always take MAX contribution per tool (deterministic rule)
  toolSavings.set(
    i.toolId,
    Math.max(existing, i.potentialSavings ?? 0)
  );
}

const totalSavings =
  Array.from(toolSavings.values()).reduce((a, b) => a + b, 0) +
  apiSavings;
  
  // 7. REALISM CAP
  const cappedSavings = Math.min(
    totalSavings,
    currentTotalMonthly * 0.7
  );

  return {
    currentTotalMonthly: Math.round(currentTotalMonthly),
    optimizedTotalMonthly: Math.max(
      0,
      Math.round(currentTotalMonthly - cappedSavings)
    ),
    totalMonthlySavings: Math.round(cappedSavings),
    insights: finalInsights,
  };
}