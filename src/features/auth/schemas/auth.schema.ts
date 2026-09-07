import * as z from "zod";

export const sendOtpSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(\\+98|0)?9\\d{9}$/, "لطفا شماره موبایل معتبر را وارد کنید."),
});
export const checkOtpSchema = z.object({
  phoneNumber: z.string().regex(/^(\\+98|0)?9\\d{9}$/),
  code: z
    .string()
    .length(5, "کد تایید ۵ رقم می باشد")
    .regex(/^\d+$/, "کد تایید فقط باید عدد باشد"),
});

export type SendOtpFormValues = z.infer<typeof sendOtpSchema>;
export type CheckOtpFormValues = z.infer<typeof checkOtpSchema>;
