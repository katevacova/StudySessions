import { PrismaClient } from '@prisma/client';
import { Result } from '@badrap/result';
import { BanWithRelations, BanCreateInput, BanUpdateInput } from './types';
import { DbResult } from '../types';

class BanRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async add(banData: BanCreateInput, issuedById: string): DbResult<BanWithRelations> {
    try {
      const ban = await this.prisma.ban.create({
        data: {
          expiration: banData.expiration,
          userId: banData.userId,
          reason: banData.reason,
          issuedById,
        },
      });

      return Result.ok(ban);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async findById(banId: string): DbResult<BanWithRelations> {
    try {
      const ban = await this.prisma.ban.findUnique({
        where: { id: banId },
      });
      if (ban) {
        return Result.ok(ban);
      }
      return Result.err(new Error('Ban not found'));
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async findByUserId(uid: string): DbResult<BanWithRelations | null> {
    try {
      const ban = await this.prisma.ban.findFirst({
        where: { userId: uid },
      });
      if (ban) {
        return Result.ok(ban);
      }
      return Result.ok(null);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async update(banId: string, banData: BanUpdateInput): DbResult<BanWithRelations> {
    try {
      const ban = await this.prisma.ban.update({
        where: { id: banId },
        data: banData,
      });

      return Result.ok(ban);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async delete(banId: string): DbResult<BanWithRelations> {
    try {
      const ban = await this.prisma.ban.delete({
        where: { id: banId },
      });
      return Result.ok(ban);
    } catch (error) {
      return Result.err(error as Error);
    }
  }
}

export default BanRepository;
