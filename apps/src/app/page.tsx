// 'use client';

// import ToolCard from '@/components/audit/ToolCard';
// import { TOOL_CONFIGS } from '@/config/tools';
// import { useAuditEngine } from '@/hooks/useAuditEngine';
// import { useAuditStore } from '@/hooks/useAuditStore';

// export default function HomePage() {
//   const {
//     teamSize,
//     primaryUseCase,
//     updateMeta,
//   } = useAuditStore();

//   const audit = useAuditEngine();

//   return (
//     <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
//       <section className="space-y-4">
//         <h1 className="text-4xl font-bold">
//           StackSpend AI Audit
//         </h1>

//         <p className="text-gray-600">
//           Discover wasted AI spend across your
//           team stack.
//         </p>
//       </section>

//       <section className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-2 font-medium">
//             Team Size
//           </label>

//           <input
//             type="number"
//             value={teamSize}
//             onChange={(e) =>
//               updateMeta(
//                 'teamSize',
//                 Number(e.target.value)
//               )
//             }
//             className="w-full border rounded-lg p-2"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">
//             Primary Use Case
//           </label>

//           <select
//             value={primaryUseCase}
//             onChange={(e) =>
//               updateMeta(
//                 'primaryUseCase',
//                 e.target.value
//               )
//             }
//             className="w-full border rounded-lg p-2"
//           >
//             <option value="coding">
//               Coding
//             </option>

//             <option value="writing">
//               Writing
//             </option>

//             <option value="data">
//               Data
//             </option>

//             <option value="research">
//               Research
//             </option>

//             <option value="mixed">
//               Mixed
//             </option>
//           </select>
//         </div>
//       </section>

//       <section className="grid md:grid-cols-2 gap-4">
//         {TOOL_CONFIGS.map((tool) => (
//           <ToolCard
//             key={tool.id}
//             toolId={tool.id}
//           />
//         ))}
//       </section>

//       <section className="border rounded-2xl p-6 space-y-4">
//         <h2 className="text-2xl font-bold">
//           Audit Results
//         </h2>

//         <div className="space-y-2">
//           <p>
//             Current Monthly Spend:{' '}
//             <strong>
//               $
//               {audit.currentTotalMonthly}
//             </strong>
//           </p>

//           <p>
//             Optimized Spend:{' '}
//             <strong>
//               $
//               {audit.optimizedTotalMonthly}
//             </strong>
//           </p>

//           <p className="text-green-600 font-semibold">
//             Potential Savings:{' '}
//             <strong>
//               $
//               {audit.totalMonthlySavings}
//               /month
//             </strong>
//           </p>
//         </div>

//         <div className="space-y-3">
//           {audit.insights.map(
//             (insight, index) => (
//               <div
//                 key={index}
//                 className="border rounded-xl p-4"
//               >
//                 <p className="font-medium">
//                   {insight.message}
//                 </p>

//                 <p className="text-sm text-gray-600 mt-1">
//                   Potential Savings: $
//                   {
//                     insight.potentialSavings
//                   }
//                   /month
//                 </p>
//               </div>
//             )
//           )}
//         </div>
//       </section>
//     </main>
//   );
// }



// 'use client';

// import ToolCard from '@/components/audit/ToolCard';
// import { TOOL_CONFIGS } from '@/config/tools';
// import { useAuditEngine } from '@/hooks/useAuditEngine';
// import { useAuditStore } from '@/hooks/useAuditStore';

// export default function HomePage() {
//   const {
//     teamSize,
//     primaryUseCase,
//     updateMeta,
//   } = useAuditStore();

//   const audit = useAuditEngine();

//   return (
//     <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
//       {/* Hero */}
//       <section className="space-y-4">
//         <h1 className="text-4xl font-bold">
//           StackSpend AI Audit
//         </h1>

//         <p className="text-gray-600">
//           Discover wasted AI spend across your
//           team stack.
//         </p>
//       </section>

