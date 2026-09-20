import { Navigate, Outlet } from "react-router";

import { ROUTES } from "@/config/routes";
import { useAuth } from "@/app/providers/AuthProvider";

export const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>در حال بررسی دسترسی...</div>;
  if (user?.role !== "ADMIN") {
    return <Navigate to={ROUTES.DASHBOARD_MY_POSTS} replace />;
  }

  return <Outlet />;
};
