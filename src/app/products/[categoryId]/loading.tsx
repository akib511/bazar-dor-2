export default function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6">
      <div className="mx-auto w-full max-w-[1150px] animate-pulse">
        {/* Category Header */}
        <section className="rounded-2xl border border-gray-200/80 bg-white/80 p-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-6 w-28 rounded bg-gray-200" />
              <div className="h-3.5 w-52 rounded bg-gray-200" />
            </div>
          </div>
        </section>

        {/* Sort Bar */}
        <section className="mt-4 flex items-center justify-end gap-3 rounded-2xl border border-gray-200/80 bg-white/80 px-5 py-4">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-8 w-24 rounded-lg bg-gray-200" />
        </section>

        {/* Count text */}
        <div className="mb-3 mt-4 h-4 w-44 rounded bg-gray-200" />

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200/80 bg-white/80 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-gray-200" />

                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div className="space-y-2">
                  <div className="h-3 w-16 rounded bg-gray-200" />
                  <div className="h-6 w-24 rounded bg-gray-200" />
                </div>

                <div className="h-6 w-14 rounded-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}