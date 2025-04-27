"use client";

import { motion } from "framer-motion";

export default function ScrollMouseIndicator() {
  return (
    <motion.div
      className="fixed bottom-7 lg:bottom-20 right-3 lg:right-7 transform -translate-x-1/2 z-50 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Animated mouse bounce */}
      <motion.div
        className="w-[35px] h-[55px] border-2 border-[#DB6E27] rounded-full flex justify-center items-start p-1"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Moving dot */}
        <motion.div
          className="w-[6px] h-[6px] bg-[#DB6E27] rounded-full"
          animate={{
            y: [0, 15, 0],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
