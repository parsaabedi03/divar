import { CategoryForm, GetCategories } from "@/features/category";

export const AdminCategoriesPage = () => {
  return (
    <div className="">
      <section>
        <h1 className="font-bold text-xl mb-2">مدیریت دسته‌بندی‌ها</h1>
        <p className="text-sm text-neutral mb-6 font-medium">
          دسته‌بندی‌های آگهی را ایجاد یا حذف کنید.
        </p>
        <GetCategories />
      </section>
      <section>
        <CategoryForm />
      </section>
    </div>
  );
};
