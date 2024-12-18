import startTrip from "@/lib/actions/start-trip";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import LocationInput from "./location-input";
import DateInput from "./date-input";
import TimeInput from "./time-input";
import MeterInput from "./meter-input";
import { client } from "@/lib/db/postgres";

async function getSuggestions(delegationId: number) {
  const [result] = await client`
    SELECT end_meter, end_location
    FROM trip
    WHERE end_time IS NOT NULL
    ORDER BY end_time DESC
    LIMIT 1;
  `;

  return {
    meter: result.end_meter,
    location: result.end_location,
  };
}

export default async function StartTripForm({
  delegationId,
}: {
  delegationId: number;
}) {
  const suggestions = await getSuggestions(delegationId);
  return (
    <form action={startTrip} className="space-y-4">
      {/* Hidden Input for delegationId */}
      <input type="hidden" name="delegation-id" value={delegationId} />

      {/* Start Date */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">Start Date:</Label>
        <DateInput name="start-date" />
      </div>

      {/* Start Time */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">Start Time:</Label>
        <TimeInput name="start-time" />
      </div>

      {/* Start Meter */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">Start Meter:</Label>
        <MeterInput name="start-meter" defaultValue={suggestions.meter} />
      </div>

      {/* Start Location */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">
          Start Location:
        </Label>
        <LocationInput
          name="start-location"
          defaultValue={suggestions.location}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-4 w-full">
        Add Trip
      </Button>
    </form>
  );
}
