import { Navigate, Outlet } from "react-router";

import { ROUTES } from "@/config/routes";
import { useAuth } from "@/app/providers/AuthProvider";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>در حال بررسی ورود...</div>;
  }

  if (!user) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <Outlet />;
};
