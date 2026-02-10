"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ShuffledCards() {
  const cards = [
    {
      id: 1,
      color: "bg-[#CEFFD1]",
      quote: "Good things aren't ",
      description: "We understand everyone wants to feel ",
    },
    {
      id: 2,
      color: "bg-[#D96D26]",
      quote: "Quality over quantity",
      description: "We believe in delivering the be",
    },
    {
      id: 3,
      color: "bg-[#7CA6FF]",
      quote: "Built to last",
      description: "Every product we offer is carefull",
    },
    {
      id: 4,
      color: "bg-[#399B4B]",
      quote: "Attention to detail",
      description: "Every product is chosen with c",
    },
  ];

  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return; // Don't start interval if paused

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused, cards.length]); // Added cards.length to dependencies

  const handleCardHover = (index) => {
    if (index === activeIndex) {
      // Top card - just pause the autoplay
      setIsPaused(true);
      setHoveredCard(null);
    } else {
      // Other cards - bring to top
      setActiveIndex(index);
      setHoveredCard(index);
    }
  };

  const handleCardLeave = (index) => {
    if (index === activeIndex) {
      // Resume autoplay when leaving top card
      setIsPaused(false);
    }
    setHoveredCard(null);
  };

  return (
    <div className="relative w-full max-w-md h-full perspective-1000 pt-[56px] px-7 lg:px-12 2xl:pl-2">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`absolute max-w-[calc(100vw-100px)] w-[300px] 2xl:w-[375px] h-[145px] 2xl:h-[206px] rounded-xl cursor-pointer ${card.color} bg-opacity-20 backdrop-blur-xl`}
          style={{
            zIndex:
              hoveredCard === index || activeIndex === index
                ? 1000
                : cards.length - index,
            transformOrigin: "top-left",
          }}
          initial={{
            rotate: 0,
            translateY: 0,
          }}
          animate={{
            rotate:
              activeIndex === index
                ? 0
                : ((index - activeIndex + cards.length) % cards.length) * 8,
            translateY:
              ((index - activeIndex + cards.length) % cards.length) * 4,
            scale: hoveredCard === index ? 1.05 : 1,
          }}
          // whileHover={{
          //   scale: 1.05,
          //   translateZ: 40,
          // }}
          // transition={{
          //   duration: 0.75,
          //   type: "spring",
          //   stiffness: 260,
          //   damping: 20,
          // }}
          onMouseEnter={() => handleCardHover(index)}
          onMouseLeave={() => handleCardLeave(index)}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-xl backdrop-blur-md border border-white/10 shadow-xl" />

            {/* Content */}
            <div className="relative p-6 text-white space-y-2">
              <p className="text-lg font-medium leading-snug">{card.quote}</p>
              <p className="text-sm text-white/70 leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Arrow icon */}
            {index === 0 && (
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full  backdrop-blur-md flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
