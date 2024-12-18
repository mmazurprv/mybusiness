import { Input } from "../ui/input";

export default function TimeInput({ name }: { name: string }) {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }); // HH:mm

  return (
    <Input
      type="time"
      name={name}
      className="w-full"
      defaultValue={currentTime}
    />
  );
}
