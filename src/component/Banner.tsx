import CurrentDate from "./CurrentDate";
import Image from "next/image";
import heroImg from "@/Assets/bazar-hero.png";

const Banner = () => {
  return (
    <section className="mx-auto w-full max-w-287.5 px-4 pt-5 sm:px-6 sm:pt-8 lg:px-8">
      {" "}
      <div className="grid items-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:rounded-3xl md:grid-cols-2">
        {" "}
        <div className="px-5 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-12 lg:py-12">
          <span className="inline-flex max-w-full items-center rounded-lg bg-green-50 px-3 py-2 text-xs font-bold text-green-700 sm:px-4 sm:text-sm">
            {" "}
            <CurrentDate />{" "}
          </span>
          
          <h1 className="mt-4 text-2xl leading-snug font-bold text-gray-900 sm:text-3xl lg:text-4xl lg:leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
        
          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#AllProducts"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg active:scale-95 sm:text-base"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="relative h-55 w-full sm:h-75 md:h-87.5 lg:h-105">
          <Image
            src={heroImg}
            alt="বাজারের ছবি"
            fill
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 600px"
            className="object-contain p-4 transition-transform duration-300 hover:scale-105 sm:p-6"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
