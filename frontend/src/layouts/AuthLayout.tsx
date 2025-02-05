import { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar.tsx";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import RedirectDialog from "../components/dialogs/RedirectDialog.tsx";
import { OpenedDialogStyle } from "../components/dialogs/styles.ts";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (!auth?.user) {
      const timeoutId = setTimeout(() => {
        setShowDialog(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [auth]);

  if (auth?.user?.isOwner) {
    return (
      <>
        <Navigate to={"/admin"} />
      </>
    );
  }

  return (
    <>
      {auth?.user ? (
        <div className="flex flex-col min-h-screen gap-8">
          <Navbar />
          {children}
          <Outlet />
          <ScrollRestoration />
        </div>
      ) : (
        showDialog && (
          <div className={OpenedDialogStyle + " bg-secondary"}>
            <RedirectDialog
              onClose={() => navigate("/login")}
              where={"login page"}
            />
          </div>
        )
      )}
    </>
  );
};

export default AuthLayout;
