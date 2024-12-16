import DelegationList from "@/components/delegation-list";
import MonthNavigator from "@/components/month-navigator";
import GenerateReportButton from "@/components/report-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Delegations list</h1>
      <div className="flex flex-row justify-between w-full items-end">
        <MonthNavigator />
        <GenerateReportButton />
      </div>
      <DelegationList />
    </main>
  );
}
