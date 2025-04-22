"use client"

import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

export  function StyledButton({name = 'Button'}) {
    return (
      <motion.button
        style={{
          width: '100%',
          height: "52px",
          padding: "16px 10px",
          borderRadius: "10px",
          border: "1px solid transparent",
          opacity: 0.9,
          background: "transparent",
          backdropFilter: "blur(70px)",
          WebkitBackdropFilter: "blur(40px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        whileHover={{
          opacity: 1,
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        whileTap={{
          scale: 0.95,
          transition: { duration: 0.2 },
        }}
      >
       {name}
      </motion.button>
    );
  }

export default function ChatbotMainScreen({ handleClose }) {
  return (
    <div className='h-full w-full px-[40px] py-[20px] z-[100] flex flex-col justify-between relative'>
    <button 
     onClick={()=> handleClose()}
     className=' absolute top-[20px] right-[20px] text-white h-[35px] w-[35px] border rounded-full hover:text-gray-400'>X</button>
     <div className='h-[calc(100vh_-_418px)] grid place-content-center '>
       <img 
        className='h-[229.34px]'
        src='images/robot.png' 
        alt='chatbot'/>
       </div>
        <div className='h-fit'>
        <p className='text-white text-[25px] font-nordiquePro text-center py-[20px]'>Search like never before</p>
        <div className='flex flex-col lg:flex-row items-center justify-between w-full gap-[10px] text-gray-300 text-sm'>
        <StyledButton name='>> Ultimate Enterprise Solution'/>
        <StyledButton name='>> Software Development Process'/>
        <StyledButton name='>> Branding or Identity '/>
        <StyledButton name='>> Digital Marketing'/>
        <StyledButton name='>> Machine Learning'/>
        </div>
        <div className='w-full h-[190px] rounded-[20px] bg-black overflow-hidden text-white py-[25px] px-[35px] pb-[40px] relative mt-6'>
           <textarea 
           name="" 
           id="" 
           className='bg-transparent outline outline-none border-none w-full scale-[101%] max-h-full min-h-full'
           placeholder='Ask Anything...'
           ></textarea>
           <div className='text-white absolute bottom-[10px] flex gap-4'>
            <p>Voice</p>
            <p>Attach</p>
           </div>
           <button className='absolute right-[20px] bottom-[20px] bg-orange-500 px-6 py-2 rounded-full'>{"--->"}</button>
        </div>
        </div>
    </div>
  )
}
