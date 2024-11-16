"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReportPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");

  const generatePeriodOptions = () => {
    const options = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Generate options for current year and previous year
    for (let year = currentYear; year >= currentYear - 1; year--) {
      for (let month = 12; month >= 1; month--) {
        const monthStr = month.toString().padStart(2, '0');
        const label = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
        options.push({
          value: `${year}-${monthStr}`,
          label: label
        });
      }
    }
    return options;
  };

  const periods = generatePeriodOptions();

  const handleGenerateReport = () => {
    if (!selectedPeriod) {
      alert("Please select a period first");
      return;
    }
    // TODO: Implement report generation logic
    console.log(`Generating report for period: ${selectedPeriod}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Generate Monthly Report
      </h1>
      
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full max-w-xs">
          <Select onValueChange={setSelectedPeriod} value={selectedPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleGenerateReport}
          className="w-full max-w-xs"
        >
          Generate Report
        </Button>
      </div>
    </div>
  );
}
