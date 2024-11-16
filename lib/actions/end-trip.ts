"use server";

import { client } from "@/lib/db/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function endTrip(formData: FormData) {
  const delegationId = Number(formData.get("delegation-id"));
  const tripDate = formData.get("end-trip-date");
  const tripTime = new Date().toLocaleTimeString("en-GB", { hour12: false });

  // to implement in the form and get from formdata, now using hard coded value
  const endMeter = 100;
  const endLocation = "Kleszczów";

  if (!tripDate) {
    console.error("Trip date is missing.");
    return;
  }

  // Combine date and time into a timestamp
  const endTime = `${tripDate} ${tripTime}`;

  console.log(`Updating trip record`);

  try {
    await client`
      UPDATE trip 
      SET 
        end_time = ${endTime},
        end_location = ${endLocation},
        end_meter = ${endMeter},
        status = 'completed',
        last_updated = NOW()
      WHERE 
        delegation_id = ${delegationId}
        AND status = 'active'
    `;
  } catch (error) {
    console.error("Failed to end trip:", error);
    return;
  }

  revalidatePath("/delegations");
  redirect("/delegations");
}
