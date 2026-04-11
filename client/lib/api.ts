import api from "@/lib/axios";

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
  };
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  return data;
}

export async function register(email: string, password: string, name: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", { email, password, name });
  return data;
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

// ─── Clients ─────────────────────────────────────────────────────────────────

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  createdAt: string;
  deals: Deal[];
}

export interface CreateClientData {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
}

export async function getClients(): Promise<Client[]> {
  const { data } = await api.get<Client[]>("/clients");
  return data;
}

export async function createClient(clientData: CreateClientData): Promise<Client> {
  const { data } = await api.post<Client>("/clients", clientData);
  return data;
}

export async function updateClient(id: string, clientData: Partial<CreateClientData>): Promise<Client> {
  const { data } = await api.patch<Client>(`/clients/${id}`, clientData);
  return data;
}

export async function deleteClient(id: string): Promise<void> {
  await api.delete(`/clients/${id}`);
}

// ─── Deals ───────────────────────────────────────────────────────────────────

export interface Deal {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "active" | "closed";
  amount?: number;
  clientId: string;
  client: Client;
  createdAt: string;
}

export interface CreateDealData {
  title: string;
  description?: string;
  status: "pending" | "active" | "closed";
  amount?: number;
  clientId: string;
}

export async function getDeals(): Promise<Deal[]> {
  const { data } = await api.get<Deal[]>("/deals");
  return data;
}

export async function createDeal(dealData: CreateDealData): Promise<Deal> {
  const { data } = await api.post<Deal>("/deals", dealData);
  return data;
}

export async function updateDeal(id: string, dealData: Partial<CreateDealData>): Promise<Deal> {
  const { data } = await api.patch<Deal>(`/deals/${id}`, dealData);
  return data;
}

export async function deleteDeal(id: string): Promise<void> {
  await api.delete(`/deals/${id}`);
}
