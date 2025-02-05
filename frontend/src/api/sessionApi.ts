import { BaseApi } from "./baseApi";
import { Session, SessionCreateInput } from "../models/session";

const SESSION_PREFIX = "/sessions";

async function getSession(id: string) {
  return BaseApi.getOne<Session>(`${SESSION_PREFIX}/${id}`);
}

async function getAllSessions() {
  return BaseApi.getAll<Session>(`${SESSION_PREFIX}/all`);
}

async function getHistory() {
  return BaseApi.getAll<Session>(`${SESSION_PREFIX}/history`);
}

async function createSession(session: SessionCreateInput) {
  return BaseApi.createOne<Session>(SESSION_PREFIX, session);
}

async function updateSession(id: string, data: Session) {
  return BaseApi.updateOne<Session>(`${SESSION_PREFIX}/${id}`, data);
}

async function deleteSession(id: string) {
  return BaseApi.deleteOne<Session>(`${SESSION_PREFIX}/${id}`);
}

export const SessionApi = {
  getSession,
  getAllSessions,
  getHistory,
  createSession,
  updateSession,
  deleteSession,
};
