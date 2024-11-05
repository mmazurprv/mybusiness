import { CarFront, Car, Repeat, Fuel, Home, FileText } from "lucide-react";
import Menu from "@/components/menu";

export default function DelegationsPage() {
  const menuItems = [
    {
      name: "Add new trip",
      icon: CarFront,
      href: "/delegations/add-trip",
    },
    {
      name: "Finish trip",
      icon: Car,
      href: "/delegations/finish-trip",
    },
    {
      name: "Delegations",
      icon: Repeat,
      href: "/delegations/delegations_viewer",
    },
    {
      name: "Fuel",
      icon: Fuel,
      href: "/delegations/fuel",
    },
    {
      name: "Report",
      icon: FileText,
      href: "/delegations/report",
    },
    { name: "Home", icon: Home, href: "/" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Delegations</h1>
      <Menu menuItems={menuItems} />
    </div>
  );
}
