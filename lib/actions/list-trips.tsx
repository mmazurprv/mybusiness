"use server";

import { client } from "@/lib/db/postgres";
import { format, parseISO, startOfMonth, endOfMonth } from "date-fns";

export async function getDelegationsWithTrips(month: string) {
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

    // Group trips by delegation_id
    const tripsByDelegation = trips.reduce((acc, trip) => {
      if (!acc[trip.delegation_id]) {
        acc[trip.delegation_id] = [];
      }
      acc[trip.delegation_id].push({
        start_meter: trip.start_meter,
        end_meter: trip.end_meter,
        start_location: trip.start_location,
        end_location: trip.end_location,
        start_time: trip.start_time,
        end_time: trip.end_time,
      });
      return acc;
    }, {});

    // Combine delegations with their trips
    const result = delegations.map((delegation) => ({
      delegation_id: delegation.id,
      trips: tripsByDelegation[delegation.id] || [],
    }));

    return result;
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Failed to fetch delegations and trips");
  }
}

export async function mockGetDelegationsWithTrips() {
  return [
    {
      delegation_id: 1,
      trips: [
        {
          start_meter: 100,
          end_meter: 200,
          start_location: "Warsaw",
          end_location: "Lodz",
          start_time: "2024-01-01T10:00:00",
          end_time: "2024-01-01T12:00:00",
        },
        {
          start_meter: 200,
          end_meter: 300,
          start_location: "Lodz",
          end_location: "Krakow",
          start_time: "2024-01-02T08:00:00",
          end_time: "2024-01-02T11:00:00",
        },
      ],
    },
    {
      delegation_id: 2,
      trips: [
        {
          start_meter: 150,
          end_meter: 250,
          start_location: "Gdansk",
          end_location: "Poznan",
          start_time: "2024-01-03T09:00:00",
          end_time: "2024-01-03T13:00:00",
        },
      ],
    },
  ];
}
