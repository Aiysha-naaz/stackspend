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




'use client';

import { TOOL_CONFIGS } from '@/config/tools';

import {
  AIToolId,
  useAuditStore,
} from '@/hooks/useAuditStore';

interface ToolCardProps {
  toolId: AIToolId;
}

export default function ToolCard({
  toolId,
}: ToolCardProps) {
  const tool = TOOL_CONFIGS.find(
    (item) => item.id === toolId
  );

  const toolState = useAuditStore(
    (state) => state.tools[toolId]
  );

  const updateTool = useAuditStore(
    (state) => state.updateTool
  );

  if (!tool) return null;

  const isApiTool =
    toolId === 'anthropic_api' ||
    toolId === 'openai_api';

  return (
    <div className="border rounded-2xl p-5 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">
          {tool.name}
        </h3>

        <input
          type="checkbox"
          checked={toolState.enabled}
          onChange={() =>
            updateTool(toolId, {
              enabled: !toolState.enabled,
            })
          }
          className="h-4 w-4"
        />
      </div>

      {toolState.enabled && (
        <div className="space-y-3">
          {/* PLAN */}
          <select
            className="w-full border rounded-xl p-2"
            value={toolState.plan}
            onChange={(e) =>
              updateTool(toolId, {
                plan: e.target.value,
              })
            }
          >
            {tool.plans.map((plan) => (
              <option
                key={plan}
                value={plan}
              >
                {plan}
              </option>
            ))}
          </select>

          {/* SEATS */}
          {!isApiTool && (
            <input
              type="number"
              min={1}
              placeholder="Seats"
              className="w-full border rounded-xl p-2"
              value={toolState.seats}
              onChange={(e) =>
                updateTool(toolId, {
                  seats:
                    Number(e.target.value) || 0,
                })
              }
            />
          )}

          {/* MONTHLY SPEND */}
          <input
            type="number"
            min={0}
            placeholder="Monthly Spend ($)"
            className="w-full border rounded-xl p-2"
            value={toolState.monthlySpend}
            onChange={(e) =>
              updateTool(toolId, {
                monthlySpend:
                  Number(e.target.value) || 0,
              })
            }
          />
        </div>
      )}
    </div>
  );
}