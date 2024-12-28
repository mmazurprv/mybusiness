import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function BrandInput({ name }: { name: string }) {
  return (
    <div>
      <Label className="text-gray-700 font-semibold mb-1">Brand</Label>
      <Input name={name} type="text" required />
    </div>
  );
}
