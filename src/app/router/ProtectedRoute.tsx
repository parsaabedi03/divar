import { Navigate, Outlet } from "react-router";

import { ROUTES } from "@/config/routes";
import { getCookie } from "@/shared/utils/cookieHelpers";

export const ProtectedRoute = () => {
  const accessToken = getCookie("accessToken");

  if (!accessToken) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <Outlet />;
};
