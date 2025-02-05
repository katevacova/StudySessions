import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import router from "./router";
import AuthProvider from "./hooks/useAuth";

export const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <SnackbarProvider />
      </AuthProvider>
    </>
  );
};
