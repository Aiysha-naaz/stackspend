"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareAuditButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // mobile native share
    if (navigator.share) {
      try {
        await navigator.share({
          title: "StackSpend AI Audit",
          text: "Check out this AI spend optimization report.",
          url,
        });

        return;
      } catch {}
    }

    // fallback copy
    await navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          Copied
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Share Audit
        </>
      )}
    </button>
  );
}