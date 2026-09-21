import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useSearchParams } from "react-router";
import { CirclePlus, House, LogIn, Search, Settings, User } from "lucide-react";

import { ROUTES } from "@/config/routes";
import { deleteCookie } from "@/shared/utils/cookieHelpers";
import { useAuth } from "@/app/providers/AuthProvider";

const MOBILE_BREAKPOINT = 900;

const useIsMobile = (breakpoint: number = MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center justify-center gap-1 text-sm font-bold border-b ${
    isActive ? "text-primary border-primary" : "text-neutral"
  }`;

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const { clearUser, user } = useAuth();
  const isLogin = Boolean(user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isUserPage = pathname === ROUTES.USER;
  const isNewPostPage = pathname === ROUTES.NEW_POST;
  const isDashboardPage = pathname.startsWith(ROUTES.DASHBOARD);

  const hideTopBar = isUserPage || (isNewPostPage && isMobile);
  const hideSearch = isDashboardPage || isNewPostPage;

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    clearUser();
  };

  const handleSearch = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("search", value);
      return newParams;
    });
  };

  return (
    <header className="fixed inset-0 z-50 pointer-events-none">
      {!hideTopBar && (
        <div className="border-b border-emerald-200 bg-white relative z-50 pointer-events-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16 gap-4">
              <Link
                to={ROUTES.HOME}
                className="flex items-center gap-2 shrink-0"
              >
                <img src="/divar.svg" alt="logo" className="w-10" />
              </Link>

              {!hideSearch && (
                <div className="flex flex-1 max-w-xl">
                  <div className="relative w-full">
                    <Search
                      size={18}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral"
                    />
                    <input
                      type="text"
                      placeholder="جستجو در دیوار"
                      value={searchParams.get("search") || ""}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full border rounded-sm border-neutral hover:border-primary-light focus:outline-primary-light font-normal ps-10 py-2"
                    />
                  </div>
                </div>
              )}

              <div className="hidden md:flex items-center gap-20 shrink-0">
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setOpenMenu(true)}
                    className={`text-sm font-medium z-10 p-3 rounded-sm hover:bg-neutral-light hover:text-neutral-dark-2 transition duration-200 ease-in-out ${
                      openMenu
                        ? "text-neutral-dark-2 bg-neutral-light"
                        : "text-neutral"
                    }`}
                  >
                    دیوار من
                  </button>
                  {openMenu && (
                    <div
                      className="absolute top-[120%] right-0 bg-white w-60 rounded-sm p-3 shadow-xl/30"
                      onClick={() => setOpenMenu(false)}
                    >
                      {!isLogin && (
                        <Link
                          to={ROUTES.AUTH}
                          className="flex items-center gap-1 text-sm font-normal border-b border-emerald-200 py-2"
                        >
                          <LogIn
                            className="rotate-180 text-neutral"
                            size={20}
                          />
                          <span>ورود به حساب کاربری</span>
                        </Link>
                      )}
                      <Link
                        to={ROUTES.DASHBOARD_MY_POSTS}
                        className="flex items-center gap-1 text-sm font-normal border-b border-emerald-200 last:border-0 py-2"
                      >
                        <Settings className="text-neutral" />
                        <span>داشبورد</span>
                      </Link>
                      {isLogin && (
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-1 text-sm font-normal py-2"
                        >
                          <LogIn className="text-primary" />
                          <span>خروج</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <Link
                  to={ROUTES.NEW_POST}
                  className="text-sm font-medium text-white rounded-sm p-3 bg-primary hover:bg-primary-dark-1 transition duration-200 ease-in-out"
                >
                  ثبت آگهی
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed inset-0 h-full w-full bg-black z-20 transition-opacity duration-300 ${
          openMenu
            ? "opacity-20 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMenu(false)}
      />

      <div className="flex md:hidden align-middle justify-around absolute bottom-0 w-full h-fit z-50 bg-white border-t p-2 border-emerald-200 pointer-events-auto">
        <NavLink to={ROUTES.HOME} className={navLinkClass}>
          <House size={20} />
          <span>خانه</span>
        </NavLink>
        <NavLink to={ROUTES.NEW_POST} className={navLinkClass}>
          <CirclePlus size={20} />
          <span>ثبت آگهی</span>
        </NavLink>
        <NavLink to={ROUTES.USER} className={navLinkClass}>
          <User size={20} />
          <span>دیوار من</span>
        </NavLink>
      </div>
    </header>
  );
};
