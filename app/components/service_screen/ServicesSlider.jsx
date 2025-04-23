'use client';

import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { initialSlides } from '../../data/initialSlides';

export default function AutoScrollCarousel() {
  const containerRef = useRef(null);
  const [scrolling, setScrolling] = useState(true);

  // Autoscroll using requestAnimationFrame
  useAnimationFrame((t, delta) => {
    if (!scrolling) return;
    const container = containerRef.current;
    if (!container) return;

    container.scrollLeft += 0.1 * delta; // tweak speed here
  });

  // Stop autoscroll on hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseEnter = () => setScrolling(false);
    const handleMouseLeave = () => setScrolling(true);

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="bg-black py-10">
      <div
        ref={containerRef}
        className="scrollbar-hide flex overflow-x-auto whitespace-nowrap gap-4 px-10"
      >
        {initialSlides.concat(initialSlides).map((slide, i) => (
          <motion.div
            key={i}
            className="min-w-[300px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-300 relative"
          >
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
