"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ChatbotMainScreen from "../chatbot_screen/ChatbotMainScreen";

export default function SelectMenuCardChatbot() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState('50%')
  const [expandCount, setExpandCount] = useState(0);

  useEffect(() => {
    if (isExpanded) {
      setContainerWidth('100%')
    } else {
      const timeoutId = setTimeout(() => {
        setContainerWidth('10%')
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isExpanded])

  const containerStyle = {
    perspective: "700px",
    position: "absolute",
    bottom: 80,
    left: "-5px",
    width: containerWidth,
    height: "100%",
    transition: 'width 0.5s ease-in-out',
    zIndex: 5,
  }

  const smallContainerStyle = {
    perspective: "700px",
    position: "absolute",
    bottom: 0,
    left: expandCount > 0 ? '0px ' : "",
    width: containerWidth,
    height: "100%",
    transition: 'width 0.5s ease-in-out',
    zIndex: 5,
  }


  const expandedContainerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  }

  const baseStyle = {
    position: "absolute",
    backgroundImage: "url('/images/FirstSlideBgPattern1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderImageSlice: 1,
    backdropFilter: "blur(18px)",
    boxShadow: "-8px -8px 16px 0px rgba(0, 0, 0, 0.5) inset",
    borderRadius: "10px",
    transformOrigin: "center",
    rotateY: isExpanded ? 0 : -15,
    bottom: "0px",
  };

  const expandedStyle = {
    width: "calc(100% - 50px)",
    height: "calc(100% - 10px)",
    left: "15px",
    top: "15px",
    bottom: "0px",
    right: "15px",
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    background:
      "linear-gradient(180deg, rgba(40, 40, 40, 0.5) 0%, rgba(61, 61, 61, 0.5) 50%, rgba(40, 40, 40, 0.5) 100%)",
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <div className="hidden xl:block" style={isExpanded ? expandedContainerStyle : containerStyle}>
        <motion.div
          style={baseStyle}
          className={`absolute w-[380px] h-[300px] bg-[#e7e4f01c] cursor-pointer z-10 overflow-hidden xl:bottom-0 xl:left-[5%] ${expandCount > 0 ? '2xl:left-[80px]' : '2xl:left-[80px] '} ${isExpanded && " !z-[30] "}`}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileHover={{
            rotateY: isExpanded ? 0 : 5,
            translateX: isExpanded ? 0 : expandCount > 0 ? 25 : 25,
            translateY: isExpanded ? 0 : 15,
            transition: { duration: 0.5 },
            scaleX: 1
          }}
          animate={isExpanded ? expandedStyle : ''}
        >
          <div
            className="w-full border border-gray-700 text-black h-full "
            style={{
              borderImageSource:
                "linear-gradient(90deg, rgba(61, 61, 61, 0.15) 0%, #282828 100%)",
              borderImageSlice: 1,
              perspective: "700px",
            }}
          >
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="content"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-full grid place-content-center"
                  onClick={() => { setIsExpanded(true); setExpandCount(1) }}
                >
                  <div>
                    <img src="/images/Wave.svg" alt="Icon" />
                  </div>
                  <div className="text-white text-center text-[25px] font-[400] flex items-center gap-3 cursor-pointer">
                    <span>Connect With Us</span>
                    <span className="border rounded-full p-1 -rotate-[45deg]">
                      <ArrowRight />
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <ChatbotMainScreen handleClose={handleClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

    </>
  );
}
