import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sendOtpSchema, type SendOtpFormValues } from "../schemas/auth.schema";
import { useSendOtp } from "../hooks/useSendOtp";

interface SendOtpProps {
  mobile: string;
  onSuccess: (mobile: string) => void;
}

export const SendOtp = ({ onSuccess, mobile }: SendOtpProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SendOtpFormValues>({ resolver: zodResolver(sendOtpSchema) });

  const { mutate, isPending, error } = useSendOtp();

  const onSubmit = (values: SendOtpFormValues) => {
    mutate(values, {
      onSuccess: () => onSuccess(values.mobile),
    });
  };

  useEffect(() => {
    if (mobile) {
      setValue("mobile", mobile);
    }
  }, [mobile, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <p className="text-lg font-medium mbe-4">
          شماره موبایل خود را وارد کنید
        </p>
        <label
          htmlFor="mobile"
          className="block mb-3 font-normal text-base text-neutral"
        >
          کد تایید به این شماره پیامک می شود.
        </label>
        <input
          id="mobile"
          type="tel"
          placeholder="۰۹۱۲ ۱۲۳ ۴۵۶"
          {...register("mobile")}
          className="w-full border rounded-sm border-neutral hover:border-primary-light focus:outline-primary-light font-normal px-3 py-2"
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

      <div className="mt-5 pt-5 text-left border-t border-t-emerald-100">
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary w-fit font-normal text-base text-white rounded-sm py-2 px-8 hover:bg-primary-dark-1 disabled:opacity-50 transition duration-200 ease-in-out"
        >
          {isPending ? "در حال ارسال..." : "بعدی"}
        </button>
      </div>
    </form>
  );
};
