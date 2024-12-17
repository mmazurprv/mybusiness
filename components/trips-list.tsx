"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getDelegationsWithTrips,
  mockGetDelegationsWithTrips,
} from "@/lib/actions/list-trips";

// Types for delegation and trip data
interface Trip {
  start_meter: number;
  end_meter: number;
  start_location: string;
  end_location: string;
  start_time: string;
  end_time: string;
}

interface Delegation {
  delegation_id: number;
  trips: Trip[];
}

export default async function DelegationTripsList() {
  const delegations: Delegation[] = await getDelegationsWithTrips("2024-10");

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Delegations and Trips</CardTitle>
      </CardHeader>
      <CardContent>
        {delegations.map((delegation) => (
          <div key={delegation.delegation_id} className="mb-8">
            <h2 className="text-lg font-bold mb-4">
              Delegation ID: {delegation.delegation_id}
            </h2>
            {delegation.trips.length === 0 ? (
              <p className="text-center text-gray-500">
                No trips found for this delegation.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Start Location</TableHead>
                    <TableHead>End Location</TableHead>
                    <TableHead>Start Meter</TableHead>
                    <TableHead>End Meter</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {delegation.trips.map((trip, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(trip.start_time)}</TableCell>
                      <TableCell>{formatDate(trip.end_time)}</TableCell>
                      <TableCell>{trip.start_location}</TableCell>
                      <TableCell>{trip.end_location}</TableCell>
                      <TableCell>{trip.start_meter}</TableCell>
                      <TableCell>{trip.end_meter}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
