import { Input } from "../ui/input";

export default function MeterInput({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        name={name}
        defaultValue={defaultValue}
        className="w-full"
      />
    </div>
  );
}
