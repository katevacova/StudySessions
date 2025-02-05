import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import GroupsPage from "./pages/groups/GroupsPage";
import CreateGroup from "./pages/groups/CreateGroup";
import EditGroup from "./pages/groups/EditGroup";
import GroupDetail from "./pages/groups/GroupDetail";
import Dashboard from "./pages/Dashboard";
import SessionsPage from "./pages/sessions/SessionsPage";
import PlanSession from "./pages/sessions/PlanSession";
import EditSession from "./pages/sessions/EditSession.tsx";
import AdminUsersPage from "./pages/admin/AdminUsersPage.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import AdminGroupsPage from "./pages/admin/AdminGroupsPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";

const groupRoutes = [
  {
    index: true,
    element: <Navigate to="./info" relative="path" />,
  },
  {
    path: "info",
    element: <GroupDetail />,
  },
  {
    path: "edit",
    element: <EditGroup />,
  },
];

const privateRoutes = [
  {
    index: true,
    element: <Navigate to="./homepage" relative="path" />,
  },
  {
    path: "homepage",
    element: <Dashboard />,
  },
  {
    path: "groups",
    children: [
      {
        path: "",
        element: <GroupsPage />,
      },
      {
        path: "new",
        element: <CreateGroup />,
      },
      {
        path: ":groupId",
        children: groupRoutes,
      },
    ],
  },
  {
    path: "sessions",
    children: [
      {
        path: "",
        element: <SessionsPage />,
      },
      {
        path: "plan",
        element: <PlanSession />,
      },
      {
        path: ":sessionId/edit",
        element: <EditSession />,
      },
    ],
  },
];

const adminRoutes = [
  {
    index: true,
    element: <Navigate to="./users" relative="path" />,
  },
  {
    path: "users",
    element: <AdminUsersPage />,
  },
  {
    path: "groups",
    element: <AdminGroupsPage />,
  },
];

const routes = [
  {
    index: true,
    element: <Navigate to="./register" relative="path" />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: privateRoutes,
  },
  {
    path: "admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
