import { BaseApi } from "./baseApi";
import { User } from "../models/user";

const USERS_PREFIX = "/users";

async function getMyself() {
  return BaseApi.getOne<User>(`${USERS_PREFIX}/self`);
}

async function getAllUsers() {
  return BaseApi.getAll<User>(`${USERS_PREFIX}/all`);
}

async function deleteUser(id: string) {
  return BaseApi.deleteOne<User>(`${USERS_PREFIX}/${id}`);
}

export const UserApi = {
  getMyself,
  getAllUsers,
  deleteUser,
};
