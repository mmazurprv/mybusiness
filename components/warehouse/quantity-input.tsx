import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function QuantityInput({ name }: { name: string }) {
  return (
    <div>
      <Label className="text-gray-700 font-semibold mb-1">Quantity</Label>
      <Input name={name} type="number" defaultValue={1} required />
    </div>
  );
}
