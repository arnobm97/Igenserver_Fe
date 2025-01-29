"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { services } from "../../data/services"

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
      className="h-[calc(100vh_-_40px)] max-w-[calc(100vw_-_10px)] overflow-y-scroll"
      style={{ scrollBehavior: "smooth" }}
    >
      {services.map((service, index) => (
        <div key={index} className="h-fit w-full snap-start sticky top-[30px] p-10 pb-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-[150px] h-full px-4 lg:px-[60px] mx-auto "
          >
            <motion.div
              className="space-y-3 w-full lg:w-1/3"
              initial="hidden"
              animate={activeIndex === index ? "visible" : "hidden"}
              variants={textVariants}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-[25px] font-bold">{service.title}</h2>
              <p className="text-gray-400 text-lg">{service.description}</p>
              <div className="text-gray-500 pt-[30px] lg:pt-[90px] grid grid-cols-2 gap-[20px]">
                <div>
                  <p className="font-bold text-gray-300">Client:</p>
                  {service.client.map((client, idx) => (
                    <p key={idx}>{client}</p>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-300">Product:</p>
                  {service.product.map((product, idx) => (
                    <p key={idx}>{product}</p>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-300">Platform:</p>
                  {service.platform.map((platform, idx) => (
                    <p key={idx}>{platform}</p>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-300">Industry:</p>
                  {service.industry.map((industry, idx) => (
                    <p key={idx}>{industry}</p>
                  ))}
                </div>
              </div>
            </motion.div>
            <div className=" w-full lg:w-1/2 mt-8 lg:mt-0">
              <motion.div
                className="w-full relative h-[300px] lg:w-[500px] lg:h-[500px]"
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
      ))}
    </div>
  )
}

