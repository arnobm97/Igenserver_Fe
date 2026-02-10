"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Dot } from "lucide-react";
import ShuffledCards from "../ShuffledCards";
import "./animatedBorder.css";
import ServiceMainScreen from "../service_screen/ServiceMainScreen";

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
      const { width, height, top, left } =
        divRef.current.getBoundingClientRect();
      setDimensions({ width, height, top, left });
    }
  }, []);

  const handleShrink = () => {
    setIsExpanded(false);
  };

  const baseStyle = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderImageSlice: 1,
    backdropFilter: "blur(18px)",
    boxShadow: "-8px -8px 16px 0px rgba(0, 0, 0, 0.5) inset",
    borderRadius: "10px",
    left: "calc(50% - 225px)",
    bottom: "52px",
    zIndex: 15,
    transition: "z-index 0.3s",
  };

  const expandedStyle = {
    width: "calc(100% - 30px)",
    height: "calc(100% - 30px)",
    borderRadius: "10px",
    left: "15px",
    top: "10px",
    bottom: "0px",
    right: "15px",
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    background:
      "linear-gradient(180deg, rgba(40, 40, 40, 0.5) 0%, rgba(61, 61, 61, 0.5) 50%, rgba(40, 40, 40, 0.5) 100%)",
    padding: "10px 0",
  };

  return (
    <div className="rounded-xl font-raleway">
      <motion.div
        style={baseStyle}
        ref={divRef}
        className={`w-[450px] max-w-[calc(100vw-20px)] h-[375px] 2xl:h-[450px] bg-zinc-400 bg-opacity-40 rounded-[10px] border-primary backdrop-blur-2xl p-[10px] font-nordiquePro`}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {dimensions.width > 0 && dimensions.height > 0 && !isExpanded && (
          <motion.div
            className="border-gradient"
            style={{
              filter: "drop-shadow(0 0 3px white)",
              WebkitFilter: "drop-shadow(0 0 3px white)",
            }}
          />
        )}

        <div
          className={`relative h-full py-[30px] px-[15px]`}
          style={{
            zIndex: 1,
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
        </div>
      </motion.div>
      {isExpanded && (
        <motion.div className="fixed z-50" animate={expandedStyle}>
          <ServiceMainScreen onClose={handleShrink} isExpanded={isExpanded} />
        </motion.div>
      )}
    </div>
  );
}
