import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendOtpSchema, type SendOtpFormValues } from "../schemas/auth.schema";
import { useSendOtp } from "../hooks/useSendOtp";

interface SendOtpProps {
  onSuccess: (mobile: string) => void;
}

export const SendOtp = ({ onSuccess }: SendOtpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOtpFormValues>({ resolver: zodResolver(sendOtpSchema) });

  const { mutate, isPending, error } = useSendOtp();

  const onSubmit = (values: SendOtpFormValues) => {
    mutate(values, {
      onSuccess: () => onSuccess(values.mobile),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label htmlFor="mobile" className="block mb-1 text-sm">
          شماره موبایل خود را وارد کنید.
        </label>
        <span>کد تایید به این شمراه پیامک می شود.</span>
        <input
          id="mobile"
          type="tel"
          placeholder="09123456789"
          {...register("mobile")}
          className="w-full border rounded-lg px-3 py-2"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm">
          ارسال کد با خطا مواجه شد، دوباره تلاش کنید
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-red-600 text-white rounded-lg py-2 disabled:opacity-50"
      >
        {isPending ? "در حال ارسال..." : "بعدی"}
      </button>
    </form>
  );
};
