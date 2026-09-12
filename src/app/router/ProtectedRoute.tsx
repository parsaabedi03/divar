import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

import axiosInstance from "@/lib/axios";
import { ROUTES } from "@/config/routes";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export const ProtectedRoute = () => {
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosInstance.get("/user/whoami");
        setStatus("authenticated");
      } catch {
        setStatus("unauthenticated");
      }
    };

    checkAuth();
  }, []);

  if (status === "loading") {
    return <div>در حال بررسی ورود...</div>;
  }

  if (status === "unauthenticated") {
    return <Navigate to={ROUTES.AUTH} replace />;
  }

  return <Outlet />;
};
