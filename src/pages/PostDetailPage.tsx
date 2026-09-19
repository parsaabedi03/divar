import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  MapPin,
} from "lucide-react";

import { env } from "@/config/env";
import { useGetPostById } from "@/features/posts/hooks/usePost";

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useGetPostById(id ?? "");

  const [currentImage, setCurrentImage] = useState(0);
  const images = data?.images ?? [];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  if (!id) {
    return <div>Post not found</div>;
  }

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-neutral-dark-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <aside className="order-2 md:order-1 space-y-4">
          <div className="border border-emerald-200 rounded-sm p-4 space-y-3">
            <h1 className="hidden md:block text-lg font-bold">{data?.title}</h1>
            <p className="hidden md:block text-xs text-neutral">
              {new Date(data?.createdAt).toLocaleDateString("fa-IR")} در
              {data?.city}
            </p>

            <div className="flex items-center gap-4 border-t border-emerald-200 pt-3 text-neutral">
              <button className="flex items-center gap-1 text-xs hover:text-primary">
                <Share2 size={16} />
                <span>اشتراک‌گذاری</span>
              </button>
              <button className="flex items-center gap-1 text-xs hover:text-primary">
                <Bookmark size={16} />
                <span>ذخیره آگهی</span>
              </button>
            </div>

            <button className="w-full bg-primary hover:bg-primary-dark-1 text-white text-sm font-medium rounded-sm py-3 transition duration-200 ease-in-out">
              اطلاعات تماس
            </button>
          </div>

          {data?.amount ? (
            <div className="border border-emerald-200 rounded-sm p-4">
              <h2 className="font-bold mb-1 text-sm">مبلغ</h2>
              <p className="text-primary font-bold">
                {data?.amount.toLocaleString("fa-IR")} تومان
              </p>
            </div>
          ) : null}
        </aside>

        <div className="md:col-span-2 space-y-5 order-1 md:order-2">
          <div className="relative rounded-sm overflow-hidden bg-neutral-light aspect-4/3">
            {images.length > 0 ? (
              <img
                src={`${env.apiUrl}/${images[currentImage]}`}
                alt={data?.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-neutral">
                بدون تصویر
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="تصویر قبلی"
                  className="absolute top-1/2 -translate-y-1/2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="تصویر بعدی"
                  className="absolute top-1/2 -translate-y-1/2 left-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  {currentImage + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          <div className="md:hidden">
            <h1 className="text-lg font-bold">{data?.title}</h1>
            <p className="text-xs text-neutral mt-1">
              {new Date(data?.createdAt).toLocaleDateString("fa-IR")} در
              {data?.city}
            </p>
          </div>

          <section className="border-t border-emerald-200 pt-4">
            <h2 className="font-bold mb-2">توضیحات</h2>
            <p className="text-sm leading-7 whitespace-pre-line">
              {data?.content}
            </p>
          </section>

          {/* نقشه */}
          <section className="border-t border-emerald-200 pt-4">
            <h2 className="font-bold mb-2">موقعیت مکانی</h2>
            <div className="relative h-52 rounded-sm overflow-hidden bg-neutral-light">
              <div className="w-full h-full flex items-center justify-center">
                <MapPin
                  className="text-primary"
                  size={32}
                  fill="currentColor"
                />
              </div>
            </div>
            <p className="text-xs text-neutral mt-2">{data?.address}</p>
          </section>
        </div>
      </div>
    </div>
  );
};
