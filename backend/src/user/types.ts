import { User, Group } from '@prisma/client';

export type UserWithRelations = User & {
  groups: Group[];
  sessionId?: string | null;
};

export type UserCreateInput = {
  id?: string;
  email: string;
  isOwner: boolean;
  name: string;
  groupIds: string[];
};

export type UserUpdateInput = {
  id?: string | undefined;
  email?: string | undefined;
  isOwner?: boolean | undefined;
  name?: string | undefined;
  groupIds?: string[] | undefined;
};

export type UserWithBans = User & {
  banned: boolean;
  banId?: string;
};
