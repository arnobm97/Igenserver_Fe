"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Rocket } from "lucide-react"
import ServiceMainScreen from "../service_screen/ServiceMainScreen"
import { services } from "../../data/services"
import AnimatedBorderCard from "./AnimatedBorderCard"

export default function SelectMenuCardService() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [serviceImages, setServiceImages] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const divRef = useRef(null)
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 200,
    left: 200,
  })

  useEffect(() => {
    if (!divRef.current) return

    const updateDimensions = () => {
      const { width, height, top, left } = divRef.current.getBoundingClientRect()
      setDimensions({ width, height, top, left })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    setServiceImages(services.map(service=>service.image))
  }, [])

  useEffect(() => {
    if (isExpanded || serviceImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % serviceImages.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [isExpanded, serviceImages])

  const containerStyle = {
    perspective: "700px",
    position: "absolute",
    top: "0",
    right: "-14px",
    width: "100%",
    height: "100%",
    zIndex: isHovered ? 10 : 0
  }

  const expandedContainerStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
  }

  const baseStyle = {
    backgroundImage: "url('/images/lastSlideInnetIcon.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderImageSlice: 1,
    backdropFilter: "blur(18px)",
    boxShadow: "-8px -8px 16px 0px rgba(0, 0, 0, 0.5) inset",
    borderRadius: "10px",
    transformOrigin: "center",
    transition: "background-image 3s ease, opacity 2s ease",
    opacity: 1,
    bottom:35,
  }

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
  }

  const handleShrink = () => {
    setIsExpanded(false)
  }

  return (
    <div style={isExpanded ? expandedContainerStyle : containerStyle}>
   <motion.div
        ref={divRef}
        style={baseStyle}
        className={`absolute w-[380px] h-[300px]
              cursor-pointer z-10 
              xl:right-[5%] 2xl:right-[9%]
              ${isExpanded ? "!z-[30]" : "overflow-hidden"}`}
        animate={isExpanded ? expandedStyle : { rotateY: 15 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileHover={{
          rotateY: isExpanded ? 0 : -15,
          translateX: isExpanded ? 0 : 20,
          translateY: isExpanded ? 0 : 10,
          transition: { duration: 0.5 },
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
              className="flex flex-col items-center "
            >
              <div>
              <div
                  className="text-gray-200 text-center text-[18px] font-[400] flex items-center gap-3 absolute left-[75px] top-[5.75px] bg-black bg-opacity-90 p-3 cursor-pointer backdrop-blur-2xl"
                >
                  <span>Portfolio</span>
                </div>
                <div
                  className="text-gray-200 text-center text-[18px] font-[400] flex items-center gap-3 absolute right-[21px] bottom-3 bg-black bg-opacity-90 p-3 cursor-pointer backdrop-blur-2xl !z-[200]"
                  onClick={() => setIsExpanded(true)}
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
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              onHoverStart={() => setIsHovered(true)}  // Set hover state to true
              onHoverEnd={() => setIsHovered(false)}   // Set hover state to false
            >
              <ServiceMainScreen onClose={handleShrink} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
