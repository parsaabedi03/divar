import { PostCard } from "@/features/posts/components/PostCard";

export const HomePage = () => {
  return (
    <div className="max-w-7xl px-4 mx-auto grid md:grid-cols-5">
      <div className="col-span-1">side</div>
      <div className="col-span-4">
        <PostCard />
      </div>
    </div>
  );
};
