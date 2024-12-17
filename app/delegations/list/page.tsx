import { redirect } from "next/navigation";

export default function ListPage() {
  const currentMonth = getCurrentMonth();
  redirect(`/delegations/list/${currentMonth}`);
}

function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
