import * as z from "zod";

export const sendOtpSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^(\+98|0|98|0098)?([ \-()]){0,2}9[0-9]([ \-()]){0,2}(?:[0-9]([ \-()]){0,2}){8}$/,
      "لطفا شماره موبایل معتبر را وارد کنید.",
    ),
});
export const checkOtpSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^(\+98|0|98|0098)?([ \-()]){0,2}9[0-9]([ \-()]){0,2}(?:[0-9]([ \-()]){0,2}){8}$/,
    ),
  code: z
    .string()
    .length(5, "کد تایید ۵ رقم می باشد")
    .regex(/^\d+$/, "کد تایید فقط باید عدد باشد"),
});

export type SendOtpFormValues = z.infer<typeof sendOtpSchema>;
export type CheckOtpFormValues = z.infer<typeof checkOtpSchema>;
