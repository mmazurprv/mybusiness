import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import addTrip from "@/lib/actions/add-trip";

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Access the tripId parameter from params
  const tripId = (await params).slug;

  if (isNaN(Number(tripId))) {
    notFound();
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Trip</h1>

      <form action={addTrip} className="space-y-4">
        {/* Trip Type (Dynamic) */}
        <div>
          <Label
            className="text-gray-700 font-semibold mb-1"
            htmlFor="tripType"
          >
            {"Trip id: " + tripId}
          </Label>
          <div id="tripType" className="text-lg font-medium">
            {tripId}
          </div>
        </div>

        {/* Hidden Input for tripId */}
        <input type="hidden" name="trip-id" value={tripId} />

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

        {/* Trip Time */}
        <div>
          <Label
            className="text-gray-700 font-semibold mb-1"
            htmlFor="tripTime"
          >
            Trip Time:
          </Label>
          <div id="tripTime" className="text-lg font-medium">
            7.5 min
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4 w-full">
          Add Trip
        </Button>
      </form>
    </div>
  );
}
