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
  }, []);

  const expandedContainerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  };

  const expandedStyle = {
    width: "calc(100% - 20px)",
    height: "calc(100% - 20px)",
    left: "10px",
    top: "10px",
    bottom: "10px",
    right: "10px",
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    borderRadius: "30px",
    background: "linear-gradient(180deg, rgba(40, 40, 40, 0.5) 0%, rgba(61, 61, 61, 0.5) 50%, rgba(40, 40, 40, 0.5) 100%)",
  };

  const handleExploreClick = () => {
    setIsExpanded(true);
    setClicked(true);
  };

  return (
    <div className="rounded-xl grid place-content-center w-full h-full">
      <motion.div
        ref={divRef}
        className={`w-[450px] max-w-[calc(100vw-20px)] h-[465px]  bg-opacity-40 rounded-[10px] backdrop-blur-2xl p-[10px] font-nordiquePro ${!clicked && ' bg-zinc-400 '}`}
        style={clicked ? expandedContainerStyle : {}}
      >
        {dimensions.width > 0 && dimensions.height > 0 && !isExpanded && (
          <motion.svg
            className="svg-border rounded-xl absolute !top-[-4px] !left-[-4px]"
            width={dimensions.width + 10}
            height={dimensions.height + 10}
            viewBox={`0 0 ${dimensions.width + 10} ${dimensions.height + 10}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="borderGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DB6E27" />
                <stop offset="50%" stopColor="white" />
                <stop offset="100%" stopColor="#DB6E27" />
              </linearGradient>
              <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#DB6E27" />
              </filter>
            </defs>
            <motion.rect
              x="5"
              y="5"
              width={dimensions.width}
              height={dimensions.height}
              rx="10"
              stroke="url(#borderGradient)"
              strokeWidth="2"
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
          className={`relative h-full py-[30px] px-[15px] ${isExpanded && "!pb-0 !px-0"}`}
        >
          {!isExpanded && (
            <>
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, index) => (
                <div key={index} className={`absolute ${pos}`}>
                  <Dot />
                </div>
              ))}

              <div className="mb-7">
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

          {isExpanded && clicked && (
            <dialog open className="absolute w-screen h-screen z-10" style={expandedStyle}>
              <Portfolios setIsExpanded={setIsExpanded} setClicked={setClicked} />
            </dialog>
          )}
        </div>
      </motion.div>
    </div>
  );
}
