import { PropsWithChildren, useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { OpenedDialogStyle } from "../components/dialogs/styles";
import RedirectDialog from "../components/dialogs/RedirectDialog";

const AdminLayout = ({ children }: PropsWithChildren) => {
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
  }, []);

  return (
    <>
      {auth?.user?.isOwner ? (
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
              onClose={() => navigate("/auth")}
              where={"user page"}
            />
          </div>
        )
      )}
    </>
  );
};

export default AdminLayout;
