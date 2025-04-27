"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import AnimatedServices from '../../components/service_screen/AnimatedServices';
import { Undo } from 'lucide-react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

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
    leftScrollRef.current.scrollTop += e.deltaY/3;
    console.log('Left Scroll Top:', leftScrollRef.current.scrollTop);
  };

  return (
    <div className="w-full h-screen rounded-[2rem] backdrop-blur-[100px] z-[1] py-4">
      <div className='relative h-[calc(100vh_-_20px)] xl:h-[calc(100vh_-_30px)] w-[calc(100vw_-_20px)] border xl:rounded-[32px] mx-auto overflow-hidden bg-custom-gradient border-gray-50/10 p-[10px] sm:p-[20px] xl:p-[40px]'>
        
        {!activeService && <Link
          href='/home'
          className="absolute top-5 right-5 h-[35px] w-[35px] xl:top-[40px] xl:left-[40px] text-orange-500 xl:h-[55px] xl:w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border border-white border-opacity-25 z-[200]"
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
              className="flex flex-col-reverse lg:flex-row w-full xl:space-x-[100px] h-full overflow-hidden"
            >
              {/* Left side: Images */}
              <div className="flex-1 relative"  style={{ overflowY: 'auto' }}>
                <button
                  onClick={handleBack}
                  className="fixed top-[40px] xl:left-[40px] text-orange-500 h-[55px] w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border z-[200] xl:bg-transparent bg-white"
                  aria-label="Undo"
                >
                  <Undo className="w-full h-full" />
                </button>
                <p className="text-gray-400 xl:text-lg pt-[70px] hidden xl:block">PROJECT</p>
                <div className="hidden xl:block xl:text-3xl font-bold text-start pt-[10px] pb-[40px]">
                  {activeService.title}
                </div>
                <motion.div 
                 ref={leftScrollRef} onWheel={handleLeftScroll}
                 className="flex flex-col items-start h-[calc(100vh_-_330px)] xl:w-[500px] overflow-y-auto relative mt-2 xl:mt-0">
                  <motion.img
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-[400px] object-fill rounded-lg sticky top-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, duration: 2 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  />
                  <div className="flex flex-col space-y-[30px] mt-[30px] w-full xl:w-[500px]">
                    {activeService.details.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`${activeService.title} Detail ${idx}`}
                        className="w-full h-[400px] object-fill rounded-lg sticky top-0"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right side: Details */}
              <div className="flex-1 xl:p-5 space-y-5 overflow-y-scroll !h-[calc(100vh_-_90px)] w-full xl:w-[500px]" ref={rightScrollRef} onWheel={handleRightScroll}>
                {activeService.details.info.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                  >
                    <h3 className="text-[25px]">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className='h-full overflow-y-auto w-full'>
            <AnimatedServices setActiveService={setActiveService} />
          </div>
        )}
      </div>
    </div>
  );
}
