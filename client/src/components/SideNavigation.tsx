import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  FileText,
  Users,
  Settings,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function SideNavigation() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  const links = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/case/new", label: "New Case", icon: PlusCircle },
    { href: "/", label: "Search Cases", icon: Search },
    { href: "/admin/profile", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-[#1a4480] text-white p-6">
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="mb-8">
          <h1 className="text-xl font-bold">Case Management</h1>
          <p className="text-sm text-white/80">Office of Justice Programs</p>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.href}>
                <Link href={link.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                      location === link.href
                        ? "bg-white/20"
                        : "hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </a>
                </Link>
              </li>
            )})}
        </ul>

        {/* Logout Button - At Bottom */}
        <button
          onClick={() => logoutMutation.mutate()}
          className="mt-auto flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 text-left w-full"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
}
