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

const TopGainers = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) {
    throw new Error("Product data load failed");
  }

  const products: Product[] = await res.json();
  console.log(products)

  const topGainers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const unitBn: Record<string, string> = {
    kg: "প্রতি কেজি",
  };

  const bn = (number: number) => number.toLocaleString("bn-BD");

  return (
    <section className="mx-auto mt-8 w-full max-w-[1150px]">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">
          <span className="font-bold text-red-500">▲ </span>
          আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topGainers.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group block rounded-2xl border border-green-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {product.image}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">{product.nameBn}</h3>

                  <span className="text-sm text-gray-500">
                    {unitBn[product.unit]}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-800">আজকের দাম</p>

                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold text-gray-900">
                    {bn(product.today)}
                  </span>

                  <span className="text-gray-800">টাকা</span>
                </div>
              </div>

              <div className="rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-500">
                <p>▲ {product.change.pct}%</p>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-100 pt-3 text-sm font-medium text-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              বিস্তারিত দেখুন →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopGainers;
