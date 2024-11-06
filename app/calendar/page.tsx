import { client } from "@/lib/db/postgres";
import { Home } from "lucide-react";
import { Trip } from "@/lib/types";
import Menu from "@/components/menu";
import { DateNavigatorComponent } from "@/components/date-navigator";
import TripsList from "@/components/trips/trips-list";

// Fetch trips for the specified day
async function getTripsForDay(date: string): Promise<Trip[]> {
  const trips = await client`
    SELECT *
    FROM trips
    WHERE date::DATE = ${date}::DATE
  `;
  return trips as unknown as Trip[]; // Ensure the result is typed as Trip[]
}

export default async function CalendarPage(props: {
  searchParams?: Promise<{
    date?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const date = searchParams?.date || new Date().toISOString().split("T")[0]; // Default to today in "YYYY-MM-DD" format

  const trips = await getTripsForDay(date);

  const menuItems = [
    // { name: "Calendar", icon: Calendar, href: "/calendar" },
    { name: "Home", icon: Home, href: "/" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Today&apos;s Trips
        </h1>
        <Menu menuItems={menuItems} />
        <DateNavigatorComponent />
        <TripsList trips={trips} />
      </div>
    </div>
  );
}
