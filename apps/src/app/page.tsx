'use client';

import ToolCard from '@/components/audit/ToolCard';
import { TOOL_CONFIGS } from '@/config/tools';
import { useAuditEngine } from '@/hooks/useAuditEngine';
import { useAuditStore } from '@/hooks/useAuditStore';

export default function HomePage() {
  const {
    teamSize,
    primaryUseCase,
    updateMeta,
  } = useAuditStore();

  const audit = useAuditEngine();

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">
          StackSpend AI Audit
        </h1>

        <p className="text-gray-600">
          Discover wasted AI spend across your
          team stack.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            Team Size
          </label>

          <input
            type="number"
            value={teamSize}
            onChange={(e) =>
              updateMeta(
                'teamSize',
                Number(e.target.value)
              )
            }
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Primary Use Case
          </label>

          <select
            value={primaryUseCase}
            onChange={(e) =>
              updateMeta(
                'primaryUseCase',
                e.target.value
              )
            }
            className="w-full border rounded-lg p-2"
          >
            <option value="coding">
              Coding
            </option>

            <option value="writing">
              Writing
            </option>

            <option value="data">
              Data
            </option>

            <option value="research">
              Research
            </option>

            <option value="mixed">
              Mixed
            </option>
          </select>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        {TOOL_CONFIGS.map((tool) => (
          <ToolCard
            key={tool.id}
            toolId={tool.id}
          />
        ))}
      </section>

      <section className="border rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Audit Results
        </h2>

        <div className="space-y-2">
          <p>
            Current Monthly Spend:{' '}
            <strong>
              $
              {audit.currentTotalMonthly}
            </strong>
          </p>

          <p>
            Optimized Spend:{' '}
            <strong>
              $
              {audit.optimizedTotalMonthly}
            </strong>
          </p>

          <p className="text-green-600 font-semibold">
            Potential Savings:{' '}
            <strong>
              $
              {audit.totalMonthlySavings}
              /month
            </strong>
          </p>
        </div>

        <div className="space-y-3">
          {audit.insights.map(
            (insight, index) => (
              <div
                key={index}
                className="border rounded-xl p-4"
              >
                <p className="font-medium">
                  {insight.message}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Potential Savings: $
                  {
                    insight.potentialSavings
                  }
                  /month
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}