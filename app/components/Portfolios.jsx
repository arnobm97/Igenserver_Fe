"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Undo } from "lucide-react";
import Portfolio from "./Portfolio";

const pages = [
  {
    component: Portfolio,
    title: "Page 1",
    transform: "perspective(800px) translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
    clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)",
    opacity: 0.5
  },
  {
    component: Portfolio,
    title: "Page 2",
    transform: "perspective(800px) translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
    clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)",
    opacity: 0.2
  },
  {
    component: Portfolio,
    title: "Page 3",
    transform: "perspective(800px) translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
    clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)",
    opacity: 0.2
  },
  {
    component: Portfolio,
    title: "Page 4",
    transform: "perspective(800px) translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
    clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)",
    opacity: 0.2
  },
];

const interpolate = (start, end, percentage) => start + (end - start) * percentage;

const calculateTransformAndClipPath = (scrollPercentage) => {
  const translateY = interpolate(-62, 0, scrollPercentage);
  const translateZ = interpolate(190, 0, scrollPercentage);
  const rotateX = interpolate(-56.5, 0, scrollPercentage);
  const scaleX = interpolate(0.63, 1, scrollPercentage);
  const scaleY = interpolate(0.76, 0.95, scrollPercentage);
  const opacity = interpolate(0.2, 1, scrollPercentage);

  const transformValue = scrollPercentage >= 0.8 ? `perspective(8000px) translate3d(0px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale3d(${scaleX}, ${scaleY}, 1)` : `perspective(1500px) translate3d(0px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale3d(${scaleX}, ${scaleY}, 1)`;
  
 const clipPath = scrollPercentage > 0.8 ? 
    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 
    `polygon(
      ${interpolate(10, 0, scrollPercentage)}% 0%, 
      ${interpolate(90, 100, scrollPercentage)}% 0%,
      ${interpolate(80, 100, scrollPercentage)}% 100%, 
      ${interpolate(20, 0, scrollPercentage)}% 100%)`;

  return { transformValue, opacity, clipPath };
};

const Page = ({ pageIndex, updateTransform, page }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const pageRect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        const scrollPercentage = Math.max(0, Math.min(1, (viewportHeight - pageRect.top) / viewportHeight));

        const { transformValue, opacity, clipPath } = calculateTransformAndClipPath(scrollPercentage);
        updateTransform(pageIndex, transformValue, opacity, clipPath);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: Array.from({ length: 11 }, (_, i) => i / 10), 
      rootMargin: "-50% 0px -50% 0px",
    });

    if (pageRef.current) {
      observer.observe(pageRef.current);
    }

    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
    };
  }, [pageIndex, updateTransform]);

  return (
    <motion.div
      ref={pageRef}
      className="sticky top-[0px] h-[750px] w-[calc(100vw_-_100px)] xl:w-[calc(100vw_-_200px)] grid place-content-center "
      style={{
        transformOrigin: "bottom",
        transformStyle: "preserve-3d",
        transform: page.transform,
        opacity: page.opacity,
        clipPath: page.clipPath,
        transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease-out, clip-path 0.4s ease-out",
      }}
    >
      <Portfolio />
    </motion.div>
  );
};

export default function Portfolios({ setIsExpanded , setClicked}) {
  const containerRef = useRef(null);
  const [pagesState, setPagesState] = useState(pages);

  const updateTransform = (pageIndex, newTransform, newOpacity, newClipPath) => {
    setPagesState((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[pageIndex] = { ...updatedPages[pageIndex], transform: newTransform, opacity: newOpacity, clipPath: newClipPath };
      return updatedPages;
    });
  };

  return (
    <div ref={containerRef} className="relative h-full xl:w-[calc(100vw_-_100px)] overflow-hidden ">
      <button
        onClick={() => {
          setIsExpanded(false);
          setClicked(false)
        }}
        className="fixed top-[20px] left-[20px] text-orange-500 h-[55px] w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border z-[200]"
        aria-label="Undo"
      >
        <Undo className="w-full h-full " />
      </button>
      <div className="overflow-y-auto" style={{ height: "100vh" }}>
        <div className="relative text-lg font-extrabold h-[550px] w-full grid place-content-center text-center overflow-hidden ">
          <div className="z-[10] text-[50px] text-[#DB6E27] space-y-3 tracking-wider">
            <p>Featured</p>
            <p>Portfolio</p>
          </div>
        </div>

        <div className="space-y-[30px] h-[6800px] flex flex-col items-center xl:max-w-full xl:overflow-x-hidden">
          {pagesState.map((page, index) => (
            <Page key={index} pageIndex={index} updateTransform={updateTransform} page={page} />
          ))}
        </div>
      </div>
    </div>
  );
}
