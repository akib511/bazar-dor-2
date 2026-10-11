import Image from "next/image";
import logo from "@/Assets/logo-icon.png";
import CurrentDate from "./CurrentDate";
import NavLink from "./NavLink";
import UserInfo from "./UserInfo";
import { Suspense } from "react";

const Header = () => {
  return (
    <header className="mx-auto w-full max-w-287.5 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-600 sm:h-12.5 sm:w-12.5 sm:rounded-2xl">
            <Image
              src={logo}
              alt="বাজার দর"
              width={50}
              height={50}
              priority
              className="h-full w-full object-contain p-1.5 brightness-0 invert contrast-150 sm:p-2"
            />
          </div>

          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-lg font-bold text-gray-900 sm:text-2xl">
              বাজার দর
            </h1>

            <div className="whitespace-nowrap text-xs sm:text-sm">
              <CurrentDate />
            </div>
          </div>
        </div>

        <div className="flex w-full justify-end sm:w-auto sm:shrink-0">
          <UserInfo />
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-3 sm:mt-5 sm:pt-4">
        <Suspense
          fallback={
            <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100" />
          }
        >
          <NavLink />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
