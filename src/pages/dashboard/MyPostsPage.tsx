import { MyPosts } from "@/features/posts/components/MyPosts";

export const MyPostsPage = () => {
  return (
    <div>
      <h1 className="font-bold text-xl mb-10"> لیست آگهی‌های من</h1>
      <MyPosts />
    </div>
  );
};
