"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export interface Product {
  id: number | string;
  slug?: string;
  category?: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

type SortKey = "default" | "priceAsc" | "priceDesc" | "name" | "changeDesc";

const unitBn: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "priceAsc", label: "দাম: কম থেকে বেশি" },
  { value: "priceDesc", label: "দাম: বেশি থেকে কম" },
];

const bn = (number: number) => number.toLocaleString("bn-BD");

const bnPct = (number: number) =>
  number.toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

function ProductGridContent({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const filtered = useMemo(
    () =>
      category
        ? products.filter((product) => product.category === category)
        : products,
    [products, category],
  );

  const sorted = useMemo(() => {
    const list = [...filtered];

    switch (sort) {
      case "priceAsc":
        return list.sort((a, b) => a.today - b.today);
      case "priceDesc":
        return list.sort((a, b) => b.today - a.today);
      case "name":
        return list.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
      case "changeDesc":
        return list.sort(
          (a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct),
        );
      default:
        return filtered;
    }
  }, [filtered, sort]);

  return (
    <>
      {/* Sort Bar */}
      <section className="mt-4 flex items-center justify-end gap-3 rounded-2xl border border-gray-200/80 bg-white/80 px-5 py-4">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none transition focus:border-green-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      <p className="mb-3 mt-4 text-sm text-gray-500">
        মোট {bn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <Link
            key={product.id}
            href={`/product/${encodeURIComponent(product.slug ?? String(product.id))}`}
            className="group block rounded-2xl border border-gray-200/80 bg-white/80 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl transition group-hover:bg-green-50">
                {product.image}
              </div>

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-gray-900 transition-colors group-hover:text-green-700">
                  {product.nameBn}
                </h3>
                <p className="text-xs text-gray-500">
                  {unitBn[product.unit] ?? product.unit}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-gray-500">আজকের দাম</p>
                <p className="mt-0.5 text-gray-900">
                  <span className="text-xl font-bold">{bn(product.today)}</span>{" "}
                  <span className="text-sm">টাকা</span>
                </p>
              </div>

              <div
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                  product.change.dir === "up"
                    ? "bg-red-50 text-red-500"
                    : product.change.dir === "down"
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {product.change.dir === "up"
                  ? `▲ ${bnPct(Math.abs(product.change.pct))}%`
                  : product.change.dir === "down"
                    ? `▼ ${bnPct(Math.abs(product.change.pct))}%`
                    : "— ০.০%"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
      >
        হোম পেজে ফিরে যান
      </Link>
    </>
  );
}

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={null}>
      <ProductGridContent products={products} />
    </Suspense>
  );
}