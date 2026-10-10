"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Avatar = ({
  image,
  name,
  email,
  size,
}: {
  image?: string | null;
  name?: string | null;
  email?: string | null;
  size: "sm" | "lg";
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [image]);

  const initial = (email || name || "U").trim().charAt(0).toUpperCase();

  const sizeClass = size === "sm" ? "h-9 w-9 text-sm" : "h-12 w-12 text-lg";

  if (image && !imageFailed) {
    return (
      <img
        src={image}
        alt={name || "Profile"}
        referrerPolicy="no-referrer"
        onError={() => setImageFailed(true)}
        className={`${sizeClass} shrink-0 rounded-full border border-green-100 object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700`}
    >
      {initial}
    </div>
  );
};

const Userinfo = () => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [loggingOut, setLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি।");
        return;
      }

      setIsOpen(false);

      toast.success("সফলভাবে লগআউট হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("লগআউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoggingOut(false);
    }
  };

  if (isPending) {
    return <div className="h-11 w-36 animate-pulse rounded-xl bg-gray-100" />;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/signIn"
          className="rounded-xl border border-green-600 bg-white px-5 py-2.5 text-sm font-semibold text-green-600 transition-all duration-200 hover:bg-green-600 hover:text-white active:scale-95"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signUp"
          className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg active:scale-95"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-label="প্রোফাইল মেনু"
        className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-2 transition hover:bg-green-50"
      >
        <Avatar
          image={user.image}
          name={user.name}
          email={user.email}
          size="sm"
        />

        <span className="hidden max-w-32 truncate text-sm font-semibold text-gray-800 sm:block">
          {user.name || "ব্যবহারকারী"}
        </span>

        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        
          <div className="flex items-center gap-3 border-b border-gray-100 p-4">
            <Avatar
              image={user.image}
              name={user.name}
              email={user.email}
              size="lg"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user.name || "ব্যবহারকারী"}
              </p>

              <p className="mt-1 break-all text-xs text-gray-500">
                {user.email}
              </p>
            </div>
          </div>

          <div className="p-2">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 21a8 8 0 0 0-16 0m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                />
              </svg>
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 17l5-5-5-5m5 5H3m9-9h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"
                />
              </svg>

              {loggingOut ? "লগআউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userinfo;
