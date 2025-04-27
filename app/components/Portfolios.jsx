"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Undo } from "lucide-react";
import Portfolio from "./Portfolio";
import ScrollMouseIndicator from "./ScrollIndicator";

const pages = Array(4).fill({
  component: Portfolio,
  title: "Page",
  transform: "perspective(1500px) translate3d(0px, -62px, 190px) rotateX(-56.5deg) scale3d(0.83, 0.76, 1)",
  clipPath: "polygon(10% 0%, 90% 0%, 80% 100%, 20% 100%)",
  opacity: 0.5,
});

const interpolate = (start, end, percentage) => start + (end - start) * percentage;

const calculateTransformAndClipPath = (scrollPercentage) => {
  const clampedScroll = Math.min(scrollPercentage, 0.8) / 0.8;

  const translateY = interpolate(-62, 0, clampedScroll);
  const translateZ = interpolate(190, 0, clampedScroll);
  const rotateX = interpolate(-56.5, 0, clampedScroll);
  const scaleX = interpolate(0.53, 1, clampedScroll);
  const scaleY = interpolate(0.76, 1, clampedScroll);
  const opacity = interpolate(0.5, 1, clampedScroll);

  const transformValue = `perspective(1500px) translate3d(0px, ${translateY}px, ${translateZ}px)
    rotateX(${rotateX}deg) 
    scale3d(${scaleX}, ${scaleY}, 1)`;

  const clipPath = scrollPercentage >= 0.1
    ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    : `polygon(
        ${interpolate(10, 0, scrollPercentage / 0.1)}% 0%, 
        ${interpolate(90, 100, scrollPercentage / 0.1)}% 0%,
        ${interpolate(80, 100, scrollPercentage / 0.1)}% 100%, 
        ${interpolate(20, 0, scrollPercentage / 0.1)}% 100%
      )`;

  return { transformValue, opacity, clipPath };
};

const Page = ({ pageIndex, updateTransform, page }) => {
  const pageRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const viewportHeight = window.innerHeight;
        const scrollPercentage = Math.max(0, Math.min(1, (viewportHeight - entry.boundingClientRect.top) / viewportHeight));
        const { transformValue, opacity, clipPath } = calculateTransformAndClipPath(scrollPercentage);
        updateTransform(pageIndex, transformValue, opacity, clipPath);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: Array.from({ length: 20 }, (_, i) => i / 20),
      rootMargin: "-50% 0px -50% 0px",
    });

    if (pageRef.current) observer.observe(pageRef.current);
    return () => pageRef.current && observer.unobserve(pageRef.current);
  }, [pageIndex, updateTransform]);

  return (
    <motion.div
      ref={pageRef}
      className="sticky top-10 lg:top-0 left-24 w-full md:w-[calc(100%-100px)] xl:w-[calc(100%-100px)] grid place-content-center border border-[rgba(255,255,255,0.18)] rounded-2xl mx-auto overflow-hidden"
      style={{
        transformOrigin: "bottom",
        transformStyle: "preserve-3d",
        transform: page.transform,
        opacity: page.opacity,
        clipPath: page.clipPath,
        transition: "transform 0.5s ease, opacity 0.5s ease, clip-path 0.2s ease",
      }}
    >
      <Portfolio />
    </motion.div>
  );
};

export default function Portfolios({ setIsExpanded, setClicked }) {
  const [pagesState, setPagesState] = useState(pages);

  const updateTransform = (pageIndex, newTransform, newOpacity, newClipPath) => {
    setPagesState((prevPages) =>
      prevPages.map((page, idx) =>
        idx === pageIndex ? { ...page, transform: newTransform, opacity: newOpacity, clipPath: newClipPath } : page
      )
    );
  };

  return (
    <div className="relative h-full w-full xl:w-[calc(100%-100px)] rounded-2xl overflow-hidden">
    <ScrollMouseIndicator />

      <button
        onClick={() => {
          setIsExpanded(false);
          setClicked(false);
        }}
        className="fixed top-2 xl:top-7 left-5 text-orange-500 w-10 h-10 xl:h-14 xl:w-14 grid place-content-center rounded-full xl:border-[0.5px] border-white hover:border-[#DB6E27] hover:text-white duration-300 z-50"
        aria-label="Undo"
      >
        <Undo className="w-full h-full" />
      </button>

      <div className="relative w-full overflow-y-auto" style={{ height: "100vh" }}>
      <div className="relative text-lg font-extrabold h-[30vh] xl:h-[300px] w-full grid place-content-center text-center overflow-hidden">
          <div className="z-[10] text-[2.25rem] lg:text-[50px] 2xl:text-[4rem] text-[#DB6E27] space-y-3 2xl:space-y-7 tracking-widest">
            <p>Featured</p>
            <p>Portfolio</p>
          </div>
        </div>

        <div className="space-y-10 w-full h-[6800px] flex flex-col items-center mt-24">
          {pagesState.map((page, index) => (
            <Page key={index} pageIndex={index} updateTransform={updateTransform} page={page} />
          ))}
        </div>
      </div>
    </div>
  );
}
