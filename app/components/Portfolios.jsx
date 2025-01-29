"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Undo } from "lucide-react";
import Portfolio from "./Portfolio";

const pages = [
  {
    component: Portfolio,
    title: "Page 1",
    transform: "translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
    opacity: 0.5
  },
  {
    component: Portfolio,
    title: "Page 2",
    transform: "translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
    opacity: 0.2
  },
  {
    component: Portfolio,
    title: "Page 3",
    transform: "translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
    opacity: 0.2
  },
  {
    component: Portfolio,
    title: "Page 4",
    transform: "translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
    opacity: 0.2
  },
];

const interpolate = (start, end, percentage) => start + (end - start) * percentage;

const calculateTransformAndOpacity = (scrollPercentage) => {
  // Adjust the scale, rotation, and translation based on percentage
  const translateY = interpolate(-62, 0, scrollPercentage); // Y-axis translation from 80px to 0px
  const translateZ = interpolate(190, 0, scrollPercentage); // Y-axis translation from 80px to 0px
  const rotateX = interpolate(-56.5, 0, scrollPercentage); // Rotation from -56.5deg to 0deg
  const scaleX = interpolate(0.83, 1, scrollPercentage); // Scale from 0.82 to 1
  const scaleY = interpolate(0.76, 0.905, scrollPercentage); // Scale from 0.76 to 1
  const opacity = interpolate(0.2, 1, scrollPercentage); // Opacity from 0.2 to 1

  const transformValue = `translate3d(0px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) scale3d(${scaleX}, ${scaleY}, 1)`;

  return { transformValue, opacity };
};

const Page = ({ pageIndex, updateTransform, page }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const pageRect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        const scrollPercentage = Math.max(0, Math.min(1, (viewportHeight - pageRect.top) / viewportHeight));

        // Calculate transform and opacity dynamically
        const { transformValue, opacity } = calculateTransformAndOpacity(scrollPercentage);

        updateTransform(pageIndex, transformValue, opacity);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0 to 1 in steps of 0.1
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
      className="sticky top-[0px] h-[750px] w-[calc(100vw-100px)] grid place-content-center"
      style={{
        transformOrigin: "bottom",
        transform: page.transform,
        opacity: page.opacity,
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
      }}
    >
      <Portfolio />
    </motion.div>
  );
};


export default function Portfolios({ setIsExpanded }) {
  const containerRef = useRef(null);
  const [pagesState, setPagesState] = useState(pages);

  const updateTransform = (pageIndex, newTransform, newOpacity) => {
    setPagesState((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[pageIndex] = { ...updatedPages[pageIndex], transform: newTransform, opacity: newOpacity };
      return updatedPages;
    });
  };

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <button
        onClick={() => {
          setIsExpanded(false);
        }}
        className="fixed top-[20px] left-[20px] text-orange-500 h-[55px] w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border z-[200]"
        aria-label="Undo"
      >
        <Undo className="w-full h-full " />
      </button>
      <div className="overflow-y-auto" style={{ height: "100vh" }}>
        <div className="relative text-lg font-extrabold h-[500px] w-full grid place-content-center text-center overflow-hidden">
          <div className="z-[10] text-[50px] text-[#DB6E27] space-y-3 tracking-wider">
            <p>Featured</p>
            <p>Portfolio</p>
          </div>
        </div>

        <div className="space-y-[30px] h-[3800px] flex flex-col items-center  -mt-[220px]">
          {pagesState.map((page, index) => (
            <Page key={index} pageIndex={index} updateTransform={updateTransform} page={page} />
          ))}
        </div>
      </div>
    </div>
  );
}
