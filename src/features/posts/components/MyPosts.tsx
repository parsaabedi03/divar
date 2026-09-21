import { env } from "@/config/env";
import { useDeletePost, useMyPost } from "../hooks/usePost";
import { Loader } from "@/shared/components/ui/Loader";

export const MyPosts = () => {
  const { data, isPending } = useMyPost();
  const { mutate } = useDeletePost();

  if (isPending) return <Loader />;

  return (
    <div>
      {data?.map((post) => (
        <div
          key={post._id}
          className="flex flex-col md:flex-row items-center justify-between font-normal p-4 bg-white shadow-2xl  mb-5 rounded-sm"
        >
          <div>
            <img
              src={`${env.apiUrl}/${post.images[0]}`}
              alt={post.title}
              className="w-full md:w-20"
            />
          </div>
          <div className="flex flex-col w-full my-5 md:my-0 md:flex-row md:justify-between md:items-center md:ms-4">
            <p className="font-bold">{post.title}</p>
            <p>{post.amount.toLocaleString("fa-IR")} تومان</p>
            <p>{post.province ?? "دقایقی پیش"}</p>
            <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
            <button
              onClick={() => mutate(post._id)}
              className="bg-primary self-end font-medium text-white rounded-sm py-2 px-8 hover:bg-primary-dark-1 transition duration-200 ease-in-out"
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
