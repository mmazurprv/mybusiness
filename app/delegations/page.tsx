import {
  CarFront,
  Car,
  ClipboardList,
  Fuel,
  Home,
  FileText,
} from "lucide-react";
import Menu from "@/components/menu";
import { client } from "@/lib/db/postgres";

export default async function DelegationsPage() {
  let activeDelegation = (
    await client`
      SELECT id FROM delegation 
      WHERE status = 'active' 
      LIMIT 1
    `
  )[0];

  if (!activeDelegation) {
    activeDelegation = (
      await client`
        INSERT INTO delegation (user_id) 
        VALUES (1827463526172836) 
        RETURNING id
      `
    )[0];
    console.log("Created new delegation", activeDelegation);
  }

  // Add query to check for active trip
  const activeTrip = (
    await client`
      SELECT id FROM trip 
      WHERE delegation_id = ${activeDelegation.id} 
      AND status = 'active' 
      LIMIT 1
    `
  )[0];

  const menuItems = [
    {
      name: "Start trip",
      icon: CarFront,
      href: `/delegations/start-trip/${activeDelegation.id}`,
      disabled: !!activeTrip,
    },
    {
      name: "End trip",
      icon: Car,
      href: `/delegations/end-trip/${activeDelegation.id}`,
      disabled: !activeTrip,
    },
    {
      name: "Delegations",
      icon: ClipboardList,
      href: "/delegations/list",
    },
    {
      name: "Fuel",
      icon: Fuel,
      href: "/delegations/fuel",
    },
    { name: "Home", icon: Home, href: "/" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-2">Delegations</h1>
      <h2 className="text-xl text-center mb-4">
        Delegation ID: {activeDelegation.id}
      </h2>
      <Menu menuItems={menuItems} />
    </div>
  );
}
