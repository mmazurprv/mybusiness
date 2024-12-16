"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// This would typically come from an API or database
const mockDelegations = [
  {
    id: 1,
    description: "EU Summit",
    startDate: "2023-06-01",
    endDate: "2023-06-05",
    status: "Upcoming",
  },
  {
    id: 2,
    description: "UN General Assembly",
    startDate: "2023-06-15",
    endDate: "2023-06-20",
    status: "Confirmed",
  },
  {
    id: 3,
    description: "G7 Meeting",
    startDate: "2023-07-01",
    endDate: "2023-07-03",
    status: "Completed",
  },
  {
    id: 4,
    description: "Climate Conference",
    startDate: "2023-07-10",
    endDate: "2023-07-15",
    status: "Cancelled",
  },
];

type Delegation = {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
};

export default function DelegationList() {
  const searchParams = useSearchParams();
  const monthParam = searchParams.get("month");

  const filteredDelegations = mockDelegations.filter((delegation) => {
    if (!monthParam) return true;
    const [year, month] = monthParam.split("-");
    const delegationMonth = new Date(delegation.startDate).getMonth() + 1;
    const delegationYear = new Date(delegation.startDate).getFullYear();
    return (
      delegationMonth === parseInt(month) && delegationYear === parseInt(year)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-500";
      case "confirmed":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Delegations</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredDelegations.length === 0 ? (
          <p className="text-center text-gray-500">
            No delegations found for this month.
          </p>
        ) : (
          <ul className="space-y-4">
            {filteredDelegations.map((delegation: Delegation) => (
              <li key={delegation.id}>
                <Link href={`/delegation/${delegation.id}`} className="block">
                  <Card className="hover:bg-gray-50 transition-colors">
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <h3 className="font-semibold">
                          {delegation.description}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(delegation.startDate).toLocaleDateString()}{" "}
                          - {new Date(delegation.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        className={`${getStatusColor(delegation.status)} text-white`}
                      >
                        {delegation.status}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
