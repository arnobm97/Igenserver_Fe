"use client"

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Portfolio({ page }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const ROTATION_INTERVAL = 10000; // 10 seconds

  const rotateIndex = useCallback(() => {
    setActiveIndex((current) => (current + 1) % page.menuItems.length);
  }, []);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    setAutoplayEnabled(false); // Pause autoplay
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplayEnabled(true), ROTATION_INTERVAL);
  };

  useEffect(() => {
    if (!autoplayEnabled) return;

    const intervalId = setInterval(rotateIndex, ROTATION_INTERVAL);

    return () => clearInterval(intervalId);
  }, [autoplayEnabled, rotateIndex]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 bg-zinc-900 w-full xl:max-h-[550px] 2xl:max-h-[690px]">
      {/* Left Section */}
      <div className="relative w-full xl:h-auto flex flex-col">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" /> */}
        <h1 className="py-3 lg:py-10 text-2xl lg:text-4xl font-bold text-primary text-center z-20 tracking-wider">
          {page.title}
        </h1>
        <div className="relative flex-1">
          <Image src={page.largeImage} alt="Portfolio image" width={0} height={0} sizes="100vw" className="w-full h-[250px] xl:h-full object-cover" />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full h-full flex flex-col bg-zinc-900 text-white">
        <motion.div
          className="relative w-full h-0 xl:h-[210px] 2xl:h-[250px]"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={page.menuItems[activeIndex].image}
            alt={page.menuItems[activeIndex].title}
            width={0}
            height={0}
            className="w-full h-full object-cover"
            sizes="100vw"
          />
        </motion.div>

        <div className="flex-1 p-4 sm:p-6">
          <div className="w-full space-y-4">
            {page.menuItems.map((item, index) => (
              <motion.div
                key={index}
                className={`border-b last:border-none border-zinc-800 pb-4 cursor-pointer transition-opacity duration-300 ${activeIndex === index ? "opacity-100" : "opacity-60 group"
                  }`}
                onClick={() => handleMenuClick(index)}
                whileHover={{ opacity: 1 }}
                layout
              >
                <h2 className={`${activeIndex === index ? "text-primary" : ""
                  } text-base sm:text-lg font-medium tracking-wide group-hover:text-primary`}>{item.title}</h2>
                {activeIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-2 text-sm sm:text-base text-zinc-400 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                )}
              </motion.div>

            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
