import DelegationList from "@/components/delegation-list";
import MonthNavigator from "@/components/month-navigator";
import GenerateReportButton from "@/components/report-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Delegations list</h1>
      <div className="flex flex-row justify-between w-full items-end">
        <MonthNavigator />
        <GenerateReportButton />
      </div>
      <DelegationList />
    </main>
  );
}
