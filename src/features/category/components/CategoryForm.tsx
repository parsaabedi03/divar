import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createCategorySchema,
  type CreateCategoryFormValues,
  type CreateCategoryInput,
} from "../schemas/category.schema";

import { useCreateCategory, useGetAllCategories } from "../hooks/useCategory";

export const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryFormValues, unknown, CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
  });

  const { mutate, isPending } = useCreateCategory();
  const { data } = useGetAllCategories();

  const onSubmit = (value: CreateCategoryInput) => {
    mutate(value, { onSuccess: () => reset() });
  };

  const labelStyle = "block mt-3 font-normal text-base text-neutral";
  const inputStyle =
    "w-full border rounded-sm border-neutral hover:border-primary-light focus:outline-primary-light font-normal px-3 py-2 mb-4";

  return (
    <div>
      <h3 className="font-normal mt-10 self-start text-neutral-dark-1 text-lg mb-5 border-b-2 border-primary w-fit">
        فرم ایجاد دسته بندی
      </h3>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <label htmlFor="name" className={labelStyle}>
            نام دسته‌بندی
            <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="مثلاً: خودرو"
            {...register("name")}
            className={inputStyle}
          />
          {errors.name && (
            <p className="-mt-3 mb-3 text-sm text-red-500">
              نام دسته‌بندی الزامی است.
            </p>
          )}

          <label htmlFor="slug" className={labelStyle}>
            اسلاگ (آدرس URL)
          </label>
          <input
            id="slug"
            type="text"
            placeholder="در صورت خالی بودن، خودکار از نام ساخته می‌شود"
            {...register("slug")}
            className={inputStyle}
          />
          {errors.icon && (
            <p className="-mt-3 mb-3 text-sm text-red-500">آیکون الزامی است.</p>
          )}

          <label htmlFor="icon" className={labelStyle}>
            آیکون
            <span className="text-primary">*</span>
          </label>
          <input
            id="icon"
            type="text"
            placeholder="نام آیکون (انگلیسی) — مثلاً: car"
            {...register("icon")}
            className={inputStyle}
          />

          <label htmlFor="parent" className={labelStyle}>
            دسته‌بندی والد
          </label>
          <select id="parent" {...register("parent")} className={inputStyle}>
            <option value="">انتخاب کنید</option>
            {data?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isPending}
            className="block mt-5 bg-primary w-fit font-normal text-base text-white rounded-sm py-2 px-8 hover:bg-primary-dark-1 disabled:opacity-50 transition duration-200 ease-in-out"
          >
            {isPending ? "در حال ارسال..." : "ثبت"}
          </button>
        </form>
      </div>
    </div>
  );
};
