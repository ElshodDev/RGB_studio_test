"use client";

import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getClients, getDeals } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: clients = [], isLoading: loadingClients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const { data: deals = [], isLoading: loadingDeals } = useQuery({
    queryKey: ["deals"],
    queryFn: getDeals,
  });

  const statusVariant = (status: string) => {
    if (status === "active") return "success";
    if (status === "pending") return "warning";
    return "secondary";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-gray-500 mt-1">Here&apos;s an overview of your CRM data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{loadingClients ? "..." : clients.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{loadingDeals ? "..." : deals.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingClients ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Company</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-gray-400">
                        No clients found
                      </TableCell>
                    </TableRow>
                  ) : (
                    clients.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>{c.email || "—"}</TableCell>
                        <TableCell>{c.phone || "—"}</TableCell>
                        <TableCell>{c.company || "—"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deals</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDeals ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deals.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-gray-400">
                        No deals found
                      </TableCell>
                    </TableRow>
                  ) : (
                    deals.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium">{d.title}</TableCell>
                        <TableCell>{d.client?.name || "—"}</TableCell>
                        <TableCell>
                          <Badge variant={statusVariant(d.status) as "success" | "warning" | "secondary"}>
                            {d.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{d.amount != null ? `$${d.amount.toLocaleString()}` : "—"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
