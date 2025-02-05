import { BaseApi } from "./baseApi";
import { Group, GroupBasic } from "../models/group";

const GROUP_PREFIX = "/groups";

async function getGroup(id: string) {
  return BaseApi.getOne<Group>(`${GROUP_PREFIX}/${id}`);
}

async function getAllGroups() {
  return BaseApi.getAll<Group>(`${GROUP_PREFIX}/own`);
}

async function getAllGroupsForAdmin() {
  return BaseApi.getAll<Group>(`${GROUP_PREFIX}/all`);
}

async function createGroup(data: GroupBasic) {
  return BaseApi.createOne<Group>(GROUP_PREFIX, data);
}

async function updateGroup(id: string, data: GroupBasic) {
  return BaseApi.updateOne<Group>(`${GROUP_PREFIX}/${id}`, data);
}

async function deleteGroup(id: string) {
  return BaseApi.deleteOne<Group>(`${GROUP_PREFIX}/${id}`);
}

export const GroupApi = {
  getGroup,
  getAllGroups,
  getAllGroupsForAdmin,
  createGroup,
  updateGroup,
  deleteGroup,
};
