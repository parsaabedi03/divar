import axiosInstance from "@/lib/axios";

import type { CreateCategoryInput } from "../schemas/category.schema";

export interface ApiMessageResponse {
  message: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  parents: Category[];
  children: Category[];
}

export const getAllCategoryRequest = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get("/category");
  return data;
};

export const createCategoryRequest = async (
  payload: CreateCategoryInput,
): Promise<ApiMessageResponse> => {
  const { data } = await axiosInstance.post("/category", payload);
  return data;
};

export const deleteCategoryRequest = async (
  id: string,
): Promise<ApiMessageResponse> => {
  const { data } = await axiosInstance.delete(`/category/${id}`);
  return data;
};
