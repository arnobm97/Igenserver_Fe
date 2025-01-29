"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Undo } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pages = [
  {
    component: "Portfolio 1",
    bg: "bg-blue-200",
    initialClipPath: "polygon(10% 0%, 9% 0%, 100% 3%, 100% 70%, 90% 100%, 10% 10%, 0% 70%, 0% 30%)",
  },
  {
    component: "Portfolio 2",
    bg: "bg-green-200",
    initialClipPath: "polygon(10% 0%, 90% 0%, 100% 30%, 100% 70%, 90% 100%, 10% 100%, 0% 70%, 0% 30%)",
  },
  {
    component: "Portfolio 3",
    bg: "bg-yellow-200",
    initialClipPath: "polygon(10% 0%, 90% 0%, 100% 30%, 100% 70%, 90% 100%, 10% 100%, 0% 70%, 0% 30%)",
  },
  {
    component: "Portfolio 4",
    bg: "bg-red-200",
    initialClipPath: "polygon(10% 0%, 90% 0%, 100% 30%, 100% 70%, 90% 100%, 10% 100%, 0% 70%, 0% 30%)",
  },
];

const Page = ({ pageIndex, page }) => {
  const { bg, component, initialClipPath } = page;
  
  useEffect(() => {
    // GSAP ScrollTrigger Setup
    const pageElement = document.getElementById(`page-${pageIndex}`);

    gsap.fromTo(
      pageElement,
      {
        opacity: 0,
        y: 100,
        clipPath: initialClipPath,
      },
      {
        opacity: 1,
        y: 0,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        scrollTrigger: {
          trigger: pageElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: true, // Debugging purposes
          onUpdate: (self) => {
            console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity:", self.getVelocity());
          },
        },
      }
    );

    return () => {
      // Cleanup GSAP ScrollTrigger instances when the component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pageIndex, initialClipPath]);

  return (
    <div
      id={`page-${pageIndex}`}
      className={`sticky top-0 h-[600px] w-[calc(100vw-100px)] grid place-content-center ${bg}`}
    >
      <div className="text-4xl font-bold">{component}</div>
    </div>
  );
};

export default function Portfolios({ setIsExpanded }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <button
        onClick={() => {
          setIsExpanded(false);
        }}
        className="fixed top-[20px] left-[20px] text-orange-500 h-[55px] w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 bg-black border z-[200]"
        aria-label="Undo"
      >
        <Undo className="w-full h-full" />
      </button>

      <div className="overflow-y-auto" style={{ height: "100vh", perspective: "1500px", perspectiveOrigin: "50% 0%" }}>
        <div className="relative text-lg font-extrabold h-[500px] w-full grid place-content-center text-center overflow-hidden">
          <div className="z-[10] text-[50px] text-[#DB6E27] space-y-3 tracking-wider">
            <p>Featured</p>
            <p>Portfolio</p>
          </div>
        </div>

        <div className="space-y-[100px] h-[3000px] flex flex-col items-center">
          {pages.map((page, index) => (
            <Page key={index} pageIndex={index} page={page} />
          ))}
        </div>
      </div>
    </div>
  );
}
