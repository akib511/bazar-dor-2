import React from "react";
import MarqueeText from "react-marquee-text";

type ProductChange = {
  dir: "up" | "down" | "flat";
  pct: number;
};

type Product = {
  id: string;
  image: string;
  nameBn: string;
  today: number;
  unit: "kg" | "litre" | "dozen" | "piece";
  change: ProductChange;
};

const bn = (n: number) => n.toLocaleString("bn-BD");

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  const data: Product[] = await res.json();

  return (
    <div className="flex items-center">
      <MarqueeText duration={10} direction="right" className="py-1">
        <div className="flex items-center gap-3 pt-6 whitespace-nowrap">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm"
            >
              <div className="flex gap-3">
                {item.image}

                <span className="font-semibold">{item.nameBn}</span>

                <span className="text-black">
                  {bn(item.today)} টাকা/
                  {unitBn[item.unit] ?? item.unit}
                </span>

                {item.change.dir === "up" && (
                  <span className="font-semibold text-red-600">
                    ▲ {bn(Math.abs(item.change.pct))}%
                  </span>
                )}

                {item.change.dir === "down" && (
                  <span className="font-semibold text-green-600">
                    ▼ {bn(Math.abs(item.change.pct))}%
                  </span>
                )}

                {item.change.dir === "flat" && (
                  <span className="font-semibold text-gray-400">–</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
