/* eslint-disable linebreak-style */
import { Group, Session, User } from "@prisma/client";

export type GroupWithRelations = Group & {
  members: User[];
  sessions: Session[];
};

export type GroupCreateInput = {
  id?: string;
  name: string;
  members: string[];
};

export type GroupUpdateInput = {
  id?: string | undefined;
  name?: string | undefined;
  ownerId?: string | undefined;
  members?: string[] | undefined;
};
