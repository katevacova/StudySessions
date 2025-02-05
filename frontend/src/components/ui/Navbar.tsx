import { NavLink, useNavigate } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import DeleteMyselfDialog from "../dialogs/DeleteMyselfDialog";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
    navigate("/login");
  };

  if (!auth?.user) {
    return (
      <div className="navbar w-screen sticky top-0 bg-secondary text-base-100 z-40">
        <a className="btn btn-ghost text-xl desktop:px-5">Study Sessions</a>
      </div>
    );
  }

  const [deleteMyself, setDeleteMyselft] = useState<boolean>(false);
  const handleOpenDeleteDialog = () => setDeleteMyselft(true);
  const handleCloseDeleteDialog = () => setDeleteMyselft(false);

  return (
    <div className="navbar w-screen sticky top-0 bg-secondary text-base-100 z-40">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary rounded-box w-52"
          >
            {auth?.user.isOwner ? (
              <>
                <li>
                  <NavLink to={"/admin/users"}>Users</NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/groups"}>Groups</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to={"/auth/homepage"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/auth/sessions"}>Sessions</NavLink>
                </li>
                <li>
                  <NavLink to={"/auth/groups"}>Groups</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl desktop:px-5">Study Sessions</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {auth?.user.isOwner ? (
            <>
              <li>
                <NavLink to={"/admin/users"}>Users</NavLink>
              </li>
              <li>
                <NavLink to={"/admin/groups"}>Groups</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/auth/homepage"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/auth/sessions"}>Sessions</NavLink>
              </li>
              <li>
                <NavLink to={"/auth/groups"}>Groups</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-end gap-2 px-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            {auth?.user?.name}
          </div>
          {!auth?.user?.isOwner && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary rounded-box w-52"
            >
              <li>
                <button onClick={handleOpenDeleteDialog}>Delete profile</button>
              </li>
            </ul>
          )}
        </div>
        <button onClick={handleLogout} className="btn btn-ghost">
          <HiLogout />
        </button>
        {deleteMyself && (
          <DeleteMyselfDialog
            id={auth?.user.id}
            onClose={handleCloseDeleteDialog}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
