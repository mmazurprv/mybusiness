import startTrip from "@/lib/actions/start-trip";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import LocationInput from "./location-input";
import DateInput from "./date-input";
import TimeInput from "./time-input";
import MeterInput from "./meter-input";

export default function StartTripForm({
  delegationId,
}: {
  delegationId: number;
}) {
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
        <MeterInput name="start-meter" />
      </div>

      {/* Start Location */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">
          Start Location:
        </Label>
        <LocationInput name="start-location" />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-4 w-full">
        Add Trip
      </Button>
    </form>
  );
}
