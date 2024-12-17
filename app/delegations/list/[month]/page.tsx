import MonthNavigator from "@/components/month-navigator";
import GenerateReportButton from "@/components/report-button";
import TripsList from "@/components/trips-list";

export default async function Page({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const month = (await params).month;
  return (
    <main className="flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
      <div className="flex flex-row justify-between w-full items-end">
        <MonthNavigator currentMonth={month} />
        <GenerateReportButton />
      </div>
      {/* <TripsList /> */}
    </main>
  );
}
