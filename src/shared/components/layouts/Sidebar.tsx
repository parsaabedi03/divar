import { Link } from "react-router";
import { FileText, LayoutDashboard, Settings } from "lucide-react";

import { ROUTES } from "@/config/routes";

const navItems = [
  { to: ROUTES.DASHBOARD, label: "نمای کلی", icon: LayoutDashboard },
  { to: ROUTES.DASHBOARD_MY_POSTS, label: "آگهی‌های من", icon: FileText },
  { to: ROUTES.DASHBOARD_SETTINGS, label: "تنظیمات", icon: Settings },
];

const Sidebar = () => {
  return (
    <aside className="w-60 shrink-0 bg-neutral min-h-[calc(100vh-64px)] p-4">
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors"
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
