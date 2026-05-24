// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendAuditEmail({
//   email,
//   audit,
// }: {
//   email: string;
//   audit: any;
// }) {
//   try {
//     await resend.emails.send({
//       from: "StackSpend <onboarding@resend.dev>",
//       to: email,
//       subject: "Your AI Spend Audit Report",
//       html: `
//         <div>
//           <h2>Your AI Spend Audit is Ready</h2>

//           <p><strong>Current Spend:</strong> $${audit.current_spend}</p>
//           <p><strong>Optimized Spend:</strong> $${audit.optimized_spend}</p>
//           <p><strong>Annual Savings:</strong> $${audit.annual_savings}</p>

//           <h3>Summary</h3>
//           <p>${audit.summary || ""}</p>

//           <h3>Next Steps</h3>
//           <p>If your savings are significant, Credex may reach out to help you optimize further.</p>
//         </div>
//       `,
//     });
//   } catch (err) {
//     console.error("Email send failed:", err);
//   }
// }



import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAuditEmail({
  email,
  audit,
}: {
  email: string;
  audit: any;
}) {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to:  "ayeshapoditivity@gmail.com",
      subject: "Your StackSpend AI Audit Report",
     html: `
  <div style="font-family: Arial, sans-serif; background:#f5f7fb; padding:40px 20px;">
    
    <div style="max-width:600px; margin:0 auto; background:white; border-radius:16px; overflow:hidden; border:1px solid #e5e7eb;">
      
      <div style="background:#111827; padding:24px;">
        <h1 style="color:white; margin:0; font-size:24px;">
          StackSpend AI Audit Report
        </h1>

        <p style="color:#d1d5db; margin-top:8px; font-size:14px;">
          Your AI infrastructure cost optimization summary
        </p>
      </div>

      <div style="padding:32px;">

        <p style="font-size:15px; color:#374151; line-height:1.7;">
          ${audit.summary}
        </p>

        <div style="margin-top:28px;">

          <div style="background:#f9fafb; border-radius:12px; padding:18px; margin-bottom:14px;">
            <p style="margin:0; color:#6b7280; font-size:13px;">
              Current Monthly Spend
            </p>

            <h2 style="margin:6px 0 0; color:#111827;">
              $${audit.current_spend}
            </h2>
          </div>

          <div style="background:#eff6ff; border-radius:12px; padding:18px; margin-bottom:14px;">
            <p style="margin:0; color:#2563eb; font-size:13px;">
              Optimized Monthly Spend
            </p>

            <h2 style="margin:6px 0 0; color:#1d4ed8;">
              $${audit.optimized_spend}
            </h2>
          </div>

          <div style="background:#ecfdf5; border-radius:12px; padding:18px;">
            <p style="margin:0; color:#059669; font-size:13px;">
              Potential Annual Savings
            </p>

            <h2 style="margin:6px 0 0; color:#047857;">
              $${audit.annual_savings}
            </h2>
          </div>

        </div>

        <div style="margin-top:32px; padding-top:24px; border-top:1px solid #e5e7eb;">

          <p style="font-size:14px; color:#6b7280; line-height:1.6;">
            Teams with significant optimization opportunities may qualify for additional AI infrastructure savings through Credex enterprise credit programs.
          </p>

        </div>

      </div>

    </div>

  </div>
`,
    });

    console.log("✅ RESEND SUCCESS:", response);

    return response;
  } catch (error) {
    console.log("❌ RESEND ERROR:", error);
    throw error;
  }
}