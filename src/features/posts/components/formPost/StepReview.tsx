import { useFormContext } from "react-hook-form";
import type { CreatePostFormValues } from "../../schemas/posts.schema";

interface StepReviewProps {
  onBack: () => void;
  isPending: boolean;
}

export const StepReview = ({ onBack, isPending }: StepReviewProps) => {
  const { getValues } = useFormContext<CreatePostFormValues>();
  const values = getValues();

  return (
    <div className="space-y-4">
      <h3 className="font-normal text-lg text-neutral-dark-1">
        بررسی نهایی آگهی
      </h3>

      {values.images?.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {values.images.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className="w-20 h-20 object-cover rounded-sm"
            />
          ))}
        </div>
      )}

      <div className="bg-white shadow-xl p-4 rounded-sm space-y-2 font-normal">
        <p>
          <span className="text-neutral">عنوان: </span>
          {values.title}
        </p>
        {values.content && (
          <p>
            <span className="text-neutral">توضیحات: </span>
            {values.content}
          </p>
        )}
        <p>
          <span className="text-neutral">قیمت: </span>
          {values.amount?.toLocaleString()} تومان
        </p>
        <p>
          <span className="text-neutral">استان: </span>
          {values.province}
        </p>
        {values.city && (
          <p>
            <span className="text-neutral">شهر: </span>
            {values.city}
          </p>
        )}
        {values.address && (
          <p>
            <span className="text-neutral">آدرس: </span>
            {values.address}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="border border-neutral font-medium text-neutral-dark-1 rounded-sm py-2 px-8 hover:bg-neutral-light transition duration-200 ease-in-out"
        >
          مرحله قبل
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white font-medium rounded-sm py-2 px-8 hover:bg-primary-dark-1 disabled:opacity-50 transition duration-200 ease-in-out"
        >
          {isPending ? "در حال انتشار..." : "انتشار آگهی"}
        </button>
      </div>
    </div>
  );
};
