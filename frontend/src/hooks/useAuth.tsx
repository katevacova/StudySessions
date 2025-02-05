import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { LoginProps } from "./types";
import { axiosInstance } from "../api/baseApi";
import { User } from "../models/user";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import useLogout from "./useLogout.ts";

interface AuthContextType {
  user: User | undefined;
  login: (values: LoginProps) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { mutate: logOut } = useLogout();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/users/self");
      const userData = await response.data;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const loginAction = async (values: LoginProps) => {
    try {
      const response = await axiosInstance.post("/login", {
        email: values.email,
        password: values.password,
      });

      const loggedUser = response.data.item;
      localStorage.setItem("sessionId", loggedUser.sessionId);
      setUser(loggedUser);
    } catch (error) {
      const err = error as AxiosError<{
        error: string;
        data: { message: string };
      }>;
      if (err.response) {
        enqueueSnackbar(err.response.data.data.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("An unexpected error occurred", {
          variant: "error",
        });
      }
    }
  };

  const logoutAction = () => {
    logOut();
    localStorage.removeItem("sessionId");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ user, login: loginAction, logout: logoutAction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
