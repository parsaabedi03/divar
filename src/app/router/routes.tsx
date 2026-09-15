import type { RouteObject } from "react-router";
import { ROUTES } from "@/config/routes";
import { ProtectedRoute } from "./ProtectedRoute";

import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LayoutProvider } from "@/shared/components/layouts";

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
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
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