//       {/* Meta Inputs */}
//       <section className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="block mb-2 font-medium">
//             Team Size
//           </label>

//           <input
//             type="number"
//             value={teamSize}
//             onChange={(e) =>
//               updateMeta(
//                 'teamSize',
//                 Number(e.target.value)
//               )
//             }
//             className="w-full border rounded-lg p-2"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">
//             Primary Use Case
//           </label>

//           <select
//             value={primaryUseCase}
//             onChange={(e) =>
//               updateMeta(
//                 'primaryUseCase',
//                 e.target.value
//               )
//             }
//             className="w-full border rounded-lg p-2"
//           >
//             <option value="coding">
//               Coding
//             </option>

//             <option value="writing">
//               Writing
//             </option>

//             <option value="data">
//               Data
//             </option>

//             <option value="research">
//               Research
//             </option>

//             <option value="mixed">
//               Mixed
//             </option>
//           </select>
//         </div>
//       </section>

//       {/* Tool Cards */}
//       <section className="grid md:grid-cols-2 gap-4">
//         {TOOL_CONFIGS.map((tool) => (
//           <ToolCard
//             key={tool.id}
//             toolId={tool.id}
//           />
//         ))}
//       </section>

//       {/* Audit Results */}
//       <section className="border rounded-2xl p-6 space-y-6">
//         <h2 className="text-2xl font-bold">
//           Audit Results
//         </h2>

//         {/* Savings Summary */}
//         <div className="space-y-2">
//           <p>
//             Current Monthly Spend:{' '}
//             <strong>
//               $
//               {audit.currentTotalMonthly}
//             </strong>
//           </p>

//           <p>
//             Optimized Spend:{' '}
//             <strong>
//               $
//               {audit.optimizedTotalMonthly}
//             </strong>
//           </p>

//           <p className="text-green-600 font-semibold">
//             Potential Savings:{' '}
//             <strong>
//               $
//               {audit.totalMonthlySavings}
//               /month
//             </strong>
//           </p>

//           <p className="text-xl font-bold text-green-700">
//             Annual Savings:{' '}
//             <strong>
//               $
//               {audit.totalMonthlySavings *
//                 12}
//               /year
//             </strong>
//           </p>
//         </div>

//         {/* High Savings CTA */}
//         {audit.totalMonthlySavings >=
//           500 && (
//           <div className="bg-black text-white rounded-2xl p-6">
//             <h3 className="text-xl font-bold">
//               Unlock Additional Enterprise
//               Savings
//             </h3>

//             <p className="mt-2 text-sm text-gray-300">
//               Your team may qualify for
//               discounted AI infrastructure
//               credits through Credex.
//             </p>

//             <button className="mt-4 bg-white text-black px-4 py-2 rounded-lg font-medium">
//               Book a Credex Consultation
//             </button>
//           </div>
//         )}

//         {/* Healthy Stack */}
//         {audit.insights.length === 0 && (
//           <div className="border rounded-xl p-4 bg-green-50">
//             <p className="font-medium text-green-700">
//               Your AI tooling spend already
//               looks well optimized.
//             </p>
//           </div>
//         )}

//         {/* Insights */}
//         <div className="space-y-3">
//           {audit.insights.map((insight) => (
//             <div
//               key={insight.id}
//               className={`rounded-xl p-4 border ${
//                 insight.severity ===
//                 'critical'
//                   ? 'border-red-300 bg-red-50'
//                   : 'border-yellow-300 bg-yellow-50'
//               }`}
//             >
//               <p className="font-medium">
//                 {insight.message}
//               </p>

//               <p className="text-sm text-gray-600 mt-1">
//                 Potential Savings: $
//                 {
//                   insight.potentialSavings
//                 }
//                 /month
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import ToolCard from '@/components/audit/ToolCard';
import { TOOL_CONFIGS } from '@/config/tools';
import { useAuditEngine } from '@/hooks/useAuditEngine';
import { useAuditStore } from '@/hooks/useAuditStore';
import jsPDF from 'jspdf';
import { useRouter } from "next/navigation";
import { saveAudit } from '@/lib/saveAudit';
import { useRef } from 'react';



