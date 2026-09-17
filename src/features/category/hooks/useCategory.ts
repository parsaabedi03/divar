import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

import {
  createCategoryRequest,
  deleteCategoryRequest,
  getAllCategoryRequest,
} from "../api/category.api";

import { categoryKeys } from "../api/category.keys";

import type { CreateCategoryInput } from "../schemas/category.schema";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getAllCategoryRequest,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryInput) =>
      createCategoryRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success("دسته بندی ساخته شد");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "خطا در ساخت دسته‌بندی");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategoryRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
      toast.success("دسته بندی مورد نظر حذف شد.");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "خطا در حذف دسته‌بندی");
    },
  });
};
