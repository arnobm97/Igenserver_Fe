"use client"

import { useState } from "react"
import { MousePointerClick } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0)

  const menuItems = [
    {
      title: "UI/UX",
      description:
        "Our work with the Indian Navy involved the development of a custom web application that streamlined their internal processes, enabling them to operate more efficiently and effectively.",
    },
    {
      title: "WEB DEVELOPMENT",
      description:
        "Developing cutting-edge web solutions using modern technologies and best practices to ensure optimal performance and user experience.",
    },
    {
      title: "DEPLOYMENT",
      description:
        "Implementing robust deployment strategies with CI/CD pipelines to ensure smooth and reliable application updates.",
    },
    {
      title: "TRAINING",
      description:
        "Providing comprehensive training programs to enable teams to maintain and enhance their digital solutions independently.",
    },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-zinc-900 mb-10 w-full xl:max-h-[550px] 2xl:max-h-[690px]">
      {/* Left Section */}
      <div className="relative w-full lg:h-auto">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" /> */}
        <h1 className="py-3 lg:py-10 text-2xl lg:text-4xl font-bold text-white text-center z-20 tracking-wider">
          MY DUBAI PROPERTY
        </h1>
        <Image src="/images/portfolio_image.jpg" alt="Portfolio image" width={0} height={0} sizes="100vw" className="w-full h-[250px] xl:h-full object-cover" />
        {/* <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80 z-20">
          <MousePointerClick className="w-4 h-4" />
          <span className="text-sm">Scroll to experience the journey</span>
        </div> */}
      </div>

      {/* Right Section */}
      <div className="w-full bg-zinc-900 text-white">
        <Image src="/images/portfolio_image.jpg" alt="Portfolio image" width={0} height={0} sizes="100vw" className="w-full h-0 xl:h-[210px] object-cover" />

        <div className="p-4 sm:p-6">
          <div className="w-full space-y-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className={`border-b last:border-none border-zinc-800 pb-4 cursor-pointer transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ opacity: 1 }}
                layout
              >
                <h2 className="text-base sm:text-lg font-medium tracking-wide">{item.title}</h2>
                {activeIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-2 text-sm sm:text-base text-zinc-400 leading-relaxed"
                  >
                    {item.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