export default function HomePage() {
  const { teamSize, primaryUseCase, updateMeta } = useAuditStore();
  const audit = useAuditEngine();
  
const [summary, setSummary] = useState('');
const [summaryLoading, setSummaryLoading] = useState(false);


const router = useRouter();
const [auditId, setAuditId] = useState<string | null>(null);
const savedRef = useRef(false);

// const downloadPDF = () => {
//   const doc = new jsPDF();

//   doc.setFontSize(20);
//   doc.text('StackSpend AI Audit Report', 20, 20);

//   doc.setFontSize(12);

//   doc.text(
//     `Current Monthly Spend: $${audit.currentTotalMonthly}`,
//     20,
//     40
//   );

//   doc.text(
//     `Optimized Monthly Spend: $${audit.optimizedTotalMonthly}`,
//     20,
//     50
//   );

//   doc.text(
//     `Monthly Savings: $${audit.totalMonthlySavings}`,
//     20,
//     60
//   );

//   doc.text(
//     `Annual Savings: $${audit.totalMonthlySavings * 12}`,
//     20,
//     70
//   );

//   doc.text('AI Audit Summary:', 20, 90);

//   const splitSummary = doc.splitTextToSize(summary, 170);

//   doc.text(splitSummary, 20, 100);

//   let y = 130;

//   doc.text('Optimization Insights:', 20, y);

//   y += 10;

//   audit.insights.forEach((insight) => {
//     const text = `• ${insight.message} | Save $${insight.potentialSavings}/month`;

//     const lines = doc.splitTextToSize(text, 170);

//     doc.text(lines, 20, y);

//     y += lines.length * 8;
//   });

//   doc.save('stackspend-audit-report.pdf');
// };

useEffect(() => {
  async function generateSummary() {
    if (audit.insights.length === 0) {
      setSummary(
        'Your AI tooling stack appears well optimized with minimal unnecessary spend detected.'
      );
      return;
    }

    try {
      setSummaryLoading(true);

      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audit,
          primaryUseCase,
          teamSize,
        }),
      });

      const data = await response.json();

      setSummary(
        data.summary ||
          'Your team may be able to reduce AI tooling costs through consolidation and pricing optimization.'
      );
    } catch (error) {
      setSummary(
        'Your team may be able to reduce AI tooling costs through consolidation and pricing optimization.'
      );
    } finally {
      setSummaryLoading(false);
    }
  }

  generateSummary();
}, [audit, primaryUseCase, teamSize]);


