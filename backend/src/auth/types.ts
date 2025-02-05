export type LoginData = {
  id?: string;
  expiration: Date;
  userId: string;
};

export type LoggedInUser = {
  id: string;
  email: string;
  isOwner: boolean;
  name: string;
  groupIds: string[];
};

export type PasswordEntry = {
  id: string;
  userId: string;
  pwHash: string;
};

export type PasswordCreate = {
  userId: string;
  pwHash: string;
};
