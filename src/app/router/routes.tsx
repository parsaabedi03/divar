import type { RouteObject } from "react-router";
import { ROUTES } from "@/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";

import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.AUTH,
    element: <AuthPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFoundPage />,
  },
];
