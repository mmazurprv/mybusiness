import {
  Car,
  Warehouse,
  Home,
  Factory,
  Calendar,
  FileText,
} from "lucide-react";
import Menu from "@/components/menu";
import packageJson from '@/package.json';

export default function HomePage() {
  const menuItems = [
    { name: "Delegations", icon: Car, href: "/delegations" },
    { name: "Warehouse", icon: Warehouse, href: "/mind" },
    { name: "Contractors", icon: Factory, href: "/mind" },
    { name: "Documents", icon: FileText, href: "/mind" },
    { name: "Calendar", icon: Calendar, href: "/calendar" },
    { name: "Home", icon: Home, href: "/" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        myBusiness {packageJson.version}
      </h1>
      <Menu menuItems={menuItems} />
    </div>
  );
}
