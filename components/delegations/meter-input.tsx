import { Input } from "../ui/input";

export default function MeterInput({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <Input type="number" name={name} className="w-full" />
    </div>
  );
}
