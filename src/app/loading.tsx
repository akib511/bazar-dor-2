const CardSkeleton = () => (
  <div className="rounded-2xl border border-gray-200/80 bg-white p-5">
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

      <div className="space-y-2">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>
    </div>

    <div className="mt-5 flex items-end justify-between">
      <div className="space-y-2">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-7 w-24 rounded bg-gray-200" />
      </div>

      <div className="h-6 w-14 rounded-lg bg-gray-200" />
    </div>
  </div>
);

const SectionSkeleton = ({ count }: { count: number }) => (
  <section className="mt-8">
    <div className="mb-5 h-7 w-44 rounded bg-gray-200" />

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  </section>
);

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6">
      <div className="mx-auto w-full max-w-[1150px] animate-pulse">
        {/* Banner */}
        <div className="h-44 w-full rounded-2xl bg-gray-200 sm:h-56" />

        {/* Marquee */}
        <div className="mt-4 h-10 w-full rounded-xl bg-gray-200" />

        {/* Top Gainers */}
        <SectionSkeleton count={6} />

        {/* Top Losers */}
        <SectionSkeleton count={6} />

        {/* All Products */}
        <section className="mt-8">
          <div className="mb-5 h-7 w-40 rounded bg-gray-200" />

          <div className="flex items-center justify-end gap-3 rounded-2xl border border-gray-200/80 bg-white px-5 py-4">
            <div className="h-4 w-12 rounded bg-gray-200" />
            <div className="h-8 w-36 rounded-lg bg-gray-200" />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}