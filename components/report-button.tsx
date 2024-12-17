"use client";

import { Button } from "./ui/button";

export default function GenerateReportButton({ month }: { month: string }) {
  const handleClick = async () => {
    try {
      const response = await fetch(
        `/delegations/api/generate-report?month=${month}`,
      );

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const result = await response.json();
      alert("Report generated successfully!");

      // Optionally download the file if needed
      const link = document.createElement("a");
      link.href = result.filePath;
      link.download = `report_${month}.tex`;
      link.click();
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    }
  };

  return <Button onClick={handleClick}>Generate Report</Button>;
}
