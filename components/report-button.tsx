"use client";

import { Button } from "./ui/button";

export default function GenerateReportButton({ month }: { month: string }) {
  const handleClick = () => {
    alert(`MOCK: Generating report for ${month}`);
  };

  return <Button onClick={handleClick}>Generate Report</Button>;
}
