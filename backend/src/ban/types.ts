import { Ban } from "@prisma/client";

export type BanWithRelations = Ban;

export type BanCreateInput = {
  id?: string;
  expiration: string;
  reason: string;
  userId: string;
};

export type BanUpdateInput = {
  id: string;
  expiration: string;
  reason: string;
  userId: string;
};
