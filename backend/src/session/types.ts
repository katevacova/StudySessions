import { Session, Group } from "@prisma/client";

export type SessionWithRelations = Session & {
  group: Group;
};

export type SessionCreateRequestInput = {
  subject: string;
  groupId: string;
  repeatPeriod: string;
  duration: number;
  start: string;
  repetitionEnd?: string | undefined;
};

export type SessionCreateInput = {
  id?: string;
  subject: string;
  groupId: string;
  repeatPeriod: string;
  duration: number;
  realDuration: number;
  start: string;
};

export type SessionCreateManyInput = {
  id?: string;
  subject: string;
  groupId: string;
  repeatSeriesId?: string | null;
  repeatPeriod: string;
  duration: number;
  realDuration: number;
  start: string;
};

export type SessionUpdateInput = {
  id?: string | undefined;
  subject?: string | undefined;
  groupId?: string | undefined;
  repeatSeriesId?: string | null;
  duration?: number | undefined;
  realDuration?: number | undefined;
  start?: string | undefined;
};
