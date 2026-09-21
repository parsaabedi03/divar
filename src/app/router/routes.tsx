import { Navigate, type RouteObject } from "react-router";
import { ROUTES } from "@/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";

import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LayoutProvider } from "./MainLayout";
// import { DashboardHomePage } from "@/pages/dashboard/DashboardHomePage";
import { DashboardLayout } from "./DashboardLayout";
import { MyPostsPage } from "@/pages/dashboard/MyPostsPage";
import { SettingsPage } from "@/pages/dashboard/SettingsPage";
import { NewPostPage } from "@/pages/NewPostPage";
import { UserPage } from "@/pages/UserPage";
import { PostDetailPage } from "@/pages/PostDetailPage";
import { AdminCategoriesPage } from "@/pages/dashboard/AdminCategoriesPage";

export const routes: RouteObject[] = [
  {
    element: <LayoutProvider />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      { path: ROUTES.POST_DETAIL, element: <PostDetailPage /> },
      { path: ROUTES.USER, element: <UserPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.NEW_POST, element: <NewPostPage /> },
          {
            element: <DashboardLayout />,
            children: [
              {
                path: ROUTES.DASHBOARD,
                element: <Navigate to={ROUTES.DASHBOARD_MY_POSTS} replace />,
              },
              { path: ROUTES.DASHBOARD_MY_POSTS, element: <MyPostsPage /> },
              { path: ROUTES.DASHBOARD_SETTINGS, element: <SettingsPage /> },
              {
                element: <AdminRoute />,
                children: [
                  {
                    path: ROUTES.DASHBOARD_ADMIN_CATEGORIES,
                    element: <AdminCategoriesPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.AUTH,
    element: <AuthPage />,
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
];
