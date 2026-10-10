"use client";

import { useSyncExternalStore } from "react";

const formatDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });


const subscribe = () => () => {};

const CurrentDate = () => {
  const date = useSyncExternalStore(
    subscribe,
    formatDate, 
    () => "" 
  );

  return <p className="mt-1 min-h-5 text-sm text-gray-500">{date}</p>;
};

export default CurrentDate;