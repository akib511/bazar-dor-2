import CurrentDate from "./CurrentDate";
import Image from "next/image";
import heroImg from "@/Assets/bazar-hero.png";

const Banner = () => {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pt-8">
      <div className="grid items-center overflow-hidden rounded-3xl border border-gray-300 bg-white shadow-sm md:grid-cols-2">
        <div className="px-6 py-10 sm:px-10 md:px-12">
          <span className="inline-block rounded-lg bg-green-50 px-4 py-2 font-bold">
            <CurrentDate />
          </span>

          <h1 className="mt-4 text-2xl font-bold text-gray-900 ">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="mt-6 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg active:scale-95">
            সব পণ্য দেখুন
          </button>
        </div>

        <div className="relative h-[280px] w-full sm:h-[350px] md:h-[400px]">
          <Image
            src={heroImg}
            alt="বাজারের ছবি"
            fill
            priority
            className="object-contain p-6 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
