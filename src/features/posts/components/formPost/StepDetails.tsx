import { useFormContext, Controller } from "react-hook-form";
import LocationPickerMap from "@/shared/components/ui/LocationPickerMap";
import type { CreatePostFormValues } from "../../schemas/posts.schema";
import { useGetAllCategories } from "@/features/category";

interface StepDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

export const StepDetails = ({ onNext, onBack }: StepDetailsProps) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreatePostFormValues>();

  const { data: categories } = useGetAllCategories();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="category"
          className="block font-normal text-base text-neutral"
        >
          دسته‌بندی
        </label>
        <select
          id="category"
          {...register("category")}
          className="w-full border rounded-sm border-neutral font-normal px-3 py-2 mt-1"
        >
          <option value="">انتخاب کنید</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block font-normal text-base text-neutral"
        >
          قیمت (تومان)
        </label>
        <input
          id="amount"
          type="number"
          placeholder="مبلغ را وارد کنید"
          {...register("amount")}
          className="w-full border rounded-sm border-neutral font-normal px-3 py-2 mt-1"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="province"
            className="block font-normal text-base text-neutral"
          >
            استان
          </label>
          <input
            id="province"
            type="text"
            {...register("province")}
            className="w-full border rounded-sm border-neutral font-normal px-3 py-2 mt-1"
          />
          {errors.province && (
            <p className="text-red-500 text-sm mt-1">
              {errors.province.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="block font-normal text-base text-neutral"
          >
            شهر
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            className="w-full border rounded-sm border-neutral font-normal px-3 py-2 mt-1"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="district"
            className="block font-normal text-base text-neutral"
          >
            منطقه/محله
          </label>
          <input
            id="district"
            type="text"
            {...register("district")}
            className="w-full border rounded-sm border-neutral font-normal px-3 py-2 mt-1"
          />
        </div>
      </div>

      <div>
        <label className="block font-normal text-base text-neutral mb-2">
          موقعیت مکانی روی نقشه
        </label>
        <Controller
          name="coordinate"
          control={control}
          render={({ field }) => (
            <LocationPickerMap
              initialPosition={
                field.value
                  ? { lng: field.value[0], lat: field.value[1] }
                  : undefined
              }
              onLocationSelect={({ lat, lng, address }) => {
                field.onChange([lng, lat]);
                if (address) setValue("address", address);
              }}
            />
          )}
        />
        {errors.coordinate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.coordinate.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="block font-normal text-base text-neutral"
        >
          آدرس دقیق
        </label>
        <input
          id="address"
          type="text"
          placeholder="با کلیک روی نقشه خودکار پر می‌شود"
          {...register("address")}
          className="w-full border rounded-sm border-neutral font-normal px-3 py-2 mt-1"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="border font-medium border-neutral text-neutral-dark-1 rounded-sm py-2 px-8 hover:bg-neutral-light transition duration-200 ease-in-out"
        >
          مرحله قبل
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-primary font-medium text-white rounded-sm py-2 px-8 hover:bg-primary-dark-1 transition duration-200 ease-in-out"
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};
