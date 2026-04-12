"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black text-white">
      <h1 className="text-6xl font-extrabold tracking-[0.2em]">ADMIN</h1>
      <p className="text-sm text-white/60">{user?.email}</p>
      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
