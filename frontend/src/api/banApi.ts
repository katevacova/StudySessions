import { BaseApi } from "./baseApi";
import { CreateBan, MutateBan } from "../models/ban";

const BANS_PREFIX = "/bans";

async function getBanByUserId(id: string) {
  return BaseApi.getOne<MutateBan>(`${BANS_PREFIX}/user/${id}`);
}

async function createBan(ban: CreateBan) {
  return BaseApi.createOne<CreateBan>(BANS_PREFIX, ban);
}

async function updateBan(id: string, ban: MutateBan) {
  return BaseApi.updateOne<MutateBan>(`${BANS_PREFIX}/${id}`, ban);
}

async function deleteBan(id: string) {
  return BaseApi.deleteOne<MutateBan>(`${BANS_PREFIX}/${id}`);
}

export const BanApi = {
  getBanByUserId,
  createBan,
  updateBan,
  deleteBan,
};
