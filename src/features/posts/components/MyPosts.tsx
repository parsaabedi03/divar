import { env } from "@/config/env";
import { useDeletePost, useMyPost } from "../hooks/usePost";

export const MyPosts = () => {
  const { data, isPending } = useMyPost();
  const { mutate } = useDeletePost();

  if (isPending) <div>در حال بررسی</div>;

  return (
    <div>
      {data?.map((post) => (
        <div
          key={post._id}
          className="flex items-center justify-between font-normal p-4 bg-white shadow  mb-5 rounded-sm"
        >
          <img
            src={`${env.apiUrl}/${post.images[0]}`}
            alt={post.title}
            className="w-20"
          />
          <p>{post.title}</p>
          <p>{post.amount}</p>
          <p>{post.province ?? "دقایقی پیش"}</p>
          <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
          <button
            onClick={() => mutate(post._id)}
            className="bg-primary font-medium text-white rounded-sm py-2 px-8 hover:bg-primary-dark-1 transition duration-200 ease-in-out"
          >
            حذف
          </button>
        </div>
      ))}
    </div>
  );
};
