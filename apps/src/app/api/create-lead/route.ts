// import { NextResponse } from "next/server";
// import { supabase } from "@/lib/supabase";
// import { sendAuditEmail } from "@/lib/email";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { auditId, email, companyName, role, teamSize } = body;

//     if (!email || !auditId) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const { data, error } = await supabase
//       .from("leads")
//       .insert([
//         {
//           audit_id: auditId,
//           email,
//           company_name: companyName || null,
//           role: role || null,
//           team_size: teamSize || null,
//         },
//       ])
//       .select()
//       .single();

//     if (error) throw error;

//     await sendAuditEmail({
//   email,
//   audit: {
//     current_spend: 0, // optional (we can enhance later)
//     optimized_spend: 0,
//     annual_savings: 0,
//     summary: "Your audit has been generated successfully.",
//   },
// });

//     return NextResponse.json({ success: true, lead: data });
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to create lead" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendAuditEmail } from "@/lib/email";

// simple in-memory rate limit
const ipRequestMap = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowTime = 60 * 1000; // 1 min
  const limit = 5;

  const requests = ipRequestMap.get(ip) || [];

  const recent = requests.filter((t) => now - t < windowTime);

  recent.push(now);

  ipRequestMap.set(ip, recent);

  return recent.length > limit;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      "unknown";

    // 🚨 rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await req.json();

    const {
      auditId,
      email,
      companyName,
      role,
      teamSize,
      website, // honeypot
    } = body;

    // 🚨 honeypot
    if (website && website.length > 0) {
      return NextResponse.json(
        { error: "Bot detected" },
        { status: 400 }
      );
    }

    if (!email || !auditId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // fetch real audit
    const { data: auditData, error: auditError } = await supabase
      .from("audits")
      .select("*")
      .eq("id", auditId)
      .single();

    if (auditError || !auditData) {
      return NextResponse.json(
        { error: "Audit not found" },
        { status: 404 }
      );
    }

    // save lead
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          audit_id: auditId,
          email,
          company_name: companyName || null,
          role: role || null,
          team_size: teamSize || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // email (safe fail)
    try {
    //   await sendAuditEmail({
    //     email,
    //     audit: {
    //       current_spend: auditData.current_spend,
    //       optimized_spend: auditData.optimized_spend,
    //       annual_savings: auditData.annual_savings,
    //       summary: auditData.summary,
    //     },
    //   });
   const emailResult = await sendAuditEmail({
  email,
  audit: {
    current_spend: auditData.current_spend,
    optimized_spend: auditData.optimized_spend,
    annual_savings: auditData.annual_savings,
    summary: auditData.summary,
  },
});
console.log("EMAIL RESULT:", emailResult);
    } catch (e) {
      console.error("Email failed:", e);
    }
    console.log("EMAIL SENT");

    return NextResponse.json({ success: true, lead: data });
  }catch (err: any) {
  console.error("❌ CREATE LEAD FAILED:", err);

  return NextResponse.json(
    {
      error: "Failed to create lead",
      details: err?.message || err,
    },
    { status: 500 }
  );
}
}