"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Dot } from "lucide-react";
import ShuffledCards from "../../ShuffledCards";
import Portfolios from "../../Portfolios";

export default function CenterCard({ isExpanded, setIsExpanded }) {
  const [clicked, setClicked] = useState(false);
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });

  useEffect(() => {
    if (divRef.current) {
      const { width, height, top, left } = divRef.current.getBoundingClientRect();
      setDimensions({ width, height, top, left });
    }
  }, [divRef.current]);

  const expandedStyle = {
    width: "calc(100%)",
    height: "calc(100% - 55px)",
    left: "0px",
    top: "55px",
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    "border-top": "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "30px 30px 0 0",
    background: "linear-gradient(180deg, rgba(40, 40, 40, 0.5) 0%, rgba(61, 61, 61, 0.5) 50%, rgba(40, 40, 40, 0.5) 100%)",
  };

  const handleExploreClick = () => {
    setIsExpanded(true);
    setClicked(true);
  };

  return (
    <div className="rounded-xl grid grid-cols-1 w-full h-[calc(100vh - 100px)] mt-10">
      <motion.div
        ref={divRef}
        className={`w-full h-[350px]  bg-opacity-40 rounded-[10px] backdrop-blur-2xl font-nordiquePro px-3 ${!clicked && ' bg-zinc-400 '}`}
      >
        {dimensions.width > 0 && dimensions.height > 0 && !isExpanded && (
          <motion.svg
            className="absolute inset-0 w-[calc(100%+8px)] h-[calc(100%+8px)] -left-1 -top-1"
            width={dimensions.width + 8}
            height={dimensions.height + 8}
            viewBox={`0 0 ${dimensions.width + 8} ${dimensions.height + 8}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="borderGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DB6E27" />
                <stop offset="50%" stopColor="white" />
                <stop offset="100%" stopColor="#DB6E27" />
              </linearGradient>
              <filter id="neon" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#DB6E27" />
              </filter>
            </defs>
            <motion.rect
              x="4"
              y="4"
              width={dimensions.width}
              height={dimensions.height}
              rx="10"
              stroke="url(#borderGradient)"
              strokeWidth="1.5"
              fill="none"
              filter="url(#neon)"
              initial={{
                strokeDasharray: 1 * (dimensions.width + dimensions.height),
                strokeDashoffset: 2 * (dimensions.width + dimensions.height),
              }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            />
          </motion.svg>
        )}

        <div
          className={`relative w-full h-full py-[30px] ${isExpanded && "!pb-0 !px-0"}`}
        >
          {!isExpanded && (
            <>
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, index) => (
                <div key={index} className={`absolute ${pos}`}>
                  <Dot />
                </div>
              ))}

              <div className="">
                <div className="flex items-center justify-between">
                  <p className="text-[22px] font-bold tracking-wider">Services</p>
                  <div className="flex items-center group" onClick={handleExploreClick}>
                    <button className="border h-[40px] px-[20px] rounded-full cursor-pointer">
                      Explore More
                    </button>
                    <button className="bg-gray-900 h-[40px] w-[40px] grid place-content-center rounded-full cursor-pointer -ml-[10px] group-hover:-rotate-45 group-hover:bg-[#DB6E27] transition-all duration-500">
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
              <ShuffledCards />
            </>
          )}


        </div>
      </motion.div>
      {isExpanded && clicked && (
        <div className="fixed w-full z-10 p-3" style={expandedStyle}>
          <Portfolios setIsExpanded={setIsExpanded} setClicked={setClicked} />
        </div>
      )}
    </div>
  );
}
