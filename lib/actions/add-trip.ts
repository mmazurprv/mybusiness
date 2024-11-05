"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { client } from "../db/postgres";

export default async function addTrip(formData: FormData) {
  // const tripType = formData.get("trip-date")?.toString();
  //
  const tripId = formData.get("trip-id")?.toString();
  const tripDate = formData.get("trip-date")?.toString();
  const tripTime = new Date().toLocaleTimeString("en-GB", { hour12: false });

  if (!tripDate) {
    console.error("Trip date is missing.");
    return;
  }

  // Combine tripDate and tripTime into a single timestamp string
  const tripDateTime = `${tripDate} ${tripTime}`;

  console.log(
    `Inserting new trip record ${tripId}: DateTime - ${tripDateTime} Span - ${timespan} sec.`,
  );

  try {
    await client`INSERT INTO trip (
      delegation_id,
      start_time,
      end_time,
      start_location,
      end_location,
      trip_description,
      start_meter,
      end_meter,
      car_id,
      user_id,
      last_updated,
      status
    ) VALUES (
      ${delegationId},
      ${tripStartTime},
      ${tripEndTime},
      ${tripStartLocation},
      ${tripEndLocation},
      ${tripDescription},
      ${tripStartMeter},
      ${tripiEndMeter},
      1,
      1827463526172836,
      NOW(),
      'completed'
    )`;
  } catch (error) {
    console.error("Error inserting trip:", error);
  }

  revalidatePath("/trip");
  redirect("/trip");
}
