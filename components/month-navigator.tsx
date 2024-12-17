"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MonthNavigator({
  currentMonth,
}: {
  currentMonth: string;
}) {
  const router = useRouter();

  // Parse the current month (YYYY-MM) to a Date object
  const [currentDate, setCurrentDate] = useState(() => {
    const [year, month] = currentMonth.split("-").map(Number);
    return new Date(year, month - 1);
  });

  // Update the route dynamically when currentDate changes
  useEffect(() => {
    const newMonth = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, "0")}`;
    router.push(`/delegations/list/${newMonth}`);
  }, [currentDate, router]);

  // Increment month
  const incrementMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Decrement month
  const decrementMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Format date for display (MM/YYYY)
  const formatDate = (date: Date) => {
    return `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <Card>
      <div className="flex items-center justify-between gap-4 p-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decrementMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-semibold" aria-live="polite" aria-atomic="true">
          {formatDate(currentDate)}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={incrementMonth}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
