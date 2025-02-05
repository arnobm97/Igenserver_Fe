"use client"

import { useState } from "react"
import { MousePointerClick } from "lucide-react"
import { motion } from "framer-motion"

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
    <div className="flex flex-col lg:flex-row bg-zinc-900 mb-10 w-full max-w-7xl mx-auto">
      {/* Left Section */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />
        <h1 className="absolute top-4 left-4 text-2xl lg:text-4xl font-bold text-white z-20 tracking-wider">
          MY DUBAI PROPERTY
        </h1>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jotdUymSUZAqT46iqY3Bnr7Zgh0Q2t.png')",
            backgroundPosition: "left center",
          }}
        />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80 z-20">
          <MousePointerClick className="w-4 h-4" />
          <span className="text-sm">Scroll to experience the journey</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 bg-zinc-900 text-white">
        <div
          className="h-40 lg:h-52 w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jotdUymSUZAqT46iqY3Bnr7Zgh0Q2t.png')",
            backgroundPosition: "right top",
          }}
        />

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                className={`border-b border-zinc-800 pb-4 cursor-pointer transition-opacity duration-300 ${
                  activeIndex === index ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setActiveIndex(index)}
                whileHover={{ opacity: 1 }}
              >
                <h2 className="text-base sm:text-lg font-medium tracking-wide">{item.title}</h2>
                {activeIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm sm:text-base text-zinc-400 leading-relaxed"
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
