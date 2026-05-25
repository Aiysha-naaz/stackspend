// async function getAudit(id: string) {
//   // const res = await fetch(
//   //   `http://localhost:3000/api/get-audit/${id}`,
//   //   { cache: "no-store" }
//   // );
//   const res = await fetch(
//   `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-audit/${id}`,
//   { cache: "no-store" }
// );

//   return res.json();
//  }



// // export default async function AuditPage({
// //   params,
// // }: {
// //   params: { id?: string };
// // }) {
// //   const id = params?.id;

// //   console.log("📥 Page loaded with ID:", id);

// //   if (!id) {
// //     return <div>Invalid audit ID</div>;
// //   }

// //   const data = await getAudit(id);
// //   const audit = data.audit;

// //   if (!audit) {
// //     return <div>Audit not found</div>;
// //   }

// //   return (
// //     <div style={{ padding: 24 }}>
// //       <h1>AI Audit Report</h1>

// //       <h2>Summary</h2>
// //       <p>{audit.summary}</p>

// //       <h2>Metrics</h2>
// //       <ul>
// //         <li>Team Size: {audit.team_size}</li>
// //         <li>Current Spend: ${audit.current_spend}</li>
// //         <li>Optimized Spend: ${audit.optimized_spend}</li>
// //         <li>Savings: ${audit.savings}</li>
// //         <li>Annual Savings: ${audit.annual_savings}</li>
// //       </ul>

// //       <h2>Insights</h2>
// //       <pre>{JSON.stringify(audit.insights, null, 2)}</pre>
// //     </div>
// //   );
// // }

// export default async function AuditPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   console.log("📥 Page loaded with ID:", id);

//   if (!id) {
//     return <div>Invalid audit ID</div>;
//   }

//   const data = await getAudit(id);
//   const audit = data.audit;

//   if (!audit) {
//     return <div>Audit not found</div>;
//   }

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>AI Audit Report</h1>

//       <h2>Summary</h2>
//       <p>{audit.summary}</p>

//       <h2>Metrics</h2>
//       <ul>
//         <li>Team Size: {audit.team_size}</li>
//         <li>Current Spend: ${audit.current_spend}</li>
//         <li>Optimized Spend: ${audit.optimized_spend}</li>
//         <li>Savings: ${audit.savings}</li>
//         <li>Annual Savings: ${audit.annual_savings}</li>
//       </ul>

//       <h2>Insights</h2>
//       <pre>{JSON.stringify(audit.insights, null, 2)}</pre>
//     </div>
//   );
// }





// async function getAudit(id: string) {
//   const res = await fetch(`/api/get-audit/${id}`, 
//     { cache: "no-store" });
  

//   return res.json();
// }

// export default async function AuditPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const id = params.id;

//   console.log("📥 Page loaded with ID:", id);

//   const data = await getAudit(id);
//   const audit = data.audit;

//   if (!audit) {
//     return <div>Audit not found</div>;
//   }

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>AI Audit Report</h1>

//       <h2>Summary</h2>
//       <p>{audit.summary}</p>

//       <h2>Metrics</h2>
//       <ul>
//         <li>Team Size: {audit.team_size}</li>
//         <li>Current Spend: ${audit.current_spend}</li>
//         <li>Optimized Spend: ${audit.optimized_spend}</li>
//         <li>Savings: ${audit.savings}</li>
//         <li>Annual Savings: ${audit.annual_savings}</li>
//       </ul>

//       <h2>Insights</h2>
//       <pre>{JSON.stringify(audit.insights, null, 2)}</pre>
//     </div>
//   );
// }


export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Lightbulb, ArrowUpRight } from 'lucide-react';
import DownloadReportButton from '@/components/audit/DownloadReportButton';
import { runAuditEngine } from '@/lib/audit-engine';
import { useAuditStore } from '@/hooks/useAuditStore';
import LeadCapture from "@/components/LeadCapture";
import type { Metadata } from "next";
import ShareAuditButton from "@/components/audit/ShareAuditButton";



// async function getAudit(id: string) {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

//   const res = await fetch(
//     `${baseUrl}/api/get-audit/${id}`,
//     { cache: "no-store" }
//   );

//   return res.json();
// }



