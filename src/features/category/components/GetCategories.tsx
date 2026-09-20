import { useDeleteCategory, useGetAllCategories } from "../hooks/useCategory";

export const GetCategories = () => {
  const { data, isPending, isError } = useGetAllCategories();
  const { mutate, isPending: isDeleting } = useDeleteCategory();

  const deleteHandler = (id: string) => {
    if (window.confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟")) mutate(id);
  };

  return (
    <div className="font-normal">
      <h3 className="font-normal text-neutral-dark-1 text-lg mb-5 border-b-2 border-primary w-fit">
        دسته بندی ها
      </h3>
      {isPending && <h4>در حال لود شدن</h4>}
      {isError && (
        <p className="rounded-sm bg-red-50 p-3 text-sm text-red-600">
          دریافت دسته‌بندی‌ها با خطا مواجه شد. دوباره تلاش کنید.
        </p>
      )}
      {!isPending && !isError && data?.length === 0 && (
        <p className="rounded-sm bg-emerald-200 p-3 text-sm text-neutral">
          هنوز دسته‌بندی‌ای ایجاد نشده است.
        </p>
      )}
      {data?.map((category) => (
        <div
          key={category._id}
          className="flex flex-col md:flex-row md:items-center justify-between bg-white shadow-xl p-2 mb-5 font-normal rounded-sm"
        >
          <div>
            <span>{category.icon}</span>
            <span> نام دسته بندی: {category.name}</span>
          </div>
          <p className="my-2">اسلاگ: {category.slug}</p>
          <button
            onClick={() => deleteHandler(category._id)}
            disabled={isDeleting}
            className="self-end bg-primary w-fit font-normal text-base text-white rounded-sm py-2 px-8 hover:bg-primary-dark-1 disabled:opacity-50 transition duration-200 ease-in-out"
          >
            {isDeleting ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      ))}
    </div>
  );
};
