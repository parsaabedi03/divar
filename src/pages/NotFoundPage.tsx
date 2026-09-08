import { Link } from "react-router";
import { ROUTES } from "@/config/routes";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">صفحه پیدا نشد (۴۰۴)</h1>
      <Link to={ROUTES.HOME} className="text-blue-600 underline">
        برگشت به صفحهٔ اصلی
      </Link>
    </div>
  );
};
