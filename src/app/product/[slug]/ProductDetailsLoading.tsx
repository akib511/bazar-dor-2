function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6">
      <div className="mx-auto w-full max-w-[1150px] animate-pulse">
        <div className="mb-5 flex items-center gap-2">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-3 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-3 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>

        <section className="flex flex-col justify-between gap-5 rounded-xl border border-gray-200/80 bg-white/80 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200" />

            <div className="space-y-3">
              <div className="h-6 w-36 rounded bg-gray-200 sm:w-48" />
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-3 w-48 max-w-full rounded bg-gray-200" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-5 rounded-xl bg-[#f0f5f0] px-5 py-3 sm:block sm:text-center">
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-8 w-28 rounded bg-gray-200" />
              <div className="h-3 w-20 rounded bg-gray-200" />
            </div>

            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-gray-200/80 bg-white/80 p-4 sm:p-5">
          <div className="mb-4 h-5 w-36 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200/80 p-4"
              >
                <div className="h-3 w-24 rounded bg-gray-200" />
                <div className="mt-3 h-6 w-32 rounded bg-gray-200" />
                <div className="mt-3 h-3 w-28 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-xl border border-gray-200/80 bg-white/80 p-4 sm:p-5">
          <div className="mb-4 h-5 w-48 rounded bg-gray-200" />

          <div className="overflow-hidden rounded-xl border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 bg-[#f8faf8] p-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="h-4 rounded bg-gray-200" />
              ))}
            </div>

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="grid grid-cols-5 gap-4 border-t border-gray-100 p-4"
              >
                {[1, 2, 3, 4, 5].map((column) => (
                  <div key={column} className="h-4 rounded bg-gray-200" />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-3 h-3 w-40 rounded bg-gray-200" />
        </section>

        <section className="mt-4 rounded-xl border border-gray-200/80 bg-white/80 p-4 sm:p-5">
          <div className="mb-4 h-5 w-40 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200/80 p-4"
              >
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="mt-3 h-6 w-32 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>

        <div className="py-6">
          <div className="h-10 w-40 rounded-lg bg-gray-200" />
        </div>
      </div>
    </main>
  );
}
export default ProductDetailsLoading;
