import * as z from "zod";

export const createPostFormSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  content: z.string().optional(),
  category: z.string().min(1, "دسته‌بندی الزامی است"),
  amount: z.coerce.number().positive("مبلغ باید عدد مثبت باشد"),
  images: z.array(z.instanceof(File)).min(1, "حداقل یک تصویر الزامی است"),
  province: z.string().min(1, "استان الزامی است"),
  district: z.string().optional(),
  city: z.string().min(1, "شهر الزامی است"),
  address: z.string().optional(),
  coordinate: z
    .tuple([z.number(), z.number()])
    .nullable()
    .refine((val) => val !== null, {
      message: "موقعیت مکانی را روی نقشه انتخاب کنید",
    }),
  options: z.record(z.string(), z.unknown()).optional(),
});

export type CreatePostFormValues = z.output<typeof createPostFormSchema>;
export type CreatePostFormInput = z.input<typeof createPostFormSchema>;

export const STEP_FIELDS = {
  1: ["title", "content", "images"],
  2: [
    "category",
    "amount",
    "province",
    "district",
    "city",
    "address",
    "coordinate",
  ],
} as const;
