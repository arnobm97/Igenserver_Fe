"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Dot } from "lucide-react";
import ShuffledCards from "../ShuffledCards";
import Portfolios from "../Portfolios";
import "./animatedBorder.css";

export default function SelectMenuCardCenter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (divRef.current) {
      const { width, height, top, left } = divRef.current.getBoundingClientRect();
      setDimensions({ width, height, top, left });
    }
  }, []);

  const baseStyle = {
    position: "absolute",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderImageSlice: 1,
    backdropFilter: "blur(18px)",
    boxShadow: "-8px -8px 16px 0px rgba(0, 0, 0, 0.5) inset",
    borderRadius: "10px",
    left: "calc(50% - 225px)",
    bottom: "52px",
    zIndex: 10,
    transition: "z-index 0.3s",
  };

  const expandedStyle = {
    width: "calc(100% - 30px)",
    height: "calc(100% - 70px)",
    borderRadius: "10px",
    left: "15px",
    top: "50px",
    bottom: "0px",
    right: "15px",
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    background:
      "linear-gradient(180deg, rgba(40, 40, 40, 0.5) 0%, rgba(61, 61, 61, 0.5) 50%, rgba(40, 40, 40, 0.5) 100%)",
  };

  return (
    <div className="rounded-xl">
      <motion.div
        style={baseStyle}
        ref={divRef}
        className={`absolute w-[450px] max-w-[calc(100vw-20px)] h-[375px] 2xl:h-[450px] bg-zinc-400 bg-opacity-40 rounded-[10px] backdrop-blur-2xl p-[10px] font-nordiquePro ${isExpanded && "!z-[30] !p-0 !m-0"
          }`}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        animate={isExpanded ? expandedStyle : {}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
                <stop offset="0%" stopColor="#DB6E27" amplitude='100' />
                <stop offset="50%" stopColor="white" />
                <stop offset="100%" stopColor="#DB6E27" />
              </linearGradient>
              <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="4"
                  floodColor="#DB6E27"
                />
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
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </motion.svg>
        )}

        <div
          className={`relative h-full py-[30px] px-[15px] ${isExpanded && "!pb-0 !px-0"
            }`}
          style={{
            zIndex: isExpanded ? 1000 : 1,
            transition: "z-index 0.3s",
          }}
        >
          {!isExpanded && (
            <>
              <div className="absolute top-0 left-0">
                <Dot />
              </div>
              <div className="absolute top-0 right-0">
                <Dot />
              </div>
              <div className="absolute bottom-0 left-0">
                <Dot />
              </div>
              <div className="absolute bottom-0 right-0">
                <Dot />
              </div>
              <div className="2xl:mb-7">
                <div className="flex items-center justify-between">
                  <p className="text-[22px] font-bold tracking-wider">
                    Services
                  </p>
                  <div
                    className="flex items-center group"
                    onClick={() => setIsExpanded(true)}
                  >
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
          {isExpanded && <Portfolios setIsExpanded={setIsExpanded} />}
        </div>
      </motion.div>
    </div>
  );
}
