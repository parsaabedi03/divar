import { Outlet } from "react-router";

import { Header } from "./Header";

export const LayoutProvider = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
