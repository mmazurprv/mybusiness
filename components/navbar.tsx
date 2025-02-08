"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BriefcaseBusiness, Truck, Warehouse } from "lucide-react";
import packageJson from "@/package.json";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/delegations", label: "Delegations", icon: Truck },
    { href: "/warehouse", label: "Warehouse", icon: Warehouse },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto ">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-end">
              <BriefcaseBusiness className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                MyBusiness
              </span>
              <span className="ml-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {packageJson.version}
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex tems-end gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-gray-700 hover:text-foreground p-2 hover:bg-slate-50 rounded-md text-sm transition-colors duration-150 ease-in-out flex items-center",
                    { "font-bold": pathname.startsWith(link.href) },
                  )}
                >
                  <link.icon className="h-6 w-6 mr-0 sm:mr-2" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
