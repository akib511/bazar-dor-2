"use client";

import { useSyncExternalStore } from "react";

const formatFullDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

const formatShortDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

const subscribe = () => () => {};

const CurrentDate = () => {
  const fullDate = useSyncExternalStore(subscribe, formatFullDate, () => "");
  const shortDate = useSyncExternalStore(subscribe, formatShortDate, () => "");

  return (
    <p className="mt-1 min-h-4 whitespace-nowrap text-xs text-gray-500 sm:min-h-5 sm:text-sm">
      {/* মোবাইলে ছোট তারিখ */}
      <span className="sm:hidden">{shortDate}</span>

      {/* বড় স্ক্রিনে পুরো তারিখ */}
      <span className="hidden sm:inline">{fullDate}</span>
    </p>
  );
};

export default CurrentDate;