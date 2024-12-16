import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";
import packageJson from "@/package.json";

export function Navbar() {
  const links = [
    { href: "/delegations", label: "Delegations" },
    { href: "/warehouse", label: "Magazine" },
  ];

  return (
    <nav>
      <div className="flex justify-between h-16">
        <div className="flex">
          <Link href="/" className=" flex items-center">
            <BriefcaseBusiness className="h-8 w-8" />
            <span className="ml-2 text-xl font-semibold">MyBusiness</span>
            <span className="ml-1 text-sm text-gray-500">
              v{packageJson.version}
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-transparent text-gray-800 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
