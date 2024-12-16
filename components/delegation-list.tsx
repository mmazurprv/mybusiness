import { client } from "@/lib/db/postgres";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Delegation = {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
};

// Fetch delegations for the given month
async function getDelegationsForMonth(month: string): Promise<Delegation[]> {
  const [year, monthNumber] = month.split("-");
  const startDate = `${year}-${monthNumber}-01`;
  console.log(startDate);

  const delegations = await client`
    SELECT DISTINCT d.*
    FROM delegation d
    JOIN trip t ON d.id = t.delegation_id
    WHERE t.end_time >= DATE_TRUNC('month', DATE '2024-10-01')
      AND t.end_time < DATE_TRUNC('month', DATE '2024-10-01') + INTERVAL '1 month';
  `;

  return delegations as unknown as Delegation[];
}

export default async function DelegationList(props: {
  searchParams?: { month?: string };
}) {
  const searchParams = props.searchParams || {};
  const month = searchParams.month || new Date().toISOString().slice(0, 7); // Default to the current month in YYYY-MM format

  const delegations = await getDelegationsForMonth(month);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-blue-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Delegations</CardTitle>
      </CardHeader>
      <CardContent>
        {delegations.length === 0 ? (
          <p className="text-center text-gray-500">
            No delegations found for this month.
          </p>
        ) : (
          <ul className="space-y-4">
            {delegations.map((delegation) => (
              <li key={delegation.id}>
                <Link href={`/delegation/${delegation.id}`} className="block">
                  <Card className="hover:bg-gray-50 transition-colors">
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <h3 className="font-semibold">
                          {delegation.description}
                        </h3>
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
