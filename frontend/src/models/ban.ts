export type CreateBan = {
  userId: string;
  reason: string;
  expiration: Date;
};

export type MutateBan = {
  id: string;
  expiration: string;
  reason: string;
  userId: string;
  issuedById: string;
};
