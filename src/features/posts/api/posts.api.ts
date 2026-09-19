import axiosInstance from "@/lib/axios";

import type { CreatePostFormValues } from "../schemas/posts.schema";

interface PostResponseMessage {
  message: string;
}

export interface Post {
  _id: string;
  title: string;
  content?: string;
  category: string;
  amount: number;
  images: string[];
  province: string;
  district?: string;
  city?: string;
  address?: string;
  coordinate: [number, number];
  options?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface PostCreateData {
  categories: {
    _id: string;
    name: string;
    slug: string;
    icon: string;
    parents: [];
  }[];
  showBack: boolean;
}

export const getPostCreateDataRequest = async (): Promise<PostCreateData> => {
  const { data } = await axiosInstance.get("/post/create");
  return data;
};

export const createPostRequest = async (
  payload: CreatePostFormValues,
): Promise<PostResponseMessage> => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === "images" && Array.isArray(value)) {
      value.forEach((file) => formData.append("images", file));
      return;
    }
    if (key === "coordinate" && Array.isArray(value)) {
      formData.append("coordinate", JSON.stringify(value));
      return;
    }
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const { data } = await axiosInstance.post("/post/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const getMyPostsRequest = async (): Promise<Post[]> => {
  const {
    data: { posts },
  } = await axiosInstance.get("/post/my");
  return posts;
};

export const getPostByIdRequest = async (id: string): Promise<Post> => {
  const {
    data: { post },
  } = await axiosInstance.get(`/post/${id}`);
  return post;
};

export const getAllPostsRequest = async (): Promise<Post[]> => {
  const {
    data: { posts },
  } = await axiosInstance.get("/");
  return posts;
};

export const deletePostRequest = async (
  id: string,
): Promise<PostResponseMessage> => {
  const { data } = await axiosInstance.delete(`/post/delete/${id}`);
  return data;
};
