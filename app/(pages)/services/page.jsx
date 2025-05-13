"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import AnimatedServices from '../../components/service_screen/AnimatedServices';
import { MoveRight, Undo } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function DisplayServices() {
  const params = useSearchParams();
  console.log(params.get("service"));

  const [activeService, setActiveService] = useState(false);

  const leftScrollRef = useRef(null);  // Reference for the left-side container
  const rightScrollRef = useRef(null); // Reference for the right-side container

  const handleBack = () => {
    setActiveService(false);
  };

  // Separate scroll event handler for the left container
  const handleLeftScroll = (e) => {
    console.log('Left Scroll:', e.deltaY);
    rightScrollRef.current.scrollTop += e.deltaY;
    console.log('Right Scroll Top:', rightScrollRef.current.scrollTop);
  };

  // Separate scroll event handler for the right container
  const handleRightScroll = (e) => {
    console.log('Right Scroll:', e.deltaY);
    leftScrollRef.current.scrollTop += e.deltaY / 3;
    console.log('Left Scroll Top:', leftScrollRef.current.scrollTop);
  };

  return (
    <div className="w-full h-screen rounded-[2rem] backdrop-blur-[100px] z-[1] py-4">
      <div className='relative h-[calc(100vh_-_20px)] xl:h-[calc(100vh_-_30px)] w-[calc(100vw_-_20px)] border xl:rounded-[32px] mx-auto overflow-hidden bg-custom-gradient border-gray-50/10 p-[10px] sm:p-[20px] xl:p-0'>

        {!activeService && <Link
          href='/home'
          className="absolute top-5 right-5 h-[35px] w-[35px] xl:top-[1.875rem] xl:left-[40px] text-orange-500 xl:h-[55px] xl:w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border border-white border-opacity-25 z-[200]"
          aria-label="Undo"
        >
          <Undo className="w-full h-full" />
        </Link>}

        {activeService ? (
          <AnimatePresence>
            <motion.div
              key={activeService.title}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, duration: 2 }}
              exit={{ opacity: 0, x: 50 }}
              className="flex flex-col xl:flex-row w-full xl:gap-[190px] h-full pl-0 xl:pl-12 pr-0 xl:pr-7 2xl:pr-16 py-10 overflow-hidden"
            >
              {/* Left side: Images */}
              <div className="w-full max-xl:h-full xl:w-[45%] relative flex flex-col" style={{ overflowY: 'auto' }}>
                <button
                  onClick={handleBack}
                  className="fixed top-[40px] xl:left-[40px] text-orange-500 h-[55px] w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border z-[200] xl:bg-transparent bg-white"
                  aria-label="Undo"
                >
                  <Undo className="w-full h-full" />
                </button>
                <h2 className="mt-16 font-semibold text-[25px] xl:text-[2.3rem] 2xl:text-[3.5rem] text-start">
                  {activeService.title}
                </h2>
                <div className="flex items-center mt-3 mb-12">
                  <button className="relative px-5 py-3 font-medium text-[.9375rem] rounded-full border border-[#DB6E27] text-white hover:bg-[#DB6E27]/80 transition duration-300 ease-in-out">
                    Get The Service
                  </button>
                  <div className="w-12 h-12 flex justify-center items-center bg-[#DB6E27] rounded-full -ml-3">
                    <MoveRight />
                  </div>
                </div>
                <motion.div
                  ref={leftScrollRef} onWheel={handleLeftScroll}
                  className="hidden xl:flex flex-col items-start h-[500px] w-full overflow-y-auto relative mt-2 xl:mt-0">
                  <motion.img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover rounded-xl sticky top-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, duration: 2 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  />
                  <div className="flex flex-col space-y-[30px] mt-[30px] w-full">
                    {activeService.details.images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`${activeService.title} Detail ${idx}`}
                        width={0}
                        height={0}
                        sizes='100vw'
                        className="w-full hfull object-fill rounded-lg sticky top-0"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right side: Details */}
              <div className="xl:p-5 space-y-5 overflow-y-scroll xl:!h-[calc(100vh-30px)] w-full xl:w-[55%]" ref={rightScrollRef} onWheel={handleRightScroll}>
                <p className="text-gray-400">{activeService.details.heading}</p>
                <div style={{
                  background: "linear-gradient(90deg, rgba(219, 110, 39, 0.15) 0%, rgba(219, 110, 39, 0) 100%)"
                }} className="border-l-[.25rem] border-l-primary px-6 py-4">
                  <p className="text-lg text-white">{activeService.details.quote.text}</p>
                  <p className="text-primary">`${activeService.details.quote.name}, ${activeService.details.quote.title}`</p>
                </div>
                {activeService.details.info.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                  >
                    <h3 className="text-2xl 2xl:text-3xl">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                ref={leftScrollRef} onWheel={handleLeftScroll}
                className="flex xl:hidden flex-col items-start h-[500px] w-full overflow-y-auto relative mt-2 xl:mt-0">
                <motion.img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover rounded-xl sticky top-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, duration: 2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
                <div className="flex flex-col space-y-[30px] mt-[30px] w-full">
                  {activeService.details.images.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`${activeService.title} Detail ${idx}`}
                      width={0}
                      height={0}
                      sizes='100vw'
                      className="w-full hfull object-fill rounded-lg sticky top-0"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className='h-[100vh] overflow-y-auto w-full'>
            <AnimatedServices setActiveService={setActiveService} />
          </div>
        )}
      </div>
    </div>
  );
}
