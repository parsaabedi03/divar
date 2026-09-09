import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkOtpSchema,
  type CheckOtpFormValues,
} from "../schemas/auth.schema";
import { useCheckOtp } from "../hooks/useCheckOtp";

interface CheckOtpProps {
  mobile: string;
  onSuccess: () => void;
}

export const CheckOtp = ({ mobile, onSuccess }: CheckOtpProps) => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input type="hidden" {...register("mobile")} />

      <div>
        <label htmlFor="code" className="block mb-1 text-sm">
          کد تایید ارسال شده به {mobile}
        </label>
        <input
          id="code"
          type="text"
          inputMode="numeric"
          maxLength={5}
          placeholder="12345"
          {...register("code")}
          className="w-full border rounded-lg px-3 py-2 text-center tracking-widest"
        />
        {errors.code && (
          <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">کد وارد شده صحیح نیست</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white rounded-lg py-2 disabled:opacity-50"
      >
        {isPending ? "در حال بررسی..." : "تایید کد"}
      </button>
    </form>
  );
};
