import { Outlet } from "react-router";

import { Header } from "./Header";

export const LayoutProvider = () => {
  return (
    <>
      <Header />
      <div className="py-20">
        <Outlet />
      </div>
    </>
  );
};
