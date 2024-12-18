"use server";

import { client } from "@/lib/db/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function endTrip(formData: FormData) {
  // Parse input data
  const delegationId = Number(formData.get("delegation-id"));
  const tripDate = formData.get("end-date") as string;
  const tripTime = formData.get("end-time") as string;
  const endMeter = formData.get("end-meter") as string;
  const endLocation = formData.get("end-location") as string;

  // Debug: Log all parsed data
  console.log("Delegation ID:", delegationId);
  console.log("End Date:", tripDate);
  console.log("End Time:", tripTime);
  console.log("End Meter:", endMeter);
  console.log("End Location:", endLocation);

  // Combine tripDate and tripTime into a single local timestamp
  const endTime = `${tripDate} ${tripTime}:00`;

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
