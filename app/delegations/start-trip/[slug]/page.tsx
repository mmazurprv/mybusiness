import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import startTrip from "@/lib/actions/start-trip";
import StartTripForm from "@/components/delegations/start-trip-form";

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Access the tripId parameter from params
  const delegationIdParam = (await params).slug;

  if (isNaN(Number(delegationIdParam))) {
    notFound();
  }

  const delegationId = Number(delegationIdParam);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Start New Trip for Delegation: {delegationId}
      </h1>
      <StartTripForm delegationId={delegationId} />
    </div>
  );
}
