import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import LocationInput from "./location-input";
import DateInput from "./date-input";
import TimeInput from "./time-input";
import endTrip from "@/lib/actions/end-trip";

export default function EndTripForm({
  delegationId,
}: {
  delegationId: number;
}) {
  return (
    <form action={endTrip} className="space-y-4">
      {/* Hidden Input for delegationId */}
      <input type="hidden" name="delegation-id" value={delegationId} />

      {/* End Date */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">End Date:</Label>
        <DateInput name="end-date" />
      </div>

      {/* End Time */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">End Time:</Label>
        <TimeInput name="end-time" />
      </div>

      {/* End Meter */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">End Meter:</Label>
        <Input type="number" name="end-meter" className="w-full" />
      </div>

      {/* End Location */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">
          End Location:
        </Label>
        <LocationInput name="end-location" />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-4 w-full">
        End Trip
      </Button>
    </form>
  );
}
