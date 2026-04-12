"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
    if (!isLoading && user?.role === "ADMIN") router.push("/admin");
  }, [isLoading, user, router]);

  if (isLoading || !user || user.role === "ADMIN") return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white text-black">
      <h1 className="text-6xl font-extrabold tracking-[0.2em]">USER</h1>
      <p className="text-sm text-black/55">{user.email}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
