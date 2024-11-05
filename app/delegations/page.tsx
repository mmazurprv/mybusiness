import {
  CarFront,
  Car,
  Repeat,
  Fuel,
  Home,
  Calendar,
  FileText,
} from "lucide-react";
import Menu from "@/components/menu";

export default function DelegationsPage() {
  const menuItems = [
    {
      name: "Add new trip",
      icon: CarFront,
      href: "/trip/delegations/add-trip",
    },
    {
      name: "Finish trip",
      icon: Car,
      href: "/trip/delegations/finish-trip",
    },
    {
      name: "Delegations",
      icon: Repeat,
      href: "/delegations/delegations_viewer",
    },
    {
      name: "Fuel",
      icon: Fuel,
      href: "/trip/delegations/fuel",
    },
    {
      name: "Report",
      icon: FileText,
      href: "/trip/delegations/report",
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
