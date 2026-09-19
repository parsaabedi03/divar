import { useFormContext } from "react-hook-form";
import type { CreatePostFormValues } from "../../schemas/posts.schema";

interface StepImagesProps {
  onNext: () => void;
}

export const StepImages = ({ onNext }: StepImagesProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreatePostFormValues>();

  const images = watch("images") || [];

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("images", files, { shouldValidate: true });
  };

  const removeImage = (index: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block font-normal text-base text-neutral"
        >
          عنوان آگهی
        </label>
        <input
          id="title"
          type="text"
          placeholder="مثلاً: پراید مدل ۱۴۰۰"
          {...register("title")}
          className="w-full border rounded-sm border-neutral hover:border-primary-light focus:outline-primary-light font-normal px-3 py-2 mt-1"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="block font-normal text-base text-neutral"
        >
          توضیحات
        </label>
        <textarea
          id="content"
          placeholder="توضیحات کامل آگهی را بنویسید"
          {...register("content")}
          rows={4}
          className="w-full border rounded-sm border-neutral hover:border-primary-light focus:outline-primary-light font-normal px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label
          htmlFor="images"
          className="block font-normal text-base text-neutral"
        >
          تصاویر آگهی
        </label>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          className="w-full border rounded-sm border-neutral font-normal px-3 py-2 mt-1"
        />
        {errors.images && (
          <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
        )}

        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-3">
            {images.map((file, index) => (
              <div key={index} className="relative w-20 h-20">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="bg-primary font-medium text-white rounded-sm py-2 px-8 hover:bg-primary-dark-1 transition duration-200 ease-in-out"
      >
        مرحله بعد
      </button>
    </div>
  );
};
