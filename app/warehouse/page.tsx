import Menu from "@/components/menu";
import { ClipboardList, PackagePlus } from "lucide-react";

export default function Page() {
  const menuItems = [
    {
      name: "Add item",
      icon: PackagePlus,
      href: "/warehouse/add-item/",
    },
    {
      name: "List",
      icon: ClipboardList,
      href: "/warehouse/list",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl text-center mb-6">Warehouse </h1>
      <Menu menuItems={menuItems} />
    </div>
  );
}
