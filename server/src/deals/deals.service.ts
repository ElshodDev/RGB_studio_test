import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDealDto, UpdateDealDto } from './dto';

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  async create(createDealDto: CreateDealDto) {
    return this.prisma.deal.create({
      data: createDealDto,
      include: { client: true },
    });
  }

  async findAll() {
    return this.prisma.deal.findMany({
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const deal = await this.prisma.deal.findUnique({
      where: { id },
      include: { client: true },
    });

    if (!deal) {
      throw new NotFoundException('Deal not found');
    }

    return deal;
  }

  async update(id: string, updateDealDto: UpdateDealDto) {
    await this.findOne(id);

    return this.prisma.deal.update({
      where: { id },
      data: updateDealDto,
      include: { client: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.deal.delete({
      where: { id },
      include: { client: true },
    });
  }
}
