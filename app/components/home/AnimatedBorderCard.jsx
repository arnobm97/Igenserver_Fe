"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"



export default function AnimatedBorderCard({ children, width = 380, height = 300 }) {
  const [dimensions, setDimensions] = useState({ width, height })
  const cardRef = useRef(null)

  useEffect(() => {
    if (cardRef.current) {
      const { width, height } = cardRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative rounded-lg overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <motion.svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.rect
          x="0"
          y="0"
          width={dimensions.width}
          height={dimensions.height}
          stroke="url(#fadeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="100 1000"
          animate={{
            strokeDashoffset: [0, -1100],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="5"
          fill="white"
          filter="url(#glow)"
          animate={{
            cx: [0, dimensions.width, dimensions.width, 0, 0],
            cy: [0, 0, dimensions.height, dimensions.height, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.svg>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

