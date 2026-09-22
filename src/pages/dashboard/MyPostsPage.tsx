import { MyPosts } from "@/features/posts";
import { MobileHeader } from "@/shared/components/ui/MobileHeader";

export const MyPostsPage = () => {
  return (
    <div>
      <MobileHeader text="آگهی های من" needArrow={true} />
      <h1 className="font-bold text-xl mb-10"> لیست آگهی‌های من</h1>
      <MyPosts />
    </div>
  );
};
