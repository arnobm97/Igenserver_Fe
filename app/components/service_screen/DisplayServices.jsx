'use client'

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { services } from '../../data/services';
import AnimatedServices from './AnimatedServices';
import { Undo } from "lucide-react";

export default function DisplayServices({ handleTakeALook, activeService, handleBack }) {
  return (
    <div className="relative flex flex-col p-4 md:p-6 lg:p-8 h-[calc(100vh_-_90px)] overflow-y-hidden ">
      {activeService ? (
        <AnimatePresence>
          <motion.div
            key={activeService.title}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, duration: 2 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex flex-col lg:flex-row w-full lg:space-x-10 h-full overflow-hidden"
          >
            <div className="flex-1 relative">
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 text-orange-500 h-12 w-12 grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border z-50"
                aria-label="Undo"
              >
                <Undo className="w-6 h-6" />
              </button>
              <p className="text-gray-400 text-sm md:text-lg pt-16">PROJECT</p>
              <div className="text-xl md:text-3xl font-bold text-start pt-2 pb-6">
                {activeService.title}
              </div>
              <motion.div className="flex flex-col items-start max-h-[calc(100vh_-_200px)] md:max-h-[calc(100vh_-_250px)] w-full md:w-[500px] overflow-y-auto">
                <motion.img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-60 md:h-96 object-cover rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, duration: 2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                />
                <div className="flex flex-col space-y-6 mt-6">
                  {activeService.details.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${activeService.title} Detail ${idx}`}
                      className="w-full h-60 md:h-96 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right side: Details */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[calc(100vh_-_90px)]">
              {activeService.details.info.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                >
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className='w-full'>
          <AnimatedServices services={services} handleTakeALook={handleTakeALook} />
        </div>
      )}
    </div>
  );
}