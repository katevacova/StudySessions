import { User } from "./user";
import { Session } from "./session";

export type GroupBasic = {
  name: string;
  members: string[];
};

export type Group = {
  id: string;
  name: string;
  ownerId: string;
  members: User[];
  sessions: Session[];
};
