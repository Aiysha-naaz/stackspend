import { useMemo } from 'react';
import { useAuditStore } from './useAuditStore';
import { runAuditEngine } from '@/lib/audit-engine';
import { AuditResults } from '@/types/audit';

export function useAuditEngine(): AuditResults {
  const storeState = useAuditStore();

  return useMemo(() => {
    return runAuditEngine(storeState);
  }, [
    storeState.teamSize,
    storeState.primaryUseCase,
    storeState.companyName,
    storeState.tools,
  ]);
}