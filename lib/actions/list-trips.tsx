"use server";

import { client } from "@/lib/db/postgres";
import {
  parseISO,
  startOfMonth,
  endOfMonth,
  differenceInMinutes,
} from "date-fns";

// Trip type with calculated fields
export type Trip = {
  start_meter: number;
  end_meter: number;
  start_location: string;
  end_location: string;
  start_time: string;
  end_time: string;
  total_time: string; // e.g., "2h 30m"
  average_speed: string; // e.g., "50.00 units/h"
};

// Delegation type
export type Delegation = {
  delegation_id: number;
  trips: Trip[];
};

export async function getDelegationsWithTrips(
  month: string,
): Promise<Delegation[]> {
  // Ensure the month is properly formatted as YYYY-MM
  if (!month || !/\d{4}-\d{2}/.test(month)) {
    throw new Error("Invalid month format. Use YYYY-MM.");
  }

  // Parse the start and end of the month
  const monthStart = startOfMonth(parseISO(`${month}-01`));
  const monthEnd = endOfMonth(monthStart);

  try {
    // Query to get all delegations
    const delegations = await client`
      SELECT id
      FROM delegation
    `;

    // Query to get all trips in the specified month
    const trips = await client`
      SELECT id, delegation_id, start_meter, end_meter, start_time, end_time, start_location, end_location
      FROM trip
      WHERE end_time >= ${monthStart} AND end_time <= ${monthEnd}
    `;

    // Group trips by delegation_id and calculate additional metrics
    const tripsByDelegation: { [key: number]: Trip[] } = trips.reduce(
      (acc, trip) => {
        if (!acc[trip.delegation_id]) {
          acc[trip.delegation_id] = [];
        }

        const startTime = new Date(trip.start_time);
        const endTime = new Date(trip.end_time);

        // Calculate total time in hours and minutes
        const totalMinutes = differenceInMinutes(endTime, startTime);
        const totalHours = totalMinutes / 60;

        // Calculate distance and average speed
        const distance = trip.end_meter - trip.start_meter;
        const averageSpeed =
          totalHours > 0 ? (distance / totalHours).toFixed(2) : "N/A";

        acc[trip.delegation_id].push({
          start_meter: trip.start_meter,
          end_meter: trip.end_meter,
          start_location: trip.start_location,
          end_location: trip.end_location,
          start_time: trip.start_time,
          end_time: trip.end_time,
          total_time: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
          average_speed: averageSpeed,
        });

        return acc;
      },
      {} as { [key: number]: Trip[] },
    );

    // Combine delegations with their trips and filter out empty ones
    const result: Delegation[] = delegations
      .map((delegation) => ({
        delegation_id: delegation.id,
        trips: tripsByDelegation[delegation.id] || [],
      }))
      .filter((delegation) => delegation.trips.length > 0); // Remove delegations with no trips

    return result;
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to fetch delegations and trips");
  }
}