const handleGenerateReport = async () => {
  try {
    const saved = await saveAudit({
      ...audit,
      teamSize,
      primaryUseCase,
    });

    if (saved?.id) {
      setAuditId(saved.id);
      router.push(`/audit/${saved.id}`);
    }
  } catch (err) {
    console.error("Failed to generate report", err);
  }
};

  // Track our dark/light state directly
  const [isDark, setIsDark] = useState(false);

  // Synchronize state changes immediately with the DOM root for Tailwind v4
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12 antialiased transition-colors duration-200">
      
      {/* Dynamic Header & Theme Switcher Action Area */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50 rounded-full">
            Reduce AI Spend Without Sacrificing Productivity
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-5xl">
            StackSpend AI Audit
          </h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400 max-w-2xl">
           Instantly audit your AI tooling stack and uncover redundant subscriptions, over-provisioned seats, and vendor overlap.
          </p>


          <div className="flex flex-wrap gap-3 mt-5">
  <span className="px-3 py-1.5 rounded-full border bg-white dark:bg-zinc-900 text-sm font-medium text-gray-700 dark:text-zinc-200 shadow-sm">
    No login required
  </span>

  <span className="px-3 py-1.5 rounded-full border bg-white dark:bg-zinc-900 text-sm font-medium text-gray-700 dark:text-zinc-200 shadow-sm">
    Instant audit
  </span>

  <span className="px-3 py-1.5 rounded-full border bg-white dark:bg-zinc-900 text-sm font-medium text-gray-700 dark:text-zinc-200 shadow-sm">
    Shareable report
  </span>
</div>
        </div>

        {/* Premium Appearance Mode Toggle Button */}
        <div className="flex justify-center shrink-0">
          <button
            onClick={() => setIsDark(!isDark)}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border rounded-xl shadow-xs transition-all cursor-pointer bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {isDark ? (
              <>
                {/* Sun Icon for turning on Light Mode */}
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Light Mode</span>
              </>
            ) : (
              <>
                {/* Moon Icon for turning on Dark Mode */}
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* Meta Inputs Configuration */}
      <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs grid md:grid-cols-2 gap-6 transition-colors duration-200">
        <div className="space-y-2">
          <label htmlFor="team-size" className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">
            Current Team Size
          </label>
          <div className="relative rounded-lg shadow-xs">
            <input
              id="team-size"
              type="number"
              min="1"
              value={teamSize}
              onChange={(e) => updateMeta('teamSize', Number(e.target.value))}
              placeholder="e.g. 15"
              className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-gray-900 dark:text-zinc-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="use-case" className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">
            Primary Stack Focus
          </label>
          <select
            id="use-case"
            value={primaryUseCase}
            onChange={(e) => updateMeta('primaryUseCase', e.target.value)}
            className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 text-gray-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium cursor-pointer"
          >
            <option value="coding">Engineering & Coding</option>
            <option value="writing">Content & Copywriting</option>
            <option value="data">Data Science & Analytics</option>
            <option value="research">Academic & Market Research</option>
            <option value="mixed">General / Mixed Operations</option>
          </select>
        </div>
      </section>

      {/* Grid Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-50">Current AI Toolkit</h2>
        <p className="text-sm text-gray-500 dark:text-zinc-400">Select the tools currently deployed within your workflows.</p>
      </div>

      {/* Tool Cards Grid */}
      <section className="grid sm:grid-cols-2 gap-5">
        {TOOL_CONFIGS.map((tool) => (
          <div key={tool.id} className="transition-transform duration-200 hover:-translate-y-0.5">
            <ToolCard toolId={tool.id} />
          </div>
        ))}
      </section>

      {/* Audit Results Dashboard Section */}
      <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8 transition-colors duration-200">
        <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-50 tracking-tight">
            Audit Intelligence Report
          </h2>
          <div className="pt-4">
  {/* <button
    onClick={downloadPDF}
    className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition cursor-pointer"
  >
    Download PDF Report
  </button> */}

  <button
  onClick={handleGenerateReport}
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer"
>
  Generate Full Report
</button>
</div>

        </div>

        {/* Financial Metrics Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 transition-colors duration-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Current Spend</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-zinc-50 mt-1">${audit.currentTotalMonthly}<span className="text-xs text-gray-500 font-normal">/mo</span></p>
          </div>

          <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 transition-colors duration-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Optimized Target</p>
            <p className="text-2xl font-bold text-gray-700 dark:text-zinc-300 mt-1">${audit.optimizedTotalMonthly}<span className="text-xs text-gray-500 font-normal">/mo</span></p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-xl p-4 transition-colors duration-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Monthly Savings</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">${audit.totalMonthlySavings}<span className="text-xs text-emerald-600 font-normal">/mo</span></p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 col-span-2 lg:col-span-1 transition-colors duration-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">Run-rate Savings</p>
            <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-400 mt-1">${audit.totalMonthlySavings * 12}<span className="text-xs text-blue-600 font-normal">/yr</span></p>
          </div>
        </div>


        {audit.totalMonthlySavings > 500 && (
  <div className="max-w-5xl mx-auto mb-8">
    <div className="rounded-2xl border border-blue-200 bg-blue-50 dark:bg-blue-950/20 p-6 flex items-start justify-between gap-6">
      <div>
        <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
          High Savings Opportunity
        </p>

        <h2 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
          You could save over ${audit.totalMonthlySavings}/month
        </h2>

        <p className="text-gray-600 dark:text-zinc-300 mt-2 max-w-2xl">
          Teams with this level of AI spend inefficiency often unlock
          additional savings through vendor consolidation, credits,
          and usage restructuring.
        </p>
      </div>

      <a
        href="https://credex.rocks"
        target="_blank"
        className="shrink-0 bg-black text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Book Credex Consultation
      </a>
    </div>
  </div>
)}




{audit.totalMonthlySavings < 100 && (
  <div className="max-w-5xl mx-auto mb-8">
    <div className="rounded-2xl border bg-green-50 dark:bg-green-950/20 border-green-200 p-6">
      <h2 className="text-xl font-bold text-green-700 dark:text-green-300">
        Your stack is already well optimized
      </h2>

      <p className="text-gray-600 dark:text-zinc-300 mt-2">
        We did not detect major unnecessary AI spend based on your
        current tooling and team size. We’ll continue monitoring
        emerging pricing changes and optimization opportunities.
      </p>
    </div>
  </div>
)}

      {/* AI Summary */}
<div className="border border-gray-200 dark:border-zinc-800 rounded-xl p-5 bg-gray-50 dark:bg-zinc-800/50 space-y-2">
  <div className="flex items-center gap-2">
    <div className="h-2 w-2 rounded-full bg-blue-500" />
    <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-zinc-400">
      AI Audit Summary
    </h3>
  </div>

  <p className="text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
    {summaryLoading
      ? 'Generating personalized audit summary...'
      : summary}
  </p>
</div>



        {/* High Savings Call To Action (Enterprise Hook - Balanced Light Card) */}
        {audit.totalMonthlySavings >= 500 && (
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/60 rounded-xl p-6 shadow-xs transition-colors duration-200">
            <div className="relative z-10 max-w-xl space-y-3">
              <h3 className="text-lg font-bold tracking-tight text-blue-900 dark:text-blue-300">
                Unlock Additional Enterprise Savings
              </h3>
              <p className="text-sm text-blue-700/90 dark:text-zinc-300 leading-relaxed">
                Your software overhead waste qualifies your team for custom tier pricing scales, streamlined usage consolidation, and infrastructure credits through Credex.
              </p>
              <div className="pt-1">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-semibold shadow-xs transition-colors cursor-pointer">
                  Book Credex Consultation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Healthy Stack State */}
        {audit.insights.length === 0 && (
          <div className="flex items-center gap-3 border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl p-4 text-emerald-800 dark:text-emerald-400 transition-colors duration-200">
            <svg className="w-5 h-5 shrink-0 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">
              Excellent! Your AI tooling ecosystem is completely optimized. No redundancies detected.
            </p>
          </div>
        )}

        {/* Actionable Insights List */}
        {audit.insights.length > 0 && (
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">Optimization Steps Required</h4>
            
            <div className="space-y-3">
              {audit.insights.map((insight) => {
                const isCritical = insight.severity === 'critical';
                return (
                  <div
                    key={insight.id}
                    className={`flex items-start gap-4 rounded-xl p-4 border transition-all ${
                      isCritical
                        ? 'border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-300'
                        : 'border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300'
                    }`}
                  >
                    <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${isCritical ? 'bg-red-500' : 'bg-amber-500'}`} />
                    
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold leading-snug">
                        {insight.message}
                      </p>
                      <p className={`text-xs font-medium ${isCritical ? 'text-red-700 dark:text-red-400' : 'text-amber-700 dark:text-amber-400'}`}>
                        Impact: Save ${insight.potentialSavings}/month
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}