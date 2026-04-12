"use client";

import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getClients, getDeals } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { DealsTable } from "@/components/deals/DealsTable";

export default function AdminPage() {
  const { user } = useAuth();

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const { data: deals = [] } = useQuery({
    queryKey: ["deals"],
    queryFn: getDeals,
  });

  const activeDeals = deals.filter((d) => d.status === "active").length;
  const totalRevenue = deals
    .filter((d) => d.status === "closed")
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar dark />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user?.name}. Manage your CRM data below.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Clients</p>
            <p className="text-4xl font-bold mt-1">{clients.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Total Deals</p>
            <p className="text-4xl font-bold mt-1">{deals.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Active Deals</p>
            <p className="text-4xl font-bold mt-1 text-green-400">{activeDeals}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-400 text-sm">Closed Revenue</p>
            <p className="text-4xl font-bold mt-1 text-blue-400">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Clients CRUD */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Clients</h2>
          <ClientsTable dark />
        </div>

        {/* Deals CRUD */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-semibold mb-4">Deals</h2>
          <DealsTable dark />
        </div>
      </main>
    </div>
  );
}
