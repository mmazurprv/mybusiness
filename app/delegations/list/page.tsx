import MonthNavigator from "@/components/month-navigator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Month Navigator</h1>
      <MonthNavigator />
    </main>
  );
}
