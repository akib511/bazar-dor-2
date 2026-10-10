import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-200/80 bg-white/80 p-8 text-center">
        <div className="text-6xl">🔍</div>

        <h1 className="mt-4 text-5xl font-bold text-green-600">৪০৪</h1>

        <h2 className="mt-3 text-xl font-bold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          আপনি যে ক্যাটেগরি বা পণ্যটি খুঁজছেন সেটি নেই |
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}