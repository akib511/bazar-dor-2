
const Footer = () => {
  return (
    <footer className="border-t border-white bg-white">
      <div className="mx-auto flex max-w-287.5 flex-col items-start justify-between gap-3 px-5 py-5 sm:flex-row sm:items-center sm:px-8">
        {/* Left: Website Name */}
        <p className="text-sm font-semibold leading-6 text-black">
          বাজার দর
          <span className="font-normal text-black">
            {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </span>
        </p>

        {/* Right: Price Disclaimer */}
        <p className="text-xs leading-5 text-black sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;

