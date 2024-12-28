import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function TitleInput({ name }: { name: string }) {
  return (
    <div>
      <Label className="text-gray-700 font-semibold mb-1">Title</Label>
      <Input name={name} type="text" required />
    </div>
  );
}
