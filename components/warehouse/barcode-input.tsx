import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function BarcodeInput({ name }: { name: string }) {
  return (
    <div>
      <Label className="text-gray-700 font-semibold mb-1">Barcode</Label>
      <Input id={name} name={name} type="number" required />
    </div>
  );
}
