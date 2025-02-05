import { PrismaClient, Prisma } from '@prisma/client';
import { Result } from '@badrap/result';
import {
  LoginData, PasswordCreate, PasswordEntry,
} from './types';
import { DbResult } from '../types';

class AuthRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async add(data: LoginData) : DbResult<LoginData> {
    try {
      // we just create it here, so we can change it in the transaction and return later
      let login = data;

      await this.prisma.$transaction(
        async (tx) => {
          const existingLogin = await tx.loginSessions.findFirst({
            where: {
              userId: data.userId,
            },
          });

          if (existingLogin) {
            await this.prisma.loginSessions.delete({
              where: {
                id: existingLogin.id,
              },
            });
          }

          login = await tx.loginSessions.create({ data });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
      return Result.ok(login);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async delete(loginId: string): DbResult<LoginData> {
    try {
      const deleted = await this.prisma.loginSessions.delete({
        where: {
          id: loginId,
        },
      });
      return Result.ok(deleted);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async readByUserId(userId: string): DbResult<LoginData | null> {
    try {
      const session = await this.prisma.loginSessions.findFirst({
        where: {
          userId,
        },
      });
      return Result.ok(session);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async readBySessionId(sessionId: string): DbResult<LoginData | null> {
    try {
      const session = await this.prisma.loginSessions.findFirst({
        where: {
          id: sessionId,
        },
      });
      return Result.ok(session);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async addNewPassword(data: PasswordCreate): DbResult<PasswordEntry> {
    try {
      const pwd = await this.prisma.auth.create({ data });
      return Result.ok(pwd);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async getUserPassword(userId: string): DbResult<PasswordEntry> {
    try {
      const pwd = await this.prisma.auth.findFirstOrThrow({
        where: {
          userId,
        },
      });
      return Result.ok(pwd);
    } catch (error) {
      return Result.err(error as Error);
    }
  }
}

export default AuthRepository;
