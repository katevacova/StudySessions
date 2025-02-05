export type User = {
  id: string;
  email: string;
  isOwner: boolean;
  name: string;
};

export type UsersInTable = {
  banned: boolean;
  banId?: string;
};
