import { supabase } from './supabase';

console.log("🔥 saveAudit CALLED");
// export async function saveAudit(audit: any) {
//   const { data, error } = await supabase
//     .from('audits')
//     .insert([
//       {
//         team_size: audit.teamSize,
//         primary_use_case: audit.primaryUseCase,
//         current_spend: audit.currentTotalMonthly,
//         optimized_spend: audit.optimizedTotalMonthly,
//         savings: audit.totalMonthlySavings,
//         annual_savings: audit.totalMonthlySavings * 12,
//         insights: audit.insights,
//         summary: audit.summary || '',
//       },
//     ])
//     .select();

//   console.log("🟡 SUPABASE RESPONSE DATA:", data);
//   console.log("🔴 SUPABASE ERROR:", error);

//   if (error) throw error;

//   // return data?.[0];
//   return data?.[0] || null;
// }



export async function saveAudit(audit: any) {
  console.log("🔥 saveAudit CALLED");
 
  const payload = {
    team_size: audit.teamSize,
    primary_use_case: audit.primaryUseCase,
    current_spend: audit.currentTotalMonthly,
    optimized_spend: audit.optimizedTotalMonthly,
    savings: audit.totalMonthlySavings,
    annual_savings: audit.totalMonthlySavings * 12,
    insights: audit.insights,
    summary: audit.summary || '',
  };

  

  const { data, error } = await supabase
    .from('audits')
    .insert([payload])
    .select()
    .single();

  console.log("📊 SUPABASE RESPONSE DATA:", data);
  console.log("❌ SUPABASE ERROR:", error);

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  return data;
}