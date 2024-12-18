import { Input } from "../ui/input";

export default function DateInput({ name }: { name: string }) {
  const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  return (
    <Input
      type="date"
      name={name}
      className="w-full"
      defaultValue={currentDate}
    />
  );
}
