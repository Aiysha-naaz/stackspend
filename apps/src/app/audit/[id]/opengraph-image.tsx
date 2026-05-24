import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getAudit(id: string) {
  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const audit = await getAudit(id);

  const savings = audit?.annual_savings || 0;
  const currentSpend = audit?.current_spend || 0;
  const optimizedSpend = audit?.optimized_spend || 0;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0f172a 0%, #111827 40%, #1e293b 100%)",
          color: "white",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* TOP */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              opacity: 0.8,
              letterSpacing: 2,
            }}
          >
            STACKSPEND AI AUDIT
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            Save ${savings}/yr
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 34,
              opacity: 0.85,
            }}
          >
            AI tooling optimization report
          </div>
        </div>

        {/* METRICS */}
        <div
          style={{
            display: "flex",
            gap: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(255,255,255,0.08)",
              padding: "24px 32px",
              borderRadius: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                opacity: 0.7,
              }}
            >
              Current Spend
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 42,
                fontWeight: 700,
                marginTop: 8,
              }}
            >
              ${currentSpend}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "rgba(34,197,94,0.15)",
              padding: "24px 32px",
              borderRadius: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                opacity: 0.8,
              }}
            >
              Optimized Spend
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 42,
                fontWeight: 700,
                marginTop: 8,
                color: "#4ade80",
              }}
            >
              ${optimizedSpend}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}