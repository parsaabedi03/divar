import { Link } from "react-router";
import { ChevronLeft, LogIn, LogOut } from "lucide-react";

import { MobileHeader } from "@/shared/components/ui/MobileHeader";
import { ROUTES } from "@/config/routes";
import { deleteCookie, getCookie } from "@/shared/utils/cookieHelpers";
import { useAuth } from "@/app/providers/AuthProvider";

export const UserPage = () => {
  const { clearUser } = useAuth();
  const token = getCookie("accessToken");

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    clearUser();
  };

  return (
    <div className="px-4 font-normal">
      <MobileHeader text="دیوار من" />
      {!token && (
        <Link
          to={ROUTES.AUTH}
          className="flex items-center justify-between bg-emerald-200 p-2 rounded-sm mb-2"
        >
          <span>ورود به حساب کاربری</span>
          <LogIn size={18} />
        </Link>
      )}
      {token && (
        <Link
          to={ROUTES.DASHBOARD_MY_POSTS}
          className="flex items-center justify-between bg-emerald-200 p-2 rounded-sm"
        >
          <span> آگهی های من</span>
          <ChevronLeft size={18} />
        </Link>
      )}
      <Link
        to={ROUTES.DASHBOARD_SETTINGS}
        className="flex items-center justify-between bg-emerald-200 p-2 rounded-sm mt-2"
      >
        <span>تنظیمات</span>
        <ChevronLeft size={18} />
      </Link>
      {token && (
        <button
          className="flex items-center w-full bg-emerald-200 p-2 rounded-sm mt-5"
          onClick={handleLogout}
        >
          <LogOut size={18} className="text-primary me-2" />
          <span>خروج</span>
        </button>
      )}
    </div>
  );
};
