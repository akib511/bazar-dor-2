import Link from "next/link";

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
}

const AllProducts = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Product data load failed");
  }

  const products: Product[] = await res.json();

  const unitBn: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  const bn = (number: number) => number.toLocaleString("bn-BD");

  return (
    <section className="mx-auto mt-8 w-full max-w-[1150px] ">
      <section
        id="AllProducts"
        className="mx-auto mt-8 w-full max-w-[1150px] px-4"
      ></section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>

        <p className="mt-1 text-sm text-gray-500">
          মোট {bn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <p className="font-medium text-gray-700">
            বর্তমানে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
           <Link
            key={product.id}
            href={`/product/${encodeURIComponent(product.slug)}`}
            className="group block rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
          >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                    {product.image || product.categoryIcon || "🛒"}
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 transition-colors group-hover:text-green-600">
                      {product.nameBn}
                    </h3>

                    <span className="text-sm text-gray-500">
                      {unitBn[product.unit] ?? product.unit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-800">আজকের দাম</p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-semibold text-gray-900">
                      {bn(product.today)}
                    </span>

                    <span className="text-gray-800">টাকা</span>
                  </div>
                </div>

                <div
                  className={`shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${
                    product.change.dir === "up"
                      ? "bg-red-50 text-red-500"
                      : product.change.dir === "down"
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {product.change.dir === "up" ? (
                    <p>▲ {bn(Math.abs(product.change.pct))}%</p>
                  ) : product.change.dir === "down" ? (
                    <p>▼ {bn(Math.abs(product.change.pct))}%</p>
                  ) : (
                    <p>-0.0%</p>
                  )}
                </div>
              </div>

              <div className=" border-t border-gray-100 pt-3 text-sm font-medium text-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                বিস্তারিত দেখুন →
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllProducts;
