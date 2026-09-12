import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkOtpSchema,
  type CheckOtpFormValues,
} from "../schemas/auth.schema";
import { useCheckOtp } from "../hooks/useCheckOtp";

import { Pencil, MessageSquareMore } from "lucide-react";
import { e2p } from "@/shared/utils/replaceNumber";
import toast from "react-hot-toast";

interface CheckOtpProps {
  mobile: string;
  onSuccess: () => void;
  handleBack: () => void;
}

export const CheckOtp = ({ mobile, onSuccess, handleBack }: CheckOtpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckOtpFormValues>({
    resolver: zodResolver(checkOtpSchema),
    defaultValues: { mobile },
  });

  const { mutate, isPending, error } = useCheckOtp();

  const onSubmit = (values: CheckOtpFormValues) => {
    mutate(values, { onSuccess });
  };

  useEffect(() => {
    if (error) {
      toast.error("کد وارد شده صحیح نیست");
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input type="hidden" {...register("mobile")} />
      <div>
        <div className="flex align-top justify-between mb-2 font-normal">
          <div className="flex align-middle">
            <MessageSquareMore size={22} className="text-neutral" />
            <div className="px-4">
              <span className="self-center block mb-5">{e2p(mobile)}</span>
              <label
                htmlFor="code"
                className="block mb-1 text-base text-neutral"
              >
                کد تایید به شماره بالا فرستاده شد.
              </label>
            </div>
          </div>
          <button onClick={handleBack} className="h-fit">
            <Pencil className="text-neutral" size={18} />
          </button>
        </div>
        <input
          id="code"
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="۱۲۳۴۵"
          {...register("code")}
          className="w-full border rounded-sm border-neutral hover:border-primary-light focus:outline-primary-light font-normal px-3 py-2 text-center tracking-widest"
        />
        {errors.code && (
          <p className="text-red-500 text-sm mt-1 font-normal">
            {errors.code.message}
          </p>
        )}
      </div>

      <div className="mt-5 pt-5 text-left border-t border-t-emerald-100">
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary w-fit font-normal text-base text-white rounded-sm py-2 px-8 hover:bg-primary-dark-1 disabled:opacity-50 transition duration-200 ease-in-out"
        >
          {isPending ? "در حال بررسی..." : "ورود"}
        </button>
      </div>
    </form>
  );
};
