/* eslint-disable linebreak-style */
import {Prisma, PrismaClient, User} from '@prisma/client';
import {Result} from '@badrap/result';
import {UserCreateInput, UserUpdateInput, UserWithBans, UserWithRelations} from './types';
import {DbResult} from '../types';

class UserRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async add(userData: UserCreateInput, password_hash: string): DbResult<UserWithRelations> {
    try {
      let adjustedUser: UserWithRelations | null = null;
      await this.prisma.$transaction(
        async (tx) => {
          const { groupIds, ...userInfo } = userData;
          const user = await tx.user.create({
            data: {
              ...userInfo,
              groups: {
                create: groupIds.map((groupId) => ({
                  group: { connect: { id: groupId } },
                })),
              },
            },
            include: { groups: { include: { group: true } } },
          });

          adjustedUser = {
            ...user,
            groups: user.groups.map((groupMember) => groupMember.group),
          };

          await tx.auth.create({
            data: {
              userId: user.id,
              pwHash: password_hash,
            },
          });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
      if (adjustedUser) {
        return Result.ok(adjustedUser);
      }
      return Result.err(new Error('Database failed to create new user'));
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async findById(userId: string): DbResult<UserWithRelations | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          groups: {
            include: {
              group: true,
            },
          },
        },
      });
      if (user) {
        const adjustedUser: UserWithRelations = {
          ...user,
          groups: user.groups.map((groupMember) => groupMember.group),
        };
        return Result.ok(adjustedUser);
      }
      return Result.ok(null);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async findByEmail(userEmail: string): DbResult<UserWithRelations | null> {
    try {
      const userResult = await this.prisma.$transaction(
        async (tx) => {
          const user = await tx.user.findUnique({
            where: { email: userEmail },
            include: {
              groups: {
                include: {
                  group: true,
                },
              },
            },
          });
          if (user) {
            const ssid = await tx.loginSessions.findFirst({
              where: {
                userId: user.id,
              },
            });
            const adjustedUser: UserWithRelations = {
              ...user,
              groups: user.groups.map((groupMember) => groupMember.group),
              sessionId: ssid ? ssid.id : null,
            };
            return Result.ok(adjustedUser);
          }
          return Result.ok(null);
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
      return Result.ok(userResult.unwrap());
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async update(
    userId: string,
    userData: UserUpdateInput,
  ): DbResult<UserWithRelations> {
    try {
      const { groupIds, ...userInfo } = userData;
      const updateData: any = {
        ...userInfo,
      };

      if (groupIds) {
        updateData.groups = {
          set: groupIds.map((groupId) => ({
            group: { connect: { id: groupId } },
          })),
        };
      }

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: updateData,
        include: {
          groups: {
            include: {
              group: true,
            },
          },
        },
      });

      const adjustedUser: UserWithRelations = {
        ...user,
        groups: user.groups.map((groupMember) => groupMember.group),
      };

      return Result.ok(adjustedUser);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async delete(userId: string): DbResult<User> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });

      if (user) {
        return Result.ok(user);
      }
      return Result.err(new Error('Database failed to delete user'));
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async getAll(): DbResult<UserWithBans[]> {
    try {
      const users = await this.prisma.user.findMany();
      const newUsers = users.map(async (user) => {
        const userBan = await this.prisma.ban.findFirst({
          where: {
            userId: user.id,
          },
        });
        if (userBan) {
          return {
            ...user,
            banned: true,
            banId: userBan.id,
          };
        }
        return {
          ...user,
          banned: false,
        };
      });

      return Result.ok(await Promise.all(newUsers));
    } catch (error) {
      return Result.err(error as Error);
    }
  }
}

export default UserRepository;
