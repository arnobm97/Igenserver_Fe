"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

export default function ShuffledCards() {
  const cards = [
    {
      id: 1,
      color: "bg-[#CEFFD1]",
      quote: "Good things aren't ",
      description:
        "We understand everyone wants to feel ",
    },
    {
      id: 2,
      color: "bg-[#D96D26]",
      quote: "Quality over quantity",
      description: "We believe in delivering the be",
    },
    {
      id: 3,
      color: "bg-[#7CA6FF]",
      quote: "Built to last",
      description: "Every product we offer is carefull",
    },
    {
      id: 4,
      color: "bg-[#399B4B]",
      quote: "Attention to detail",
      description: "Every product is chosen with c",
    },
  ]

  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="relative  w-full max-w-md h-full perspective-1000 pt-[56px] px-7 2xl:pl-2">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`absolute max-w-[calc(100vw-100px)] w-[325px] 2xl:w-[375px] h-[145px] 2xl:h-[206px] rounded-xl cursor-pointer ${card.color} bg-opacity-20 backdrop-blur-xl `}
          style={{
            zIndex: hoveredCard === index ? 1000 : cards.length - index,
            transformOrigin: "top-left",
          }}
          initial={{
            rotate: 0,
            translateY: 0,
          }}
          animate={{
            rotate: index === 0 ? 0 : (index ) * 8,
            translateY: index * 4,
          }}
          whileHover={{
            scale: 1.05,
            translateZ: 40,
          }}
          transition={{
            duration: 2, // Slow unfolding over 2 seconds
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-xl backdrop-blur-md border border-white/10 shadow-xl" />

            {/* Content */}
            <div className="relative p-6 text-white space-y-2">
              <p className="text-lg font-medium leading-snug">{card.quote}</p>
              <p className="text-sm text-white/70 leading-relaxed">{card.description}</p>
            </div>

            {/* Arrow icon */}
            {index === 0 && (
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full  backdrop-blur-md flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
