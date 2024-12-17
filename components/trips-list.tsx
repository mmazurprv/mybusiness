import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDelegationsWithTrips, Delegation } from "@/lib/actions/list-trips";

export default async function DelegationTripsList({
  month,
}: {
  month: string;
}) {
  const delegations: Delegation[] = await getDelegationsWithTrips(month);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Delegations and Trips for {month}</CardTitle>
      </CardHeader>
      <CardContent>
        {delegations.length === 0 ? (
          <p className="text-center text-gray-500">
            No delegations found for this month.
          </p>
        ) : (
          delegations.map((delegation) => (
            <div key={delegation.delegation_id} className="mb-8">
              <h2 className="text-lg font-bold mb-4">
                Delegation ID: {delegation.delegation_id}
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Start Location</TableHead>
                    <TableHead>End Location</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Total Time</TableHead>
                    <TableHead>Average Speed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {delegation.trips.map((trip, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(trip.start_time)}</TableCell>
                      <TableCell>{formatDate(trip.end_time)}</TableCell>
                      <TableCell>{trip.start_location}</TableCell>
                      <TableCell>{trip.end_location}</TableCell>
                      <TableCell>
                        {trip.end_meter - trip.start_meter} km
                      </TableCell>
                      <TableCell>{trip.total_time}</TableCell>
                      <TableCell>{trip.average_speed} km/h</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
