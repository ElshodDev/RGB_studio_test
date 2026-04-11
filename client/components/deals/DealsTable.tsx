"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeals, createDeal, updateDeal, deleteDeal, getClients, Deal, CreateDealData } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

interface DealsTableProps {
  dark?: boolean;
}

const emptyForm: CreateDealData = {
  title: "",
  description: "",
  status: "pending",
  amount: undefined,
  clientId: "",
};

function statusBadgeVariant(status: string): "warning" | "success" | "secondary" | "destructive" {
  if (status === "pending") return "warning";
  if (status === "active") return "success";
  return "secondary";
}

export function DealsTable({ dark = false }: DealsTableProps) {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [form, setForm] = useState<CreateDealData>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: deals = [], isLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: getDeals,
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const createMutation = useMutation({
    mutationFn: createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      toast({ title: "Deal created successfully" });
      setDialogOpen(false);
      setForm(emptyForm);
    },
    onError: () => toast({ title: "Failed to create deal", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateDealData> }) =>
      updateDeal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      toast({ title: "Deal updated successfully" });
      setDialogOpen(false);
      setEditingDeal(null);
      setForm(emptyForm);
    },
    onError: () => toast({ title: "Failed to update deal", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      toast({ title: "Deal deleted" });
      setDeleteId(null);
    },
    onError: () => toast({ title: "Failed to delete deal", variant: "destructive" }),
  });

  const openCreate = () => {
    setEditingDeal(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setForm({
      title: deal.title,
      description: deal.description || "",
      status: deal.status,
      amount: deal.amount,
      clientId: deal.clientId,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: CreateDealData = {
      title: form.title,
      status: form.status,
      clientId: form.clientId,
      ...(form.description ? { description: form.description } : {}),
      ...(form.amount != null ? { amount: Number(form.amount) } : {}),
    };
    if (editingDeal) {
      updateMutation.mutate({ id: editingDeal.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isMutating = createMutation.isPending || updateMutation.isPending;

  const cellClass = dark ? "text-gray-300" : "";
  const headClass = dark ? "text-gray-400" : "";
  const rowClass = dark ? "border-gray-700" : "";

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={openCreate} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Deal
        </Button>
      </div>

      {isLoading ? (
        <p className={dark ? "text-gray-400" : "text-gray-500"}>Loading deals...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className={rowClass}>
              <TableHead className={headClass}>Title</TableHead>
              <TableHead className={headClass}>Client</TableHead>
              <TableHead className={headClass}>Status</TableHead>
              <TableHead className={headClass}>Amount</TableHead>
              <TableHead className={headClass}>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className={`text-center ${dark ? "text-gray-500" : "text-gray-400"}`}>
                  No deals yet. Click &quot;Add Deal&quot; to get started.
                </TableCell>
              </TableRow>
            ) : (
              deals.map((deal) => (
                <TableRow key={deal.id} className={rowClass}>
                  <TableCell className={`font-medium ${cellClass}`}>{deal.title}</TableCell>
                  <TableCell className={cellClass}>{deal.client?.name || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(deal.status)}>
                      {deal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={cellClass}>
                    {deal.amount != null ? `$${Number(deal.amount).toLocaleString()}` : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(deal)}
                        className={dark ? "text-gray-300 hover:text-white hover:bg-gray-700" : ""}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(deal.id)}
                        className={dark ? "text-red-400 hover:text-red-300 hover:bg-gray-700" : "text-red-500 hover:text-red-700"}
                        disabled={deleteMutation.isPending && deleteId === deal.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Create/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingDeal(null);
            setForm(emptyForm);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDeal ? "Edit Deal" : "Add New Deal"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="d-title">Title *</Label>
              <Input
                id="d-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                disabled={isMutating}
                placeholder="Deal title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-description">Description</Label>
              <Input
                id="d-description"
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                disabled={isMutating}
                placeholder="Deal description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-client">Client *</Label>
              <Select
                value={form.clientId}
                onValueChange={(v) => setForm({ ...form, clientId: v })}
                disabled={isMutating}
                required
              >
                <SelectTrigger id="d-client">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-status">Status *</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v as CreateDealData["status"] })}
                disabled={isMutating}
              >
                <SelectTrigger id="d-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="d-amount">Amount ($)</Label>
              <Input
                id="d-amount"
                type="number"
                min={0}
                step="0.01"
                value={form.amount ?? ""}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value ? Number(e.target.value) : undefined })
                }
                disabled={isMutating}
                placeholder="0.00"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={isMutating}>
                Cancel
              </Button>
              <Button type="submit" disabled={isMutating || !form.clientId}>
                {isMutating ? "Saving..." : editingDeal ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Deal</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">Are you sure you want to delete this deal? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={deleteMutation.isPending}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
