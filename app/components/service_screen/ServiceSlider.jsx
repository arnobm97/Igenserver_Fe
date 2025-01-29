"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { initialSlides } from "../../data/initialSlides";
import { useRouter } from "next/navigation";

const ServiceSlider = ({ setDisplayMainServices }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const redDivRef = useRef(null);
  const imgRefs = useRef([]);
  const sliderRef = useRef(null);
  const router = useRouter();

  const totalSlides = initialSlides.length;

  const getNextIndex = (currentIndex) => (currentIndex + 1) % totalSlides;
  const getPreviousIndex = (currentIndex) =>
    (currentIndex - 1 + totalSlides) % totalSlides;

  const checkIntersection = () => {
    if (!redDivRef.current) return;

    const redDivRect = redDivRef.current.getBoundingClientRect();

    imgRefs.current.forEach((img, index) => {
      if (img) {
        const imgRect = img.getBoundingClientRect();

        const isTouching =
          imgRect.right >= redDivRect.left &&
          imgRect.left <= redDivRect.right &&
          imgRect.bottom >= redDivRect.top &&
          imgRect.top <= redDivRect.bottom;

        if (isTouching && activeIndex !== index % totalSlides) {
          setActiveIndex(index % totalSlides);
        }
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + 1;

          if (newPosition >= totalSlides * 300) {
            // Reset scroll position for infinite looping
            return 0;
          }

          return newPosition;
        });
        checkIntersection();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  const handleWheel = (e) => {
    if (sliderRef.current) {
      setIsPaused(true);
      const newPosition = scrollPosition + e.deltaY;

      if (newPosition < 0) {
        setScrollPosition((totalSlides - 1) * 300); // Wrap to end for backward scroll
      } else if (newPosition >= totalSlides * 300) {
        setScrollPosition(0); // Wrap to start for forward scroll
      } else {
        setScrollPosition(newPosition);
      }

      setTimeout(() => setIsPaused(false), 500); // Resume auto-scroll after delay
    }
  };

  return (
    <div
      className="relative w-full h-[calc(100vh_-_90px)] overflow-hidden !cursor-default"
      onWheel={handleWheel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={redDivRef}
        className="absolute h-[10px] w-[10px] bg-transparent top-0 left-[500px]"
      ></div>

      <motion.div
        ref={sliderRef}
        className="flex items-center gap-8"
        animate={{
          x: `${-scrollPosition}px`,
        }}
        transition={{
          duration: 0.5,
          ease: "linear",
        }}
        style={{
          whiteSpace: "nowrap",
        }}
      >
        {[...initialSlides, ...initialSlides].map((slide, index) => (
          <motion.div
            key={index}
            className="relative items-start flex h-[400px] min-w-fit"
          >
            <motion.img
              ref={(el) => (imgRefs.current[index] = el)}
              src={slide.image || "/placeholder.svg"}
              alt={slide.description}
              className="rounded-xl cursor-pointer"
              onClick={() => router.push(`/services?service=${index % totalSlides}`)}
              initial={{
                width: "300px",
                height: "200px",
              }}
              animate={{
                width: activeIndex === index % totalSlides ? "500px" : "300px",
                height: activeIndex === index % totalSlides ? "300px" : "200px",
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex items-start gap-7 pl-[15%] -mt-16 h-[100px]">
        {initialSlides.map((slide, index) => (
          <div key={index} className="relative flex items-center">
            <motion.div
              className="w-0.5 bg-gray-200"
              initial={{ height: "24px" }}
              animate={{
                height: activeIndex === index ? "64px" : "24px",
                backgroundColor:
                  activeIndex === index ? "#3B82F6" : "#E5E7EB",
              }}
              transition={{ duration: 0.5 }}
            />
            {activeIndex === index && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="absolute -right-[50px] -bottom-[25px] text-white text-sm whitespace-nowrap"
              >
                {slide.navData}
              </motion.p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSlider;
