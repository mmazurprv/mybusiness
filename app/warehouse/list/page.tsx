import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllItems, Item } from "@/lib/actions/list-items";

export default async function Page() {
  const items: Item[] = await getAllItems();

  return (
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
                <TableHead>Supplier Code</TableHead>
                <TableHead>Memo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.invoice_number}</TableCell>
                  <TableCell>{item.invoice_supplier_code}</TableCell>
                  <TableCell>{item.memo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
