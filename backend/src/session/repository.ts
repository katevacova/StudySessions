/* eslint-disable linebreak-style */
import { Prisma, PrismaClient, Session } from '@prisma/client';
import { Result } from '@badrap/result';
import {
  SessionWithRelations,
  SessionCreateInput,
  SessionUpdateInput,
  SessionCreateManyInput,
} from './types';
import { DbResult } from '../types';

class SessionRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async addMany(sessionsData: SessionCreateManyInput[]): DbResult<SessionWithRelations[]> {
    try {
      const createdSessions = await this.prisma.$transaction(
        sessionsData.map((session) => this.prisma.session.create({
          data: {
            ...session,
            repeatSeriesId: session.repeatSeriesId || null,
          },
          include: { group: true },
        })),
      );

      const sessionsWithRelations = await Promise.all(
        createdSessions.map(async (session) => this.prisma.session.findUnique({
          where: { id: session.id },
          include: { group: true },
        }) as Promise<SessionWithRelations>),
      );

      return Result.ok(sessionsWithRelations);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async add(sessionData: SessionCreateInput): DbResult<SessionWithRelations> {
    try {
      const session = await this.prisma.session.create({
        data: sessionData,
        include: { group: true },
      });

      return Result.ok(session as SessionWithRelations);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async findById(sessionId: string): DbResult<SessionWithRelations> {
    try {
      const session = await this.prisma.session.findUnique({
        where: {
          id: sessionId,
        },
        include: {
          group: true,
        },
      });
      if (session) {
        return Result.ok(session as SessionWithRelations);
      }
      return Result.err(new Error());
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async update(
    sessionId: string,
    sessionData: SessionUpdateInput,
  ): DbResult<SessionWithRelations> {
    try {
      const session = await this.prisma.session.update({
        where: { id: sessionId },
        data: sessionData as Prisma.SessionUncheckedUpdateInput,
        include: { group: true },
      });

      return Result.ok(session as SessionWithRelations);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async delete(sessionId: string): DbResult<Session> {
    try {
      const session = await this.prisma.session.delete({
        where: { id: sessionId },
      });
      return Result.ok(session);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async getAll(
    userId: string
  ): DbResult<SessionWithRelations[] | null> {
    try {
      const now = new Date();
      const sessions = await this.prisma.session.findMany({
        where: {
          start: {
            gt: now,
          },
          group: {
            members: {
              some: {
                userId,
              },
            },
          },
        },
        include: {
          group: true,
        },
        orderBy: {
          start: 'asc',
        },
      });

      if (sessions) {
        return Result.ok(sessions);
      }
      return Result.ok(null);
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  async getAllPast(userId: string) {
    try {
      const now = new Date();
      const sessions = await this.prisma.session.findMany({
        where: {
          start: {
            lt: now,
          },
          group: {
            members: {
              some: {
                userId,
              },
            },
          },
        },
        include: {
          group: true,
        },
        orderBy: {
          start: 'desc',
        },
      });

      if (sessions) {
        return Result.ok(sessions);
      }
      return Result.ok(null);
    } catch (error) {
      return Result.err(error as Error);
    }
  }
}

export default SessionRepository;
