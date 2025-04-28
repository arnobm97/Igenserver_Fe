import { motion } from "framer-motion";

const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    {[0, 1, 2].map((dot) => (
      <motion.span
        key={dot}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: dot * 0.2,
          ease: "easeInOut"
        }}
        className="w-3 h-3 bg-gray-200 rounded-full"
      >
        .
      </motion.span>
    ))}
  </div>
);

export default TypingIndicator