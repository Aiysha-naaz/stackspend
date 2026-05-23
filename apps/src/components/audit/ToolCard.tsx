// 'use client';

// import { TOOL_CONFIGS } from '@/config/tools';
// import {
//   AIToolId,
//   ToolSelection,
//   useAuditStore,
// } from '@/hooks/useAuditStore';

// interface ToolCardProps {
//   toolId: AIToolId;
// }

// export default function ToolCard({
//   toolId,
// }: ToolCardProps) {
//   const tool = TOOL_CONFIGS.find(
//     (item) => item.id === toolId
//   );

//   const toolState = useAuditStore(
//     (state) => state.tools[toolId]
//   );

//   const updateTool = useAuditStore(
//     (state) => state.updateTool
//   );

//   if (!tool) return null;

//   return (
//     <div className="border rounded-xl p-4 space-y-4">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold text-lg">
//           {tool.name}
//         </h3>

//         {/* <input
//           type="checkbox"
//           checked={toolState.enabled}
//           onChange={(e) =>
//             updateTool(toolId, {
//               enabled: e.target.checked,
//             })
//           }
//         /> */}
//         <input
//   type="checkbox"
//   checked={!!toolState.enabled}
//   onChange={() => {
//     updateTool(toolId, {
//       enabled: !toolState.enabled,
//     });
//   }}
// />
//       </div>

//       {toolState.enabled && (
//         <div className="space-y-3">
//           <select
//             className="w-full border rounded-lg p-2"
//             value={toolState.plan}
//             onChange={(e) =>
//               updateTool(toolId, {
//                 plan: e.target.value,
//               })
//             }
//           >
//             {tool.plans.map((plan) => (
//               <option key={plan} value={plan}>
//                 {plan}
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             placeholder="Seats"
//             className="w-full border rounded-lg p-2"
//             value={toolState.seats}
//             onChange={(e) =>
//               updateTool(toolId, {
//                 seats: Number(e.target.value),
//               })
//             }
//           />

//           <input
//             type="number"
//             placeholder="Monthly Spend ($)"
//             className="w-full border rounded-lg p-2"
//             value={toolState.monthlySpend}
//             onChange={(e) =>
//               updateTool(toolId, {
//                 monthlySpend: Number(
//                   e.target.value
//                 ),
//               })
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }




// 'use client';

// import { TOOL_CONFIGS } from '@/config/tools';

// import {
//   AIToolId,
//   useAuditStore,
// } from '@/hooks/useAuditStore';

// interface ToolCardProps {
//   toolId: AIToolId;
// }

// export default function ToolCard({
//   toolId,
// }: ToolCardProps) {
//   const tool = TOOL_CONFIGS.find(
//     (item) => item.id === toolId
//   );

//   const toolState = useAuditStore(
//     (state) => state.tools[toolId]
//   );

//   const updateTool = useAuditStore(
//     (state) => state.updateTool
//   );

//   if (!tool) return null;

//   const isApiTool =
//     toolId === 'anthropic_api' ||
//     toolId === 'openai_api';

//   return (
//     <div className="border rounded-2xl p-5 space-y-4 bg-white">
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold text-lg">
//           {tool.name}
//         </h3>

//         <input
//           type="checkbox"
//           checked={toolState.enabled}
//           onChange={() =>
//             updateTool(toolId, {
//               enabled: !toolState.enabled,
//             })
//           }
//           className="h-4 w-4"
//         />
//       </div>

//       {toolState.enabled && (
//         <div className="space-y-3">
//           {/* PLAN */}
//           <select
//             className="w-full border rounded-xl p-2"
//             value={toolState.plan}
//             onChange={(e) =>
//               updateTool(toolId, {
//                 plan: e.target.value,
//               })
//             }
//           >
//             {tool.plans.map((plan) => (
//               <option
//                 key={plan}
//                 value={plan}
//               >
//                 {plan}
//               </option>
//             ))}
//           </select>

//           {/* SEATS */}
//           {!isApiTool && (
//             <input
//               type="number"
//               min={1}
//               placeholder="Seats"
//               className="w-full border rounded-xl p-2"
//               value={toolState.seats}
//               onChange={(e) =>
//                 updateTool(toolId, {
//                   seats:
//                     Number(e.target.value) || 0,
//                 })
//               }
//             />
//           )}

//           {/* MONTHLY SPEND */}
//           <input
//             type="number"
//             min={0}
//             placeholder="Monthly Spend ($)"
//             className="w-full border rounded-xl p-2"
//             value={toolState.monthlySpend}
//             onChange={(e) =>
//               updateTool(toolId, {
//                 monthlySpend:
//                   Number(e.target.value) || 0,
//               })
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useMemo } from 'react';
import { TOOL_CONFIGS } from '@/config/tools';
import { AIToolId, useAuditStore } from '@/hooks/useAuditStore';
import { ToolPlan } from '@/hooks/useAuditStore';

interface ToolCardProps {
  toolId: AIToolId;
}

export default function ToolCard({ toolId }: ToolCardProps) {
  const tool = TOOL_CONFIGS.find((item) => item.id === toolId);

  const toolState = useAuditStore((state) => state.tools[toolId]);
  const updateTool = useAuditStore((state) => state.updateTool);

  const isApiTool = useMemo(
    () => toolId === 'anthropic_api' || toolId === 'openai_api',
    [toolId]
  );

  if (!tool) return null;

  const seatsValue = toolState.seats === 0 ? '' : String(toolState.seats);
  const spendValue = toolState.monthlySpend === 0 ? '' : String(toolState.monthlySpend);

  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4 bg-white dark:bg-zinc-900 shadow-sm transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-zinc-50">
            {tool.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            {isApiTool ? 'API direct pricing' : 'Subscription plan'}
          </p>
        </div>

        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <span className="text-sm text-gray-600 dark:text-zinc-300">
            {toolState.enabled ? 'On' : 'Off'}
          </span>
          <input
            type="checkbox"
            checked={toolState.enabled}
            onChange={() =>
              updateTool(toolId, { enabled: !toolState.enabled })
            }
            className="h-4 w-4 accent-purple-600"
            aria-label={`Enable ${tool.name}`}
          />
        </label>
      </div>

      {toolState.enabled && (
        <div className="space-y-3 pt-1">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-400 mb-1">
              Plan
            </label>
            <select
              className="w-full border border-gray-300 dark:border-zinc-700 rounded-xl p-3 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              value={toolState.plan}
              // onChange={(e) =>
              //   updateTool(toolId, { plan: e.target.value })
              // }
              onChange={(e) =>
  updateTool(toolId, {
    plan: e.target.value as ToolPlan,
  })
}
            >
              <option value="" disabled>
                Select a plan
              </option>
              {tool.plans.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>

          {!isApiTool && (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-400 mb-1">
                Seats
              </label>
              <input
                type="number"
                min={1}
                placeholder="Seats"
                className="w-full border border-gray-300 dark:border-zinc-700 rounded-xl p-3 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                value={seatsValue}
                onChange={(e) =>
                  updateTool(toolId, {
                    seats: e.target.value === '' ? 0 : Number(e.target.value),
                  })
                }
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-zinc-400 mb-1">
              Monthly Spend
            </label>
            <input
              type="number"
              min={0}
              placeholder="Monthly Spend ($)"
              className="w-full border border-gray-300 dark:border-zinc-700 rounded-xl p-3 bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              value={spendValue}
              onChange={(e) =>
                updateTool(toolId, {
                  monthlySpend: e.target.value === '' ? 0 : Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}