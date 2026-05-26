'use client';

import jsPDF from 'jspdf';

type AuditInsight = {
  message: string;
  potentialSavings: number;
};

type AuditReport = {
  summary: string;
  current_spend: number;
  optimized_spend: number;
  annual_savings: number;
  insights: AuditInsight[];
};

// export default function DownloadReportButton({ audit }: any) {
export default function DownloadReportButton({
  audit,
}: {
  audit: AuditReport;
}) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('StackSpend AI Audit Report', 20, 20);

    doc.setFontSize(12);

    doc.text(`Current Monthly Spend: $${audit.current_spend}`, 20, 40);
    doc.text(`Optimized Monthly Spend: $${audit.optimized_spend}`, 20, 50);
    doc.text(`Annual Savings: $${audit.annual_savings}`, 20, 60);

    doc.text('AI Summary:', 20, 80);
    // doc.text(audit.summary || '', 20, 90);
    const summary =
  audit.summary ||
  'Your AI tooling stack appears well optimized with minimal unnecessary spend detected.';

// doc.text(summary, 20, 90);
const splitSummary = doc.splitTextToSize(summary, 170);
doc.text(splitSummary, 20, 90);

    let y = 110;

    doc.text('Insights:', 20, y);
    y += 10;


    
    // audit.insights.forEach((insight: any) => {
    //   const text = `• ${insight.message} | $${insight.potentialSavings}/mo`;
    //   doc.text(text, 20, y);
    //   y += 10;
    // });








    // audit.insights.forEach((insight: any) => {
    audit.insights.forEach((insight: AuditInsight) => {
  const messageLines = doc.splitTextToSize(
    `• ${insight.message}`,
    170
  );

  // 🔴 PAGE BREAK CHECK (IMPORTANT)
  if (y > 260) {
    doc.addPage();
    y = 20;
  }

  doc.text(messageLines, 20, y);

  y += messageLines.length * 6;

  doc.setFontSize(10);
  doc.setTextColor(80);

  doc.text(`Impact: $${insight.potentialSavings}/mo`, 20, y);

  doc.setFontSize(12);
  doc.setTextColor(0);

  y += 10;
});

    doc.save('audit-report.pdf');
  };

  return (
    <button
      onClick={downloadPDF}
      className="bg-black dark:bg-white dark:text-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
    >
      Download PDF Report
    </button>
  );
}