"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceSlider from "./ServiceSlider";
import DisplayServices from "./DisplayServices";
import { Undo } from "lucide-react";

export default function ServiceMainScreen({ onClose, isExpanded }) {
  const [activeService, setActiveService] = useState(null);
  const [displayMainServices, setDisplayMainServices] = useState({ show: false, index: 1 });
  const [isLoading, setIsLoading] = useState(true);

  const handleTakeALook = (service) => {
    setActiveService(service);
  };

  const handleBack = () => {
    setActiveService(null);
    setDisplayMainServices({ show: false, index: 1 });
    onClose();
  };

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  return (
    <div className="h-[calc(100vh_-_40px)] w-full py-[40px] z-[100] relative !cursor-default">
      <button
        onClick={() => handleBack()}
        className="fixed top-[20px] left-[20px] text-orange-500 h-[55px] w-[55px] grid place-content-center rounded-full hover:text-gray-400 hover:border-orange-500 border z-[200]"
        aria-label="Undo"
      >
        <Undo className="w-full h-full" />
      </button>

      {/* Show loading screen if isLoading is true */}
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : (
        // Main content
        <div className="mb-8 h-[calc(100vh_-_90px)] flex flex-col overflow-hidden justify-between">
          {!displayMainServices.show ? (
            <>
              <div className="mb-8 flex px-[200px] ">
                <h1 className="text-[30px] font-bold mb-4 w-full">
                  We Create Impactful
                  <br />
                  Digital Experiences
                  <br />
                  And Redefine Brand Identities.
                </h1>
                <div className="text-[14px] w-full space-y-[20px] text-gray-400">
                  <p>
                    We use experience and creativity to break the mold and craft
                    digital experiences that defy the status quo. Harnessing the
                    cutting-edge technologies of today, we disrupt, innovate and
                    shape the behaviors of tomorrow.
                  </p>
                  <p>
                    Our portfolio is not a simple list of projects. It is a map of
                    digital adventures we shared with our clients, whether they are
                    small family businesses and startups or big players on the
                    corporate scene.
                  </p>
                </div>
              </div>
              <ServiceSlider setDisplayMainServices={setDisplayMainServices} />
            </>
          ) : (
            <DisplayServices
              handleTakeALook={handleTakeALook}
              handleBack={handleBack}
              activeService={activeService}
            />
          )}
        </div>
      )}
    </div>
  );
}
