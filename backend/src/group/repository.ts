/* eslint-disable linebreak-style */
import {PrismaClient} from '@prisma/client';
import {Result} from '@badrap/result';
import {GroupCreateInput, GroupUpdateInput, GroupWithRelations} from './types';
import {DbResult} from '../types';

class GroupRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async add(groupData: GroupCreateInput, ownerId: string): DbResult<GroupWithRelations> {
    try {
      const { members, ...groupInfo } = groupData;
      const group = await this.prisma.group.create({
        data: {
          ...groupInfo,
          ownerId,
          members: {
            create: members.map((email) => ({
              user: { connect: { email } },
            })),
          },
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
          sessions: true,
        },
      });

      const adjustedGroup: GroupWithRelations = {
        ...group,
        members: group.members.map((member) => member.user),
      };

      return Result.ok(adjustedGroup);
    } catch (error) {
      return Result.err(new Error());
    }
  }

  async findById(groupId: string): DbResult<GroupWithRelations> {
    try {
      const group = await this.prisma.group.findUnique({
        where: { id: groupId },
        include: {
          members: {
            include: {
              user: true,
            },
          },
          sessions: true,
        },
      });
      if (group) {
        const adjustedGroup: GroupWithRelations = {
          ...group,
          members: group.members.map((member) => member.user),
        };
        return Result.ok(adjustedGroup);
      }
      return Result.err(new Error());
    } catch (error) {
      return Result.err(new Error());
    }
  }

  async update(
    groupId: string,
    groupData: GroupUpdateInput,
  ): DbResult<GroupWithRelations> {
    try {
      const { members, ...groupInfo } = groupData;
      const updateData: any = { ...groupInfo };

      if (members) {
        // purge old connections
        await this.prisma.groupMembers.deleteMany({
          where: {
            groupId,
          },
        });
        // create new ones
        const result = members.map(async (email) => {
          const user = await this.prisma.user.findFirst({
            where: {
              email,
            },
          });
          await this.prisma.groupMembers.create({
            data: {
              groupId,
              userId: user!.id,
            },
          });
        });
        await Promise.all(result);
      }

      const group = await this.prisma.group.update({
        where: { id: groupId },
        data: updateData,
        include: {
          members: {
            include: {
              user: true,
            },
          },
          sessions: true,
        },
      });

      const adjustedGroup: GroupWithRelations = {
        ...group,
        members: group.members.map((member) => member.user),
      };

      return Result.ok(adjustedGroup);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async delete(groupId: string): DbResult<GroupWithRelations> {
    try {
      await this.prisma.groupMembers.deleteMany({
        where: { groupId },
      });
      const group = await this.prisma.group.delete({
        where: { id: groupId },
        include: {
          members: {
            include: {
              user: true,
            },
          },
          sessions: true,
        },
      });
      const adjustedGroup: GroupWithRelations = {
        ...group,
        members: group.members.map((member) => member.user),
      };

      return Result.ok(adjustedGroup);
    } catch (error) {
      return Result.err(new Error());
    }
  }

  async getAll(): DbResult<GroupWithRelations[] | null> {
    try {
      const groups = await this.prisma.group.findMany({
        include: {
          members: {
            include: {
              user: true,
            },
          },
          sessions: true,
        },
      });

      if (groups) {
        const newGroups = groups.map((group) => {
          const adjustedGroup: GroupWithRelations = {
            ...group,
            members: group.members.map((member) => member.user),
          };
          return adjustedGroup;
        });
        return Result.ok(newGroups);
      }
      return Result.ok(null);
    } catch (error) {
      return Result.err(new Error());
    }
  }

  async getAllOwn(userId: string): DbResult<GroupWithRelations[] | null> {
    try {
      const groups = await this.prisma.group.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
          sessions: true,
        },
      });

      if (groups) {
        const newGroups = groups.map((group) => {
          const adjustedGroup: GroupWithRelations = {
            ...group,
            members: group.members.map((member) => member.user),
          };
          return adjustedGroup;
        });
        return Result.ok(newGroups);
      }
      return Result.ok(null);
    } catch (error) {
      return Result.err(new Error());
    }
  }
}

export default GroupRepository;
