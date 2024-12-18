"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { client } from "../db/postgres";

export default async function startTrip(formData: FormData) {
  // Parse input data
  const delegationId = Number(formData.get("delegation-id"));
  const tripDate = formData.get("start-date") as string;
  const tripTime = formData.get("start-time") as string;
  const startMeter = formData.get("start-meter") as string;
  const startLocation = formData.get("start-location") as string;

  // Use a hardcoded carId and userId for now
  const carId = 1; // Traffic
  const userId = 1827463526172836; // Michal

  // Combine tripDate and tripTime into a single local timestamp
  const startTime = `${tripDate} ${tripTime}:00`;

  try {
    await client`INSERT INTO trip (
      delegation_id,
      start_time,
      start_location,
      start_meter,
      car_id,
      user_id
    ) VALUES (
      ${delegationId},
      ${startTime},
      ${startLocation},
      ${startMeter},
      ${carId},
      ${userId}
    )`;
  } catch (error) {
    console.error("Error inserting trip:", error);
    return;
  }

  revalidatePath("/delegations");
  redirect("/delegations");
}
