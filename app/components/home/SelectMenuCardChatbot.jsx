"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ChatbotMainScreen from "../chatbot_screen/ChatbotMainScreen";

export default function SelectMenuCardChatbot() {
  const [isExpanded, setIsExpanded] = useState(false);
  // Change initial width to match the collapsed state
  const [expandCount, setExpandCount] = useState(0);

  const containerStyle = {
    perspective: "700px",
    transition: 'width 0.5s ease-in-out 0.3s',
    zIndex: 5,
  }

  const baseStyle = {
    backgroundImage: "url('/images/FirstSlideBgPattern1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderImageSlice: 1,
    backdropFilter: "blur(18px)",
    boxShadow: "-8px -8px 16px 0px rgba(0, 0, 0, 0.5) inset",
    borderRadius: "10px",
    transformOrigin: "right",
    // rotateY: -15,
    bottom: "0px",
  };

  const expandedStyle = {
    width: "calc(100% - 30px)",
    height: "calc(100% - 30px)",
    left: "15px",
    top: "15px",
    right: "15px",
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    background:
      "linear-gradient(180deg, rgba(40, 40, 40, 0.5) 0%, rgba(61, 61, 61, 0.5) 50%, rgba(40, 40, 40, 0.5) 100%)",
    opacity: 1
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <div className="hidden xl:block" style={{ ...containerStyle }}>
        <motion.div
          style={baseStyle}
          className={`w-[380px] h-[300px] bg-[#e7e4f01c] cursor-pointer z-10 overflow-hidden`}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileHover={{
            rotateY: 15,
            translateX: 10,
            translateY: 10,
            transition: { duration: 0.5 },
            scaleX: 1
          }}
          animate={{ rotateY: -15 }}
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

          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={expandedStyle}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed rounded-[20px] overflow-hidden z-50"
            style={expandedStyle}
          >
            <ChatbotMainScreen handleClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
