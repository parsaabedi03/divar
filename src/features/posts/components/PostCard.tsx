import { env } from "@/config/env";
import { useGetAllPosts } from "../hooks/usePost";
import { sp } from "@/shared/utils/replaceNumber";
import { shortenText } from "@/shared/helper/helper";
import { Link } from "react-router";

export const PostCard = () => {
  const { data, isPending } = useGetAllPosts();

  if (isPending) <div>در حال بررسی</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data?.map((post) => (
        <Link
          to={`/post/${post._id}`}
          key={post._id}
          className="border border-emerald-200 p-2 flex justify-between max-w-lg hover:shadow-2xl rounded-sm font-normal"
        >
          <div>
            <p className="mb-10 font-bold">{post.title}</p>
            <p>{sp(post.amount)} تومان</p>
            <p>{shortenText(post.address)}...</p>
          </div>
          <div>
            <img
              src={`${env.apiUrl}/${post.images[0]}`}
              alt={post.title}
              className="w-30 h-30 object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};
