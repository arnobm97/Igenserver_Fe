'use client'

import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { services } from '../../data/services'
import AnimatedServices from './AnimatedServices';
import { Undo } from "lucide-react";

export default function DisplayServices({ handleTakeALook, activeService, handleBack }) {
  return (
    <div className="relative flex flex-col p-[30px] h-[calc(100vh_-_90px)] ">
      {activeService ? (
        <AnimatePresence>
          <motion.div
            key={activeService.title}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, duration: 2 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex flex-col lg:flex-row w-full space-x-[100px] h-full overflow-hidden"
          >
            <div className="flex-1 relative ">
              <button
                onClick={handleBack}
                className="fixed top-[20px] left-[20px] text-orange-500 h-[55px] w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border z-[200]"
                aria-label="Undo"
              >
                <Undo className="w-full h-full" />
              </button>
              <p className="text-gray-400 text-lg pt-[70px]">PROJECT</p>
              <div className="text-3xl font-bold text-start pt-[10px] pb-[40px]">
                {activeService.title}
              </div>
              <motion.div className="flex flex-col items-start h-[calc(100vh_-_250px)] w-[500px] overflow-y-auto">
                <motion.img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-[500px] h-[400px] object-fill rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, duration: 2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
                <div className="flex flex-col space-y-[30px] mt-[30px]">
                  {activeService.details.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${activeService.title} Detail ${idx}`}
                      className="w-[500px] h-[400px] object-fill rounded-lg"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right side: Details */}
            <div className="flex-1 p-5 space-y-5 overflow-y-scroll !h-[calc(100vh_-_90px)]">
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
        <div className=''>
          <AnimatedServices services={services} handleTakeALook={handleTakeALook} />
        </div>
      )}
    </div>
  )
}
