"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { services } from "../../data/services";

const gradients = [
  "bg-gradient-to-b from-black via-black to-[#3a1a1a]",
  "bg-gradient-to-b from-black via-black to-[#2a2a20]",
  "bg-gradient-to-b from-black via-black to-[#1a2a3a]",
  "bg-gradient-to-b from-black via-black to-[#3a2a3a]",
  "bg-gradient-to-b from-black via-black to-[#1a1a2a]",
  "bg-gradient-to-b from-black via-black to-[#2a2a3a]",
  "bg-gradient-to-b from-black via-black to-[#3a2a2a]",
];

export default function ServicesSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar h-[300px]">
      {services.map((service, i) => {
        const isActive = i === activeIndex;

        return (
          <div
            key={i}
            onMouseEnter={() => setActiveIndex(i)}
            className={`
              group relative flex-shrink-0
              transition-all duration-700 ease-in-out
              cursor-pointer text-white overflow-hidden
              ${gradients[i % gradients.length]}
              ${isActive ? "w-[350px]" : "w-24 hover:w-[350px]"}
              flex items-center justify-center rounded-xl
            `}
          >
            <div className="w-[350px] px-4 py-6 flex flex-col h-full">
              {!isActive ? (
                <div className="flex flex-col justify-between items-center h-full">
                  <p
                    className="text-sm font-bold writing-[vertical-rl] rotate-180"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {service.title}
                  </p>
                  <service.Icon className="mt-4 opacity-60" size={20} />
                </div>
              ) : (
                <div className="w-[350px] h-full flex flex-col justify-end">
                  <div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-sm text-white/80 mb-4 line-clamp-3">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <service.Icon className="opacity-60" size={20} />

                    <Link
                      href="#"
                      className="text-sm font-medium hover:underline"
                    >
                      Preview {service.title.toLowerCase()}
                    </Link>
                    <ArrowRight className="" size={16} />

                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
