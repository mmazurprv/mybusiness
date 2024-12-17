import { Car, Warehouse, Factory, FileText } from "lucide-react";
import Menu from "@/components/menu";

export default function HomePage() {
  const menuItems = [
    { name: "Delegations", icon: Car, href: "/delegations" },
    { name: "Warehouse", icon: Warehouse, href: "/warehouse" },
    { name: "Contractors", icon: Factory, href: "/contractors" },
    { name: "Documents", icon: FileText, href: "/documents" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center "></h1>
      <Menu menuItems={menuItems} />
    </div>
  );
}
