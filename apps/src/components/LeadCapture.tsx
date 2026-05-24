// "use client";

// import { useState } from "react";

// export default function LeadCapture({ auditId, teamSize }: any) {
//   const [email, setEmail] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [role, setRole] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [done, setDone] = useState(false);

//   const submitLead = async () => {
//     if (!email) return;

//     setLoading(true);

//     try {
//       const res = await fetch("/api/create-lead", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           auditId,
//           email,
//           companyName,
//           role,
//           teamSize,
//         }),
//       });

//       if (res.ok) {
//         setDone(true);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (done) {
//     return (
//       <div className="p-4 border rounded-xl bg-green-50 text-green-700">
//         Report saved! Check your email for details.
//       </div>
//     );
//   }

//   return (
//     <div className="border rounded-xl p-5 space-y-3 bg-white dark:bg-zinc-900">
//       <h3 className="font-semibold">Get your full report</h3>

//       <input
//         placeholder="Work email"
//         className="w-full p-2 border rounded"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         placeholder="Company name (optional)"
//         className="w-full p-2 border rounded"
//         value={companyName}
//         onChange={(e) => setCompanyName(e.target.value)}
//       />

//       <input
//         placeholder="Role (optional)"
//         className="w-full p-2 border rounded"
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//       />

//       <button
//         onClick={submitLead}
//         disabled={loading}
//         className="bg-black text-white px-4 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Send Report"}
//       </button>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";

export default function LeadCapture({ auditId, teamSize }: any) {
  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const submitLead = async () => {
    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch("/api/create-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auditId,
          email,
          companyName,
          role,
          teamSize,
          website,
        }),
      });

      if (res.ok) setDone(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="p-4 border rounded-xl bg-green-50 text-green-700">
        Report saved! Check your email.
      </div>
    );
  }

  return (
    <div className="border rounded-xl p-5 space-y-3 bg-white dark:bg-zinc-900">
      <h3 className="font-semibold">Get your full report</h3>

      {/* honeypot */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
      />

      <input
        placeholder="Work email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Company name (optional)"
        className="w-full p-2 border rounded"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <input
        placeholder="Role (optional)"
        className="w-full p-2 border rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button
        onClick={submitLead}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Send Report"}
      </button>
    </div>
  );
}