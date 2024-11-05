import { Trip } from "@/lib/types";

export default function TripList({ trips }: { trips: Trip[] }) {
  if (trips.length === 0) {
    return (
      <p className="text-center text-gray-500">No trips scheduled for today.</p>
    );
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <div key={trip.id} className="p-4 border rounded-lg shadow-sm">
          <p>
            Delegation ID:{" "}
            <strong>
              {" "}
              {trip.delegation_id} / {trip.id}{" "}
            </strong>
          </p>
          <p>
            Start : <strong> {trip.start_meter ?? "N/A"} </strong> km{" "}
            <strong> {trip.start_location ?? "N/A"} </strong>
          </p>
          <p>
            End : <strong> {trip.end_meter ?? "N/A"} </strong> km{" "}
            <strong> {trip.end_location ?? "N/A"} </strong>
          </p>
          <p></p>
          <p>Description: {trip.trip_description ?? "No description"}</p>
        </div>
      ))}
    </div>
  );
}
