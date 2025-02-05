import { PropsWithChildren } from "react";
import Navbar from "../components/ui/Navbar.tsx";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const BaseLayout = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  if (auth?.user) {
    return (
      <>
        <Navigate to={auth.user.isOwner ? "/admin" : "/auth"} />)
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen gap-8">
      <Navbar />
      {children}
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

export default BaseLayout;
