"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  dark?: boolean;
}

export function Navbar({ dark = false }: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const containerClass = dark
    ? "bg-gray-950 border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-900";

  return (
    <nav className={`border-b px-4 py-3 ${containerClass}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">RGB Studio CRM</span>
          {user?.role && (
            <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
              {user.role}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
              {user.name}
            </span>
          )}
          <Button
            variant={dark ? "outline" : "ghost"}
            size="sm"
            onClick={handleLogout}
            className={dark ? "border-gray-600 text-white hover:bg-gray-700" : ""}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
