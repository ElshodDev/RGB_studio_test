import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    create(createClientDto: CreateClientDto): Promise<{
        deals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: string;
            amount: number | null;
            clientId: string;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        company: string | null;
    }>;
    findAll(): Promise<({
        deals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: string;
            amount: number | null;
            clientId: string;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        company: string | null;
    })[]>;
    findOne(id: string): Promise<{
        deals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: string;
            amount: number | null;
            clientId: string;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        company: string | null;
    }>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<{
        deals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: string;
            amount: number | null;
            clientId: string;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        company: string | null;
    }>;
    remove(id: string): Promise<{
        deals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: string;
            amount: number | null;
            clientId: string;
        }[];
    } & {
        id: string;
        email: string | null;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        company: string | null;
    }>;
}
