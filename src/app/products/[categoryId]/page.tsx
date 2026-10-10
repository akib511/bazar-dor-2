import { notFound } from "next/navigation";
import ProductGrid, { type Product } from "./ProductGrid";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

const bn = (number: number) => number.toLocaleString("bn-BD");

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) throw new Error("Category data load failed");

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Invalid category data");

  return data;
}

async function getProducts(slug: string): Promise<Product[]> {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Product data load failed");

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Invalid product data");

  return data;
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const slug = decodeURIComponent(categoryId);

  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  // ক্যাটেগরি না থাকলে not-found.tsx এর 404 পেজ দেখাবে
  if (!category) notFound();

  const products = await getProducts(category.slug);

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-gray-800">
      <div className="mx-auto w-full max-w-[1150px]">
        {/* Category Header */}
        <section className="rounded-2xl border border-gray-200/80 bg-white/80 p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
              {category.icon}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {category.nameBn}
              </h1>
              <p className="mt-0.5 text-sm text-gray-500">
                {bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {products.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-gray-200/80 bg-white/80 px-4 py-16 text-center">
            <p className="text-lg font-semibold text-gray-700">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
            <p className="mt-2 text-sm text-gray-500">
              অন্য ক্যাটাগরি নির্বাচন করে দেখুন।
            </p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </main>
  );
}