"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react";
import Portfolios from "../Portfolios"
import Image from "next/image";

export default function SelectMenuCardService() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = {
    perspective: "700px",
    transition: 'width 0.5s ease-in-out 0.3s',
    zIndex: isHovered ? 10 : 0
  }

  // const expandedContainerStyle = {
  //   position: "fixed",
  //   width: "calc(100% - 30px)",
  //   height: "calc(100% - 30px)",
  //   left: "15px",
  //   top: "15px",
  //   zIndex: 50
  // }

  const baseStyle = {
    backgroundImage: "url('/images/portfolio-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderImageSlice: 1,
    backdropFilter: "blur(18px)",
    boxShadow: "-8px -8px 16px 0px rgba(0, 0, 0, 0.5) inset",
    borderRadius: "10px",
    transformOrigin: "left",
    transition: "background-image 3s ease, opacity 2s ease",
    opacity: 1,
  }

  const expandedStyle = {
    position: "fixed",
    width: "calc(100% - 30px)",
    height: "calc(100% - 30px)",
    left: "15px",
    top: "15px",
    zIndex: 50,
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    opacity: 1,
    background:
      "linear-gradient(180deg, rgba(40, 40, 40, 0.5) 0%, rgba(61, 61, 61, 0.5) 50%, rgba(40, 40, 40, 0.5) 100%)",
    borderRadius: "20px"
  }

  return (
    <>
      <div
        className="hidden xl:block font-raleway"
        style={containerStyle}>
        <motion.div
          style={baseStyle}
          className={`w-[380px] h-[300px]
              cursor-pointer z-10 
              overflow-hidden`}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileHover={{
            rotateY: -15,
            translateX: -10,
            translateY: 10,
            transition: { duration: 0.5 },
          }}
          animate={{ rotateY: 15 }}
          onClick={() => setIsExpanded(true)}
        >
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                key="content"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col items-center "

              >
                <div className="absolute top-0 right-0 w-[173px]">
                  <Image src="/images/lilith.jpg" width={0} height={0} sizes="100vw" className="w-full h-auto object-cover rounded-bl-[2.25rem]" />
                </div>
                <div className="absolute left-0 bottom-0 w-[173px]">
                  <Image src="/images/My Dubai Property.webp" width={0} height={0} sizes="100vw" className="w-full h-auto object-cover rounded-tr-[2.25rem]" />
                </div>
                <div>
                  <div
                    className="text-gray-200 text-center flex items-center gap-3 absolute left-[20px] top-[5.75px] bg-opacity-90 p-3 cursor-pointer"
                  >
                    <Image src="/images/rocket-launch.png" alt="Portfolio icon" width={20} height={20} />
                    <p className="text-xl">Portfolio</p>
                  </div>
                  <div
                    className="text-gray-200 text-center text-[18px] font-[400] flex items-center gap-3 absolute right-[21px] bottom-3 bg-black bg-opacity-90 p-3 cursor-pointer backdrop-blur-2xl !z-[200]"

                  >
                    <span>Take A Look</span>
                    <span className="border rounded-full p-1 -rotate-[45deg] text-orange-400">
                      <ArrowRight />
                    </span>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={expandedStyle}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Portfolios setIsExpanded={setIsExpanded} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
