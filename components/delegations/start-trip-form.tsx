import startTrip from "@/lib/actions/start-trip";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function StartTripForm({
  delegationId,
}: {
  delegationId: number;
}) {
  // Get current date and time in the appropriate format
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); // HH:mm

  return (
    <form action={startTrip} className="space-y-4">
      {/* Hidden Input for delegationId */}
      <input type="hidden" name="delegation-id" value={delegationId} />

      {/* Start Date */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">Start Date:</Label>
        <Input
          type="date"
          name="start-date"
          className="w-full"
          defaultValue={currentDate}
        />
      </div>

      {/* Start Time */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">Start Time:</Label>
        <Input
          type="time"
          name="start-time"
          className="w-full"
          defaultValue={currentTime}
        />
      </div>

      {/* Start Meter */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">Start Meter:</Label>
        <Input type="number" name="start-meter" className="w-full" />
      </div>

      {/* Start Location */}
      <div>
        <Label className="text-gray-700 font-semibold mb-1">
          Start Location:
        </Label>
        <Input type="text" name="start-location" className="w-full" />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-4 w-full">
        Add Trip
      </Button>
    </form>
  );
}
