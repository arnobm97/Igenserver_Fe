"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { services } from "../../data/services"
import { MoveRight } from "lucide-react"

export default function AnimatedServices({ setActiveService }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPosition = container.scrollTop
      const sectionHeight = container.clientHeight
      const newIndex = Math.floor(scrollPosition / sectionHeight)
      setActiveIndex(newIndex)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const textVariants = {
    hidden: { opacity: 0 },  
    visible: { opacity: 1 },  
  };

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh_-_00px)] md:h-[calc(100vh_-_300px)] xl:h-[calc(100vh_-_40px)] w-full max-w-[calc(100%-10px)] rounded-[2rem] mt-7 overflow-y-scroll "
      style={{ scrollBehavior: "smooth" }}
    >
      {services.map((service, index) => (
        <div key={index} className="flex">
        <div className="bg-transparent text-[150px] tracking-[-12px] hidden md:block">
          <p className="text-outline font-light text-transparent">{String(activeIndex + 1).padStart(2, '0')}</p>
          </div>
        <div className="h-fit snap-start sticky top-[30px] p-[10px] xl:pb-32">
          <div className="flex flex-col lg:flex-row justify-between gap-[150px] h-full px-0 lg:px-[60px] mx-auto"
          >
            <motion.div
              className="space-y-3 w-full lg:w-1/2 sticky top-[40px] xl:flex flex-col gap-5 text-right xl:text-left"
              initial="hidden"
              animate={activeIndex === index ? "visible" : "hidden"}
              variants={textVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-lg lg:text-[2.5rem] 2xl:text-[3.5rem] leading-[3rem] 2xl:leading-[4.125rem] font-bold text-white">{service.title}</h2>
              <p className="text-[#ABABAB] text-xl 2xl:text-2xl hidden md:block tracking-wider">{service.description}</p>
              <div className="flex items-center">
              <button className="relative px-5 py-4 font-medium text-[.9375rem] rounded-full border border-[#DB6E27] text-white hover:bg-[#DB6E27]/80 transition duration-300 ease-in-out">
                More Project Details
              </button>
              <div className="w-14 h-14 flex justify-center items-center bg-[#DB6E27] rounded-full -ml-3">
                <MoveRight />
              </div>
              </div>
            </motion.div>
            <div className="w-full lg:w-1/2 xl:mt-8 lg:mt-0">
              <motion.div
                className="w-full relative h-[400px] xl:w-[500px] xl:h-[500px]"
                initial={{ opacity: 0, y: 500 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              >
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="h-full w-full object-cover rounded-[40px] overflow-hidden"
                  
                />
                 <motion.button
                onClick={() => setActiveService(service)}
                className="absolute bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Take A Look
              </motion.button>
              </motion.div>
             
            </div>
          </div>
        </div>
        </div>
      ))}
    </div>
  )
}

