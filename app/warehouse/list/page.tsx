import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllItems, Item } from "@/lib/actions/list-items";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const items: Item[] = await getAllItems();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.unit_price || 0) * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              Total quantity of all items
            </p>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPrice.toFixed(2)} PLN
            </div>
            <p className="text-xs text-muted-foreground">
              Total value of all items
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full">
        <CardContent className="mt-6">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">No items found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Invoice No.</TableHead>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead className="text-right">Unit price</TableHead>
                  <TableHead className="text-right">Total price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.invoice_number}</TableCell>
                    <TableCell>{item.supplier_name || "Unknown"}</TableCell>
                    <TableCell className="text-right">
                      {item.unit_price}
                    </TableCell>
                    <TableCell className="text-right">
                      {(item.unit_price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={`/warehouse/edit/${item.id}`}
                          aria-label={`Edit ${item.title}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
