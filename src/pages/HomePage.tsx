import { useGetAllCategories } from "@/features/category";
import { PostCard, useGetAllPosts } from "@/features/posts";
import { Loader } from "@/shared/components/ui/Loader";
import { useSearchParams } from "react-router";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = {
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
  };

  const { data: posts, isPending } = useGetAllPosts(query);
  const { data: categories } = useGetAllCategories();

  const handleCategoryClick = (category: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("category", category);
      return newParams;
    });
  };

  const handleClearSearch = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("search");
      newParams.delete("category");
      return newParams;
    });
  };

  return (
    <div className="max-w-7xl px-4 mx-auto grid gap-5 md:grid-cols-5">
      <div className="col-span-1 font-normal bg-emerald-200 p-2 min-h-screen rounded-sm">
        <p className="w-fit pb-1 border-b-2 border-b-primary font-bold mb-5">
          همه دسته بندی ها
        </p>
        <button className="flex items-center mb-3" onClick={handleClearSearch}>
          همه آگهی ها
        </button>
        {categories?.map((category) => (
          <button
            key={category._id}
            className="flex items-center mb-3"
            onClick={() => handleCategoryClick(category.slug)}
          >
            <img
              src={`/${category.icon}.svg`}
              alt={category.name}
              className="w-5 h-5 me-2"
            />
            <p>{category.name}</p>
          </button>
        ))}
      </div>
      <div className="col-span-4">
        {isPending && <Loader />}
        {!isPending && !posts?.length && <p>آگهی وجود ندارد.</p>}
        <PostCard posts={posts ?? []} />
      </div>
    </div>
  );
};
