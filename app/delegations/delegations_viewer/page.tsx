import { client } from "@/lib/db/postgres";
import { Home } from "lucide-react";
import TripList from "@/components/trips/trips-list";
import { Trip } from "@/lib/types";
import Menu from "@/components/menu";
import { DateNavigatorComponent } from "@/components/date-navigator";

// Fetch trips for the specified day
async function getTripsForDay(date: string): Promise<Trip[]> {
  const trips = await client`
    SELECT *
    FROM trip
    WHERE DATE(start_time) = '2024-11-05'
  `;
  //WHERE start_time::DATE = ${date}::DATE
  return trips as unknown as Trip[]; // Ensure the result is typed as trip[]
}

export default async function TripPage(props: {
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
        <h1 className="text-2xl font-bold mb-4 text-center">Daily trips</h1>
        <Menu menuItems={menuItems} />
        <DateNavigatorComponent />
        <TripList trips={trips} />
      </div>
    </div>
  );
}
