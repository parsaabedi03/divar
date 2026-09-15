import { Navigate, type RouteObject } from "react-router";
import { ROUTES } from "@/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";

import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LayoutProvider } from "@/shared/components/layouts";
// import { DashboardHomePage } from "@/pages/dashboard/DashboardHomePage";
import { DashboardLayout } from "./DashboardLayout";
import { MyPostsPage } from "@/pages/dashboard/MyPostsPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import { NewPostPage } from "@/pages/NewPostPage";
import { UserPage } from "@/pages/UserPage";

export const routes: RouteObject[] = [
  {
    element: <LayoutProvider />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.NEW_POST, element: <NewPostPage /> },
          {
            element: <DashboardLayout />,
            children: [
              {
                path: ROUTES.DASHBOARD,
                element: <Navigate to={ROUTES.DASHBOARD_MY_POSTS} />,
              },
              { path: ROUTES.DASHBOARD_MY_POSTS, element: <MyPostsPage /> },
              { path: ROUTES.DASHBOARD_SETTINGS, element: <SettingsPage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: ROUTES.USER, element: <UserPage /> },
  {
    path: ROUTES.AUTH,
    element: <AuthPage />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
];
