"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signIn");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session?.user]);

  // নাম আপডেট
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("আপনার নাম সফলভাবে আপডেট হয়েছে!");

      router.refresh();
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setUpdating(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.replace("/signIn");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    } finally {
      setLoggingOut(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <main className="min-h-[70vh] bg-[#f0f5f0] px-5 py-12">
        <div className="mx-auto max-w-[526px] animate-pulse">
          <div className="mx-auto h-[72px] w-[72px] bg-gray-200" />

          <div className="mt-5 h-6 w-40 rounded bg-gray-200" />

          <div className="mt-5 h-[86px] rounded-xl bg-gray-200" />

          <div className="mt-4 h-[180px] rounded-xl bg-gray-200" />
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-[70vh] bg-[#f0f5f0] px-5 py-10 sm:py-12">
      <div className="mx-auto max-w-[526px]">
        <div className="mb-5">
          <div className="mb-4 flex justify-center">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                width={72}
                height={72}
                unoptimized
                className="h-[72px] w-[72px] rounded-full object-cover"
              />
            ) : (
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-xl font-bold text-[#26352b]">আমার প্রোফাইল</h1>

          <p className="mt-1 text-xs text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <section className="flex items-center gap-3 rounded-xl border border-[#e0e9e0] bg-[#fbfdfb] p-4 sm:gap-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "Profile"}
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-700">
              {(user.name || user.email || "U").charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-[#26352b] sm:text-base">
              {user.name || "ব্যবহারকারী"}
            </h2>

            <p className="mt-1 break-all text-xs text-gray-500 sm:text-sm">
              {user.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="shrink-0 rounded-lg border border-red-400 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60 sm:px-4"
          >
            {loggingOut ? "অপেক্ষা করুন..." : "↪ সাইন আউট"}
          </button>
        </section>

        <section className="mt-4 rounded-xl border border-[#e0e9e0] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-[#26352b]">তথ্য</h2>

          <form onSubmit={handleUpdate} className="mt-7">
            <label
              htmlFor="profile-name"
              className="mb-2 block text-xs font-medium text-gray-800"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম লিখুন"
              maxLength={100}
              required
              disabled={updating}
              className="h-9 w-full rounded-lg border border-[#e0e9e0] bg-transparent px-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={updating}
              className="mt-3 flex h-8 w-full items-center justify-center rounded-lg bg-[#07883d] text-xs font-medium text-white shadow-[0_2px_3px_rgba(0,0,0,0.2)] transition hover:bg-green-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
