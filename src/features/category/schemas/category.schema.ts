import * as z from "zod";

export const createCategorySchema = z
  .object({
    name: z.string().min(1),
    slug: z.string().optional(),
    icon: z.string().min(1),
    parent: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    slug: data.slug && data.slug.trim() !== "" ? data.slug : data.name,
    parent: data.parent && data.parent.trim() !== "" ? data.parent : undefined,
  }));

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CreateCategoryFormValues = z.input<typeof createCategorySchema>;
