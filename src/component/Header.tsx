import Image from "next/image";
import logo from "@/Assets/logo-icon.png";
import CurrentDate from "./CurrentDate";
import NavLink from "./NavLink";
import UserInfo from "./UserInfo";
import { Suspense } from "react";

const Header = () => {
return ( <header className="mx-auto w-full max-w-[1200px] px-8 py-5"> <div className="flex items-center justify-between">
{/* Logo + Title + Date */} <div className="flex items-center gap-4"> <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-600"> <Image
           src={logo}
           alt="বাজার দর"
           width={50}
           height={50}
           priority
           className="h-full w-full object-contain p-2 brightness-0 invert contrast-150"
         /> </div>


      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          বাজার দর
        </h1>

        <CurrentDate />
      </div>
    </div>

    {/* Login / Signup / User Name / Logout */}
    <UserInfo />
  </div>

  <Suspense fallback={<div />}>
    <NavLink />
  </Suspense>
</header>


);
};

export default Header;
