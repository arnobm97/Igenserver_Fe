// app/page.tsx or pages/index.tsx
'use client'; // if using App Router (Next.js 13+)

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CardStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Motion values for card transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [0.95, 0.75]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [0.9, 0.7]);

  return (
    <div className="h-[300vh] bg-gray-900 relative overflow-hidden">
      <div ref={containerRef} className="sticky top-0 h-screen flex items-center justify-center">
        {/* Card 1 */}
        <motion.div
          style={{ y: y3, scale: scale3 }}
          className="absolute w-80 h-96 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
        />
        {/* Card 2 */}
        <motion.div
          style={{ y: y2, scale: scale2 }}
          className="absolute w-80 h-96 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 shadow-lg"
        />
        {/* Card 3 */}
        <motion.div
          style={{ y: y1, scale: scale1 }}
          className="absolute w-80 h-96 rounded-2xl bg-gradient-to-br from-yellow-400 to-red-400 shadow-lg"
        />
      </div>
    </div>
  );
}
