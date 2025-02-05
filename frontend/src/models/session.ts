import { Group } from "./group";

export type Session = {
  id: string;
  subject: string;
  groupId: string;
  repeatPeriod: string;
  duration: number;
  start: Date;
  repetitionEnd: Date | undefined;
  group: Group;
  realDuration: number;
};

export type SessionCreateInput = {
  subject: string;
  groupId: string;
  repeatPeriod: string;
  duration: number;
  start: Date;
  repetitionEnd: Date | undefined;
};
