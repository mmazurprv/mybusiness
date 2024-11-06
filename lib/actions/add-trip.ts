"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { client } from "../db/postgres";

export default async function addTrip(formData: FormData) {
  // const tripType = formData.get("trip-date")?.toString();
  //
  const delegationId = formData.get("delegation-id")

  const tripDate = formData.get("trip-date")
  const tripTime = new Date().toLocaleTimeString("en-GB", { hour12: false });

  // to implement in the form and get from formdata, now using hard coded value
  const carId = 1 // trafic
  const startMeter = 10
  const startLocation = "Kleszczów"

  if (!tripDate) {
    console.error("Trip date is missing.");
    return;
  }

  // Combine tripDate and tripTime into a single timestamp string
  const startTime = `${tripDate} ${tripTime}`;

  console.log(
    `Inserting new trip record `,
  );

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
      1827463526172836
    )`;
  } catch (error) {
    console.error("Error inserting trip:", error);
    return
  }

  revalidatePath("/delegations");
  redirect("/delegations");
}
