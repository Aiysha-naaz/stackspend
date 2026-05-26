// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//     console.log('KEY:', process.env.GEMINI_API_KEY);
//   try {
//     const body = await req.json();

//     const { audit, primaryUseCase, teamSize } = body;

//     const prompt = `
// You are an AI infrastructure cost optimization analyst.

// Generate a concise executive summary for this AI spend audit.

// Team Size: ${teamSize}
// Primary Use Case: ${primaryUseCase}

// Current Monthly Spend: $${audit.currentTotalMonthly}
// Potential Monthly Savings: $${audit.totalMonthlySavings}

// Insights:
// ${audit.insights
//   .map(
//     (i: any) =>
//       `- ${i.message} Potential Savings: $${i.potentialSavings}/month`
//   )
//   .join('\n')}

// Requirements:
// - Professional tone
// - Around 80-120 words
// - No hype
// - Mention optimization opportunities clearly
// - Mention if stack is already efficient
// `;

//     const response = await fetch(
//     //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     //  
//      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//      {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: prompt,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );
// const data = await response.json();

// console.log(data);

// if (!response.ok) {
//   throw new Error('Gemini API failed');
// }
//     const summary =
//       data.candidates?.[0]?.content?.parts?.[0]?.text ||
//       'Your AI stack shows opportunities for optimization and consolidation.';

//     return NextResponse.json({ summary });
//   }  catch (error) {
//   console.log(error);

//   return NextResponse.json({
//     summary:
//       'Your AI stack shows opportunities for optimization and consolidation.',
//   });
//   }
// }




// import { NextResponse } from 'next/server';
// import { saveAudit } from '@/lib/saveAudit';

// export async function POST(req: Request) {
//   try {
//     console.log('KEY:', process.env.GEMINI_API_KEY);
//     console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

//     const body = await req.json();

//     const { audit, primaryUseCase, teamSize } = body;

//     const prompt = `
// You are an AI infrastructure cost optimization analyst.

// Generate a concise executive summary for this AI spend audit.

// Team Size: ${teamSize}
// Primary Use Case: ${primaryUseCase}

// Current Monthly Spend: $${audit.currentTotalMonthly}
// Potential Monthly Savings: $${audit.totalMonthlySavings}

// Insights:
// ${audit.insights
//   .map(
//     (i: any) =>
//       `- ${i.message} Potential Savings: $${i.potentialSavings}/month`
//   )
//   .join('\n')}

// Requirements:
// - Professional tone
// - Around 80-120 words
// - No hype
// - Mention optimization opportunities clearly
// - Mention if stack is already efficient
// `;


//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: prompt,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     console.log(data);

//     // If Gemini works
//     if (response.ok) {
//       const summary =
//         data.candidates?.[0]?.content?.parts?.[0]?.text ||
//         'Your AI stack shows opportunities for optimization and consolidation.';

//         const auditRecord = {
//   teamSize,
//   primaryUseCase,
//   currentTotalMonthly: audit.currentTotalMonthly,
//   optimizedTotalMonthly:
//     audit.currentTotalMonthly - audit.totalMonthlySavings,
//   totalMonthlySavings: audit.totalMonthlySavings,
//   insights: audit.insights,
//   summary,
// };
// console.log("🔥 ABOUT TO SAVE TO SUPABASE");
// console.log("AUDIT RECORD:", auditRecord);

// const saved = await saveAudit(auditRecord);
// console.log("✅ SAVE RESULT:", saved);

//       return NextResponse.json({ summary , auditId: saved.id,});
//     }

//     // FALLBACK SUMMARY SYSTEM
//     const savingsRate =
//       audit.totalMonthlySavings / audit.currentTotalMonthly;

//     let summary = '';

//     if (savingsRate > 0.4) {
//       summary =
//         'Your AI stack contains significant optimization opportunities driven by overlapping subscriptions and concentrated API usage. Consolidating redundant tooling and optimizing seat allocation could substantially reduce recurring spend while maintaining operational efficiency.';
//     } else if (savingsRate > 0.2) {
//       summary =
//         'Your AI tooling ecosystem is moderately optimized but still shows opportunities for cost reduction through better subscription alignment and workload consolidation.';
//     } else {
//       summary =
//         'Your current AI stack appears relatively efficient with limited redundancy. Minor savings opportunities exist through targeted subscription and usage adjustments.';
//     }

//     return NextResponse.json({ summary });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({
//       summary:
//         'Your AI stack shows opportunities for optimization and consolidation.',
//     });
//   }
// }







import { NextResponse } from 'next/server';
import { saveAudit } from '@/lib/saveAudit';
import type { OptimizationInsight } from '@/types/audit';

export async function POST(req: Request) {
  try {
  
    

    const body = await req.json();
    const { audit, primaryUseCase, teamSize } = body;

    const prompt = `
You are an AI infrastructure cost optimization analyst.

Generate a concise executive summary for this AI spend audit.

Team Size: ${teamSize}
Primary Use Case: ${primaryUseCase}

Current Monthly Spend: $${audit.currentTotalMonthly}
Potential Monthly Savings: $${audit.totalMonthlySavings}

Insights:
${audit.insights
  .map(
    (i: OptimizationInsight) =>
      `- ${i.message} Potential Savings: $${i.potentialSavings}/month`
  )
  .join('\n')}

Requirements:
- Professional tone
- Around 80-120 words
- No hype
- Mention optimization opportunities clearly
- Mention if stack is already efficient
`;

    let summary = '';

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      console.log("🔥 GEMINI RESPONSE:", data);

      if (response.ok) {
        summary =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Your AI stack shows opportunities for optimization and consolidation.';
      } else {
        throw new Error('Gemini failed');
      }
    } catch (_err) {
      console.log("⚠️ Gemini failed, using fallback summary");

      const savingsRate =
        audit.totalMonthlySavings / audit.currentTotalMonthly;

      if (savingsRate > 0.4) {
        summary =
          'Your AI stack contains significant optimization opportunities driven by overlapping subscriptions and concentrated API usage. Consolidating redundant tooling could reduce costs significantly.';
      } else if (savingsRate > 0.2) {
        summary =
          'Your AI tooling ecosystem is moderately optimized but still shows opportunities for cost reduction through better consolidation.';
      } else {
        summary =
          'Your current AI stack appears relatively efficient with limited redundancy.';
      }
    }

    // ✅ ALWAYS SAVE (THIS IS THE FIX)
    const auditRecord = {
      teamSize,
      primaryUseCase,
      currentTotalMonthly: audit.currentTotalMonthly,
      optimizedTotalMonthly:
        audit.currentTotalMonthly - audit.totalMonthlySavings,
      totalMonthlySavings: audit.totalMonthlySavings,
      insights: audit.insights,
      summary,
    };

    console.log("🔥 ABOUT TO SAVE TO SUPABASE");
    console.log("📦 AUDIT RECORD:", auditRecord);

    const saved = await saveAudit(auditRecord);

    console.log("✅ SUPABASE SAVE SUCCESS:", saved);

    return NextResponse.json({
      summary,
      auditId: saved.id,
    });

  } catch (error) {
    console.log("❌ GLOBAL ERROR:", error);

    return NextResponse.json({
      summary:
        'Your AI stack shows opportunities for optimization and consolidation.',
    });
  }
}