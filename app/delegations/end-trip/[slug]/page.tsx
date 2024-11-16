import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import endTrip from "@/lib/actions/end-trip";

export default async function EndTripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const delegationId = (await params).slug;

  if (isNaN(Number(delegationId))) {
    notFound();
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">End Trip</h1>

      <form action={endTrip} className="space-y-4">
        <div>
          <h1 className="text-gray-700 font-semibold mb-1">
            {"Delegation id: " + delegationId}
          </h1>
        </div>

        <input type="hidden" name="delegation-id" value={delegationId} />

        {/* End Trip Date */}
        <div>
          <Label
            className="text-gray-700 font-semibold mb-1"
            htmlFor="tripDate"
          >
            End Trip Date:
          </Label>
          <Input type="date" name="end-trip-date" className="w-full" />
        </div>

        {/* End Trip Time */}
        <div>
          <Label
            className="text-gray-700 font-semibold mb-1"
            htmlFor="endTripTime"
          >
            End Trip Time:
          </Label>
          <Input type="time" name="end-trip-time" className="w-full" />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="mt-4 w-full">
          End Trip
        </Button>
      </form>
    </div>
  );
}
