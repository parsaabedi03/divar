import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createPostRequest,
  getMyPostsRequest,
  deletePostRequest,
  getAllPostsRequest,
  getPostByIdRequest,
  getPostCreateDataRequest,
} from "../api/posts.api";
import { postsKeys } from "../api/posts.keys";

export const useGetPostCreateData = () => {
  return useQuery({
    queryKey: postsKeys.create(),
    queryFn: getPostCreateDataRequest,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postsKeys.my() });
    },
  });
};

export const useMyPost = () => {
  return useQuery({
    queryKey: postsKeys.my(),
    queryFn: getMyPostsRequest,
  });
};

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: postsKeys.detail(id),
    queryFn: () => getPostByIdRequest(id),
    enabled: Boolean(id),
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: postsKeys.list(),
    queryFn: getAllPostsRequest,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePostRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all });
    },
  });
};
