import { axiosInstance } from "./baseApi";

async function register(email: string, username: string, password: string) {
  const response = await axiosInstance.post("/register", {
    email: email,
    name: username,
    password: password,
  });
  return response.data;
}

async function login(email: string, password: string) {
  const response = await axiosInstance.post("/login", {
    email: email,
    password: password,
  });
  return response.data;
}

async function logout() {
  const response = await axiosInstance.post("/logout");
  return response.data;
}

export const AuthApi = {
  register,
  login,
  logout,
};
