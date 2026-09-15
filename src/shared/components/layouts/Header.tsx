import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { CirclePlus, House, LogIn, Search, Settings, User } from "lucide-react";

import { ROUTES } from "@/config/routes";
import { deleteCookie, getCookie } from "@/shared/utils/cookieHelpers";

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) setIsLogin(true);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 text-sm font-bold border-b ${
      isActive ? "text-primary border-primary" : "text-neutral"
    }`;

  return (
    <header className="fixed inset-0">
      <div className="border-b border-emerald-200 bg-white relative z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 shrink-0">
              <img src="./divar.svg" alt="logo" className="w-10" />
            </Link>

            <div className="flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral"
                />
                <input
                  type="text"
                  placeholder="جستجو در دیوار"
                  className="w-full border rounded-sm border-neutral hover:border-primary-light focus:outline-primary-light font-normal ps-10 py-2"
                />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-20 shrink-0">
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setOpenMenu(true)}
                  className={`text-sm font-medium z-10 p-3 rounded-sm hover:bg-neutral-light hover:text-neutral-dark-2 transition duration-200 ease-in-out ${openMenu ? "text-neutral-dark-2 bg-neutral-light" : "text-neutral"}`}
                >
                  دیوار من
                </button>
                {openMenu && (
                  <div className="absolute top-[120%] right-0 bg-white w-60 rounded-sm p-3 shadow-xl/30">
                    {!isLogin && (
                      <Link
                        to={ROUTES.AUTH}
                        className="flex items-center gap-1 text-sm font-normal border-b border-emerald-200 py-2"
                      >
                        <LogIn className="rotate-180 text-neutral" size={20} />
                        <span>ورود به حساب کاربری</span>
                      </Link>
                    )}
                    <Link
                      to={ROUTES.AUTH}
                      className="flex items-center gap-1 text-sm font-normal border-b border-emerald-200 last:border-0 py-2"
                    >
                      <Settings className="text-neutral" />
                      <span>تنظیمات</span>
                    </Link>
                    {isLogin && (
                      <button
                        onClick={() => {
                          deleteCookie("accessToken");
                          deleteCookie("refreshToken");
                        }}
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
                to={ROUTES.AUTH}
                className="text-sm font-medium text-white rounded-sm p-3 bg-primary hover:bg-primary-dark-1 transition duration-200 ease-in-out"
              >
                ثبت آگهی
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 h-full w-full bg-black z-20 transition-opacity duration-300 ${
          openMenu
            ? "opacity-20 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenMenu(false)}
      ></div>

      <div className="flex md:hidden align-middle justify-around absolute bottom-0 w-full h-fit z-50 bg-white border-t p-2 border-emerald-200">
        <NavLink to={ROUTES.HOME} className={navLinkClass}>
          <House size={20} />
          <span>خانه</span>
        </NavLink>
        <NavLink to={ROUTES.HOME} className={navLinkClass}>
          <CirclePlus size={20} />
          <span>ثبت آگهی</span>
        </NavLink>
        <NavLink to={ROUTES.HOME} className={navLinkClass}>
          <User size={20} />
          <span>دیوار من</span>
        </NavLink>
      </div>
    </header>
  );
};
