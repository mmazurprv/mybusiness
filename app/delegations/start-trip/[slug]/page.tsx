import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import startTrip from "@/lib/actions/start-trip";

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Access the tripId parameter from params
  const delegationId = (await params).slug;

  if (isNaN(Number(delegationId))) {
    notFound();
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Trip</h1>

      <form action={startTrip} className="space-y-4">
        {/* Trip Type (Dynamic) */}
        <div>
          <h1
            className="text-gray-700 font-semibold mb-1"
          >
            {"Delegation id: " + delegationId}
          </h1>
        </div>

        {/* Hidden Input for delegationId */}
        <input type="hidden" name="delegation-id" value={delegationId} />

        {/* Trip Date */}
        <div>
          <Label
            className="text-gray-700 font-semibold mb-1"
            htmlFor="tripDate"
          >
            Trip Date:
          </Label>
          <Input type="date" name="trip-date" className="w-full" />
        </div>

        {/* Start Trip Time */}
        <div>
          <Label
            className="text-gray-700 font-semibold mb-1"
            htmlFor="startTripTime"
          >
            Start Trip Time:
          </Label>
          <Input type="time" name="start-trip-time" className="w-full" />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4 w-full">
          Add Trip
        </Button>
      </form>
    </div>
  );
}
