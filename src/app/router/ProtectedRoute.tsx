import { Navigate, Outlet } from "react-router";

import { ROUTES } from "@/config/routes";
import { useAuth } from "@/app/providers/AuthProvider";
import { Loader } from "@/shared/components/ui/Loader";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (!user) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <Outlet />;
};
