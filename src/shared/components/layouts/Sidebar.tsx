import { Link } from "react-router";
import { FileText, FolderCog, Settings } from "lucide-react";

import { ROUTES } from "@/config/routes";
import { useAuth } from "@/app/providers/AuthProvider";

const navItems = [
  { to: ROUTES.DASHBOARD_MY_POSTS, label: "آگهی‌های من", icon: FileText },
  { to: ROUTES.DASHBOARD_SETTINGS, label: "تنظیمات", icon: Settings },
];

const Sidebar = () => {
  const { user } = useAuth();

  const visibleNavItems =
    user?.role === "ADMIN"
      ? [
          {
            to: ROUTES.DASHBOARD_ADMIN_CATEGORIES,
            label: "مدیریت دسته‌بندی‌ها",
            icon: FolderCog,
          },
          ...navItems,
        ]
      : navItems;

  return (
    <aside className="hidden md:block w-60 rounded-sm  shrink-0 bg-emerald-200 min-h-[calc(100vh-64px)] p-4">
      <nav className="flex flex-col gap-1">
        {visibleNavItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center font-normal gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors"
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