async function getAudit(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/get-audit/${id}`,
    { cache: "no-store" }
  );

  return res.json();
}



// async function getAudit(id: string) {
//   const res = await fetch(`/api/get-audit/${id}`, {
//     cache: "no-store",
//   });

//   return res.json();
// // }

// async function getAudit(id: string) {
//   const res = await fetch(`/api/get-audit/${id}`, {
//   cache: "no-store",
// });

//   if (!res.ok) {
//     return null;
//   }

//   return res.json();
// }



// export default async function AuditPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   if (!id) {
//     return <div>Invalid audit ID</div>;
//   }

//   const data = await getAudit(id);
//   const audit = data.audit;

//   if (!audit) {
//     return <div>Audit not found</div>;
//   }


// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }): Promise<Metadata> {
//   const { id } = await params;

//   const data = await getAudit(id);
//   const audit = data.audit;

//   if (!audit) {
//     return {
//       title: "Audit Report",
//     };
//   }

//   const savings = audit.annual_savings || 0;

//   return {
//     title: `Save $${savings}/yr on AI Spend`,
//     description:
//       "AI spend optimization report generated with StackSpend.",
//     openGraph: {
//       title: `Save $${savings}/yr on AI Spend`,
//       description:
//         "See how this team optimized their AI tooling costs.",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `Save $${savings}/yr on AI Spend`,
//       description:
//         "AI infrastructure savings audit generated by StackSpend.",
//     },
//   };
// }



export async function generateMetadata({
  params,
}: {
  
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

   console.log("🟡 generateMetadata called for:", id);


  const data = await getAudit(id);
  console.log("🟢 Supabase response:", data);

  const audit = data?.audit;

  if (!audit) {
    return {
    
      title: "Audit Report",
    };
  }

  const savings = audit.annual_savings || 0;
    console.log("🟣 Savings calculated:", savings);

//   return {
//      metadataBase: new URL("https://stackspend-mauve.vercel.app"),

//     title: `Save $${savings}/yr on AI Spend`,
//     description: "AI spend optimization report generated with StackSpend.",

//     openGraph: {
//   title: `Save $${savings}/yr on AI Spend`,
//   description: "See how this team optimized their AI tooling costs.",
//   type: "website",

//   images: [
//     {
//       url: `https://stackspend-n26wll0iv-ayeshas-projects-3e24d9ca.vercel.app/audit/${id}/opengraph-image`,
//       width: 1200,
//       height: 630,
//     },
//   ],
// },

//     twitter: {
//       card: "summary_large_image",
//       title: `Save $${savings}/yr on AI Spend`,
//       description: "AI infrastructure savings audit generated by StackSpend.",
//       // images: [`/audit/${id}/opengraph-image`],
//        images: [
//     // `https://stackspend-n26wll0iv-ayeshas-projects-3e24d9ca.vercel.app/audit/${id}/opengraph-image`
//     `https://stackspend-mauve.vercel.app/audit/${id}/opengraph-image`
//   ],
//     },
//   };


return {
  metadataBase: new URL("https://stackspend-mauve.vercel.app"),

  title: `Save $${savings}/yr on AI Spend`,
  description: "AI spend optimization report generated with StackSpend.",

  openGraph: {
    title: `Save $${savings}/yr on AI Spend`,
    description: "See how this team optimized their AI tooling costs.",
    type: "website",

    images: [
      {
        url: `https://stackspend-mauve.vercel.app/audit/${id}/opengraph-image?v=1`,
        
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `Save $${savings}/yr on AI Spend`,
    description: "AI infrastructure savings audit generated by StackSpend.",
    images: [
      `https://stackspend-mauve.vercel.app/audit/${id}/opengraph-image`,
    ],
  },
};


}


export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <div>Invalid audit ID</div>;
  }

  const data = await getAudit(id);
  const raw = data.audit;

//   const data = await getAudit(id);

// if (!data || !data.audit) {
//   return <div>Audit not found</div>;
// }

// const raw = data.audit;


const audit = {
  ...raw,
  teamSize: raw.team_size,
  primaryUseCase: raw.primary_use_case,
  currentTotalMonthly: raw.current_spend,
  optimizedTotalMonthly: raw.optimized_spend,
  totalMonthlySavings: raw.savings,
  annualSavings: raw.annual_savings,
  insights: raw.insights || [],

  summary:
    raw.summary ||
    'Your AI tooling stack appears well optimized with minimal unnecessary spend detected.',
};

  if (!audit) {
    return <div>Audit not found</div>;
  }


  
  return (
//     <div style={{ padding: 24 }}>
//       <h1>AI Audit Report</h1>

//       <h2>Summary</h2>
//       <p>{audit.summary}</p>

//       <h2>Metrics</h2>
//       <ul>
//         <li>Team Size: {audit.team_size}</li>
//         <li>Current Spend: ${audit.current_spend}</li>
//         <li>Optimized Spend: ${audit.optimized_spend}</li>
//         <li>Savings: ${audit.savings}</li>
//         <li>Annual Savings: ${audit.annual_savings}</li>
//       </ul>

//       <h2>Insights</h2>
//      <div className="space-y-3">
//   {audit.insights.map((insight: any) => (
//     <div
//       key={insight.id}
//       className="border rounded-xl p-4 bg-gray-50 dark:bg-zinc-900"
//     >
//       <p className="font-semibold">{insight.message}</p>
//       <p className="text-sm text-gray-500">
//         Impact: ${insight.potentialSavings}/month
//       </p>
//     </div>
//   ))}
// </div>
//     </div>

  <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 px-6 py-10">

    {/* HEADER */}
    {/* <div className="max-w-5xl mx-auto mb-10">
      <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold">
        AI Optimization Report
      </p>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
        StackSpend Audit Report
      </h1>

      <p className="text-gray-500 dark:text-zinc-400 mt-1">
        Generated analysis of your AI tooling stack
      </p>
    </div> */}
    <div className="max-w-5xl mx-auto mb-10 flex items-start justify-between gap-4">
  
  {/* LEFT SIDE (TEXT) */}
  <div>
    <p className="text-xs uppercase tracking-widest text-blue-600 font-semibold">
      AI Optimization Report
    </p>

    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
      StackSpend Audit Report
    </h1>

    <p className="text-gray-500 dark:text-zinc-400 mt-1">
      Generated analysis of your AI tooling stack
    </p>
  </div>

  {/* RIGHT SIDE (BUTTON) */}
  {/* <div className="shrink-0">
    <DownloadReportButton audit={audit} />
  </div> */}
  <div className="shrink-0 flex gap-3">
  <ShareAuditButton />
  <DownloadReportButton audit={audit} />
</div>

</div>

    {/* METRICS */}
    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

      <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4">
        <p className="text-xs text-gray-500">Team Size</p>
        <p className="text-2xl font-bold mt-1">{audit.team_size}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4">
        <p className="text-xs text-gray-500">Current Spend</p>
        <p className="text-2xl font-bold mt-1">${audit.current_spend}</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4">
        <p className="text-xs text-gray-500">Optimized Spend</p>
        <p className="text-2xl font-bold text-blue-600 mt-1">
          ${audit.optimized_spend}
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4">
        <p className="text-xs text-gray-500">Annual Savings</p>
        <p className="text-2xl font-bold text-green-600 mt-1">
          ${audit.annual_savings}
        </p>
      </div>

    </div>

    {/* SUMMARY */}
    <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 border rounded-2xl p-6 mb-10 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">AI Summary</h2>
      <p className="text-gray-600 dark:text-zinc-300 leading-relaxed">
        {audit.summary}
      </p>
    </div>

    {/* INSIGHTS */}
    <div className="max-w-5xl mx-auto space-y-4">

      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Optimization Insights
      </h2>

      {audit.insights.map((insight: any) => {
        const isCritical = insight.severity === "critical";

        return (
          <div
            key={insight.id}
            className={`rounded-xl border p-5 flex gap-4 transition ${
              isCritical
                ? "border-red-200 bg-red-50 dark:bg-red-950/20"
                : "border-amber-200 bg-amber-50 dark:bg-amber-950/20"
            }`}
          >

            {/* severity dot */}
            <div
              className={`w-2 h-2 mt-2 rounded-full ${
                isCritical ? "bg-red-500" : "bg-amber-500"
              }`}
            />

            {/* content */}
            <div className="flex-1 space-y-1">
              <p className="font-medium text-gray-900 dark:text-white">
                {insight.message}
              </p>

              <p className="text-sm text-gray-500">
                Potential Savings:{" "}
                <span className="font-semibold text-green-600">
                  ${insight.potentialSavings}/month
                </span>
              </p>

              {/* badge */}
              <span
                className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${
                  isCritical
                    ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                }`}
              >
                {insight.severity}
              </span>
            </div>

          </div>
        );
      })}


<LeadCapture auditId={id} teamSize={audit.team_size} />


 
    </div>



  </main>

  );
}