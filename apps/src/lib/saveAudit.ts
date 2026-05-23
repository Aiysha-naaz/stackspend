import { supabase } from './supabase';

export async function saveAudit(audit: any) {
  const { data, error } = await supabase
    .from('audits')
    .insert([
      {
        team_size: audit.teamSize,
        primary_use_case: audit.primaryUseCase,
        current_spend: audit.currentTotalMonthly,
        optimized_spend: audit.optimizedTotalMonthly,
        savings: audit.totalMonthlySavings,
        annual_savings: audit.totalMonthlySavings * 12,
        insights: audit.insights,
        summary: audit.summary || '',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  return data;
}