import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetailsLoading from "./ProductDetailsLoading";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const bn = (number: number) => number.toLocaleString("bn-BD");

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

async function ProductDetails({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const { redirect } = await import("next/navigation");
    const { slug } = await params;

    redirect(`/signIn?callbackURL=${encodeURIComponent(`/products/${slug}`)}`);
  }

  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Product details load failed");
  }

  const products: Product[] = await res.json();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const lowestPrice =
    markets.length > 0 ? Math.min(...markets.map((market) => market.min)) : 0;

  const highestPrice =
    markets.length > 0 ? Math.max(...markets.map((market) => market.max)) : 0;

  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0,
          ) / markets.length,
        )
      : 0;

  const unit = unitBn[product.unit] ?? product.unit;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-gray-800">
      <div className="mx-auto w-full max-w-[1150px]">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/products/${encodeURIComponent(product.category)}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="font-medium text-gray-800">{product.nameBn}</span>
        </nav>

        <section className="flex flex-col justify-between gap-5 rounded-xl border border-gray-200/80 bg-white/80 p-5 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {product.today > product.yesterday ? (
                  <span>
                    গতকালের তুলনায় আজ দাম{" "}
                    <span className="font-semibold text-red-500">
                      {bn(product.today - product.yesterday)} টাকা বেড়েছে ↑
                    </span>
                  </span>
                ) : product.today < product.yesterday ? (
                  <span>
                    গতকালের তুলনায় আজ দাম{" "}
                    <span className="font-semibold text-green-600">
                      {bn(product.yesterday - product.today)} টাকা কমেছে ↓
                    </span>
                  </span>
                ) : (
                  <span>গতকালের তুলনায় আজ দামের কোনো পরিবর্তন নেই</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-between gap-5 rounded-xl bg-[#f0f5f0] px-5 py-3 sm:block sm:text-center">
            <div>
              <p className="text-xs text-gray-500">আজকের বাজারদর</p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {bn(product.today)}
              </p>

              <p className="text-xs text-gray-500">টাকা / {unit}</p>
            </div>

            <div
              className={`mt-1 text-xs font-semibold ${
                product.change.dir === "up"
                  ? "text-red-500"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? `▲ ${bn(Math.abs(product.change.pct))}%`
                : product.change.dir === "down"
                  ? `▼ ${bn(Math.abs(product.change.pct))}%`
                  : "— ০%"}
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-gray-200/80 bg-white/80 p-4 sm:p-5">
          <h2 className="mb-4 text-base font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200/80 p-4">
              <p className="text-xs text-gray-700">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {bn(lowestPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-700">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-gray-200/80 p-4">
              <p className="text-xs text-gray-700 ">সর্বোচ্চ দাম</p>

              <p className="mt-1 text-xl font-bold text-red-500">
                {bn(highestPrice)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-gray-200/80 p-4">
              <p className="text-xs text-gray-700">গড় দাম</p>

              <p className="mt-1 text-xl font-bold text-green-700">
                {bn(averagePrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {unit}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-gray-200/80 bg-white/80 p-4 sm:p-5">
          <h2 className="mb-4 text-base font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {markets.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[650px] border-collapse text-sm">
                <thead>
                  <tr className="bg-[#f8faf8] text-left text-gray-900">
                    <th className="px-3 py-3 font-semibold">বাজার</th>

                    <th className="px-3 py-3 font-semibold">বিভাগ</th>

                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বনিম্ন
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">
                      সর্বোচ্চ
                    </th>

                    <th className="px-3 py-3 text-right font-semibold">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2,
                    );

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className={`border-t border-gray-200 transition-colors hover:bg-green-50/70 ${
                          index % 2 === 1 ? "bg-[#f0f5f0]" : "bg-white"
                        }`}
                      >
                        <td className="px-3 py-3 font-medium text-gray-700">
                          {market.market}
                        </td>

                        <td className="px-3 py-3 text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-3 py-3 text-right text-gray-700">
                          {bn(market.min)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right text-gray-700">
                          {bn(market.max)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right font-semibold text-gray-800">
                          {bn(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="rounded-lg bg-gray-50 p-5 text-center text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </p>
          )}

          <p className="mt-3 text-xs text-gray-500">
            সব দাম প্রতি {unit} হিসেবে দেখানো হয়েছে।
          </p>
        </section>

        <section className="mt-4 rounded-xl border border-gray-200/80 bg-white/80 p-4 sm:p-5">
          <h2 className="mb-4 text-base font-bold text-gray-800">
            আগের দামের তুলনা
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200/80 p-4">
              <p className="text-xs text-gray-500">গতকাল</p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {bn(product.yesterday)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-gray-200/80 p-4">
              <p className="text-xs text-gray-500">গত সপ্তাহ</p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {bn(product.lastWeek)} টাকা
              </p>
            </div>

            <div className="rounded-xl border border-gray-200/80 p-4">
              <p className="text-xs text-gray-500">গত মাস</p>

              <p className="mt-1 text-lg font-bold text-gray-800">
                {bn(product.lastMonth)} টাকা
              </p>
            </div>
          </div>
        </section>

        <div className="py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            ← সব পণ্যে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ProductDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
