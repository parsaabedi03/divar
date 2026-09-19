export const postsKeys = {
  all: ["posts"] as const,

  lists: () => [...postsKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...postsKeys.lists(), filters] as const,

  my: () => [...postsKeys.all, "my"] as const,

  details: () => [...postsKeys.all, "detail"] as const,
  detail: (id: string) => [...postsKeys.details(), id] as const,

  create: () => [...postsKeys.all, "create"] as const,
};
