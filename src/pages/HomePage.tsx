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
      <div className="col-span-5 md:col-span-1 w-full font-normal md:bg-emerald-200 p-2 md:min-h-screen rounded-sm">
        <p className="w-fit pb-1 border-b-2 border-b-primary font-bold mb-5">
          دسته بندی ها
        </p>
        <button
          className="w-full mb-3 mx-2 text-end md:text-start text-primary text-sm"
          onClick={handleClearSearch}
        >
          حذف فیلتر
        </button>
        <div className="flex items-center md:items-start justify-around w-full md:flex-col flex-wrap">
          {categories?.map((category) => (
            <button
              key={category._id}
              className={`flex flex-col md:flex-row items-center justify-center mb-3 p-2 ${category.slug == query.category ? "bg-emerald-200" : null}`}
              onClick={() => handleCategoryClick(category.slug)}
            >
              <img
                src={`/${category.icon}.svg`}
                alt={category.name}
                className="w-8 h-8 md:me-2 md:w-5 md:h-5"
              />
              <p>{category.name}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-5 md:col-span-4">
        {isPending && <Loader />}
        {!isPending && !posts?.length && <p>آگهی وجود ندارد.</p>}
        <PostCard posts={posts ?? []} />
      </div>
    </div>
  );
};
