import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
});

async function getOne<T>(path: string) {
  const response = await axiosInstance.get<T>(path);
  return response.data;
}

async function getAll<T>(path: string, config?: AxiosRequestConfig) {
  const response = await axiosInstance.get<T[]>(path, config);
  return response.data;
}

async function createOne<T>(path: string, data: unknown) {
  const response = await axiosInstance.post<T>(path, data);
  return response.data;
}

async function updateOne<T>(path: string, data: unknown) {
  const response = await axiosInstance.put<T>(path, data);
  return response.data;
}

async function deleteOne<T>(path: string) {
  const response = await axiosInstance.delete<T>(path);
  return response.data;
}

export const BaseApi = {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
