'use client'

import React, { useState } from 'react'
import ChatbotMainScreen from '../../chatbot_screen/ChatbotMainScreen'

export default function LeftCard({ isExpanded, setIsExpanded }) {
  const [clicked, setClicked] = useState(false);

  const expandedStyle = {
    width: "calc(100% - 20px)",
    height: "calc(100vh - 55px)",
    left: "10px",
    top: "45px",
    backdropFilter: "blur(50px)",
    WebkitBackdropFilter: "blur(50px)",
    borderRadius: '30px',
    background:
      "linear-gradient(180deg, rgba(40, 40, 40, 0.5) 0%, rgba(61, 61, 61, 0.5) 50%, rgba(40, 40, 40, 0.5) 100%)",
  };

  const handleClose = () => {
    setIsExpanded(false);
    setClicked(false);
  };

  const handleCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setClicked(true);
    }
  };

  return (
    <>
      <div
        className={isExpanded
          ? 'border-none max-h-[100vh] overflow-hidden'
          : 'h-[180px] w-full border rounded-[32px] cursor-pointer '
        }

        style={{
          transform: "perspective(800px) translate3d(0px, 0px, 190px) rotateY(-26.5deg) scale3d(0.83, 0.76, 1)",
          backgroundImage: "url('/images/FirstSlideBgPattern1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderImageSlice: 1,
          backdropFilter: "blur(18px)",
          boxShadow: "-8px -8px 16px 0px rgba(0, 0, 0, 0.5) inset",
        }
        }
        onClick={handleCardClick}
      >
        {!isExpanded && (
          <div className='w-full h-full grid place-content-center'>
            <img src="/images/Wave.svg" alt="Icon" className='w-[150px]' />
          </div>
        )}

      </div>
      {isExpanded && clicked && (
        <dialog open
          className='fixed w-screen h-screen z-10'
          style={expandedStyle}
        >
          <ChatbotMainScreen handleClose={handleClose} />
        </dialog>
      )}
    </>
  )
}
