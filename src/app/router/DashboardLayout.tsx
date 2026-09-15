import { Outlet } from "react-router";

import Sidebar from "@/shared/components/layouts/Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="flex max-w-7xl mx-auto">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
