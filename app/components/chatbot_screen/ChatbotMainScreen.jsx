"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ChevronsRight, House, Mic, Paperclip, Copy, Check, Share2, NotebookPen } from 'lucide-react';
import TypingIndicator from '../TypingIndicator';

export function StyledButton({ name = 'Button' }) {
  return (
    <motion.button
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid transparent",
        opacity: 0.9,
        background: "rgba(121, 121, 121, 0.25)",
        backdropFilter: "blur(70px)",
        WebkitBackdropFilter: "blur(40px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px"
      }}
      className="font-light text-[.625rem] xl:text-base"
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
      <ChevronsRight size={18} />
      {name}
    </motion.button>
  );
};

export default function ChatbotMainScreen({ handleClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [sharedMessageId, setSharedMessageId] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCopyMessage = (text, messageId) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleShareMessage = async (text, messageId) => {
    setSharedMessageId(messageId);
    setTimeout(() => setSharedMessageId(null), 2000);
  };

  const resetChat = () => {
    setMessages([]);
    setInputMessage('');
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    console.log();


    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botMessage = {
        text: "Thanks for your message! I'm processing your request.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleShareLink = () => {
    setSharedMessageId("Chat link");
    setTimeout(() => setSharedMessageId(null), 2000);
  }

  return (
    <div className='h-full w-full px-5 xl:px-[40px] py-[20px] z-[100] flex flex-col justify-between relative'>
      <button
        onClick={() => handleClose()}
        className='absolute top-[1.875rem] right-[1.875rem] text-white h-[35px] w-[35px] flex justify-center items-center border border-white/20 rounded-full hover:text-gray-400'>
        <House size={16} />
      </button>

      <div className="absolute top-7 right-20 flex justify-end items-center gap-3">
        <motion.button
          onClick={resetChat}
          whileTap={{ scale: 0.95 }}
          className='flex items-center gap-2 text-sm text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors'
        >
          <NotebookPen size={16} />
          <span>New Chat</span>
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => handleShareLink()}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
        >
          {sharedMessageId ? (
            <>
              <Check size={14} />
              <span>Shared!</span>
            </>
          ) : (
            <>
              <Share2 size={14} className="w-10 h-10 rounded-full hover:bg-gray-700 p-2" />
            </>
          )}
        </motion.button>
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <div className='h-[300px] 2xl:h-[350px] -mt-28'>
          <img
            className='h-full w-auto'
            src='images/robot.png'
            alt='chatbot'
          />
        </div>

      </div>

      <div className='flex-1 overflow-y-auto px-5 xl:px-[40px] max-xl:mt-12 py-[20px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>
        {messages.length > 0 && (
          <div className='space-y-4 pb-4'>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="w-full flex flex-col gap-2">
                  <div className={`w-max max-w-[70%] flex rounded-2xl px-4 py-2 ${message.sender === 'user'
                    ? 'self-end bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-200'
                    }`}>
                    <p>{message.text}</p>
                  </div>
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-3 ml-2">
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => handleCopyMessage(message.text, index)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        {copiedMessageId === index ? (
                          <>
                            <Check size={14} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => handleShareMessage(message.text, index)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        {sharedMessageId === index ? (
                          <>
                            <Check size={14} />
                            <span>Shared!</span>
                          </>
                        ) : (
                          <>
                            <Share2 size={14} />
                          </>
                        )}
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-200 rounded-2xl px-4 py-2">
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className='w-full flex flex-col gap-3'>
        <div className="">
          <p className='text-white text-[25px] font-nordiquePro text-center py-[20px]'>
            Search like never before
          </p>
          <div className='flex flex-wrap justify-center items-center w-full gap-2 text-gray-300 text-sm'>
            <StyledButton name='Ultimate Enterprise Solution' />
            <StyledButton name='Software Development Process' />
            <StyledButton name='Branding or Identity ' />
            <StyledButton name='Digital Marketing' />
            <StyledButton name='Machine Learning' />
          </div>
        </div>
        <div className='w-full flex flex-col gap-3 rounded-[20px] bg-black overflow-hidden text-white py-[25px] px-5 xl:px-[35px]'>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className='bg-transparent outline-none border-none w-full resize-none min-h-[60px]'
            placeholder='Ask Anything...'
          />
          <div className="w-full flex justify-between items-center">
            <div className='text-white flex gap-4'>
              <Mic className="w-10 h-10 flex justify-center items-center rounded-full border-[0.5px] border-[rgba(255,255,255,0.18)] p-2 hover:bg-primary duration-300 cursor-pointer" />
              <Paperclip className="w-10 h-10 flex justify-center items-center rounded-full border-[0.5px] border-[rgba(255,255,255,0.18)] p-2 hover:bg-primary duration-300 cursor-pointer" />
            </div>
            <button onClick={handleSendMessage} className='bg-orange-500 px-6 py-2 rounded-full hover:bg-primary duration-300'>
              <ArrowUp />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
