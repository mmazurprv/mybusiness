import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

type MenuItem = {
  name: string;
  icon: LucideIcon;
  href: string;
  disabled?: boolean;
};

export default function Menu({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <div className="w-full flex flex-wrap gap-4 justify-center">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.disabled ? "#" : item.href}
          passHref
          className={item.disabled ? "pointer-events-none" : ""}
        >
          <Card
            className={`group transition-colors cursor-pointer flex-1 min-w-40 ${
              item.disabled
                ? "opacity-50 bg-gray-100 cursor-not-allowed"
                : "hover:bg-primary/5"
            }`}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <item.icon
                size={48}
                className={`mb-2 ${
                  item.disabled
                    ? "text-gray-400"
                    : "text-primary group-hover:text-primary/80 transition-colors"
                }`}
              />
              <span className="text-md font-semibold">{item.name}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
