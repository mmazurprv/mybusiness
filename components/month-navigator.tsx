"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MonthNavigator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentDate, setCurrentDate] = useState(() => {
    const monthParam = searchParams.get("month");
    if (monthParam) {
      const [year, month] = monthParam.split("-").map(Number);
      return new Date(year, month - 1);
    }
    return new Date();
  });

  useEffect(() => {
    const monthString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
    router.push(`?month=${monthString}`);
  }, [currentDate, router]);

  const incrementMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const decrementMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const formatDate = (date: Date) => {
    return `${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex items-center justify-between p-6">
        <Button
          variant="outline"
          size="icon"
          onClick={decrementMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div
          className="text-lg font-semibold"
          aria-live="polite"
          aria-atomic="true"
        >
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
      </CardContent>
    </Card>
  );
}
