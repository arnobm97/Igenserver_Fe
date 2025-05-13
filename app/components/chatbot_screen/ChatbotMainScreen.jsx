"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ChevronsRight, House, Mic, Paperclip, Copy, Check, Share2, NotebookPen } from 'lucide-react';
import TypingIndicator from '../TypingIndicator';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

export function StyledButton({ name = 'Button', handleClick }) {
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
      onClick={() => handleClick(`Briefly tell me about ${name}`)}
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

  const fixMarkdown = (text) => {
    return text
      .replace(/([a-z])([A-Z])/g, '$1\n\n$2') // Add breaks between headings or sentences
      .replace(/\n(?=[^\n])/g, '\n\n')        // Ensure double line breaks for paragraphs
      .replace(/(?<=:)\s*\n/g, ' ')           // Remove unwanted line breaks after colons
      .trim();
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = 'auto';
    const newHeight = Math.min(element.scrollHeight, 5 * 24); // 24px per line, max 5 lines
    element.style.height = `${newHeight}px`;
  };

  const handleSendMessage = async (messageText) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage = {
      text: textToSend,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            ...messages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text,
            })),
            { role: 'user', content: textToSend }
          ],
          temperature: 0.7,
          max_tokens: 512
        }),
      });

      const data = await res.json();
      const botText = data.choices?.[0]?.message?.content || 'Something went wrong.';

      const botMessage = {
        text: botText,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Groq API error:", error);
      setMessages(prev => [...prev, {
        text: "⚠️ Failed to get response from Groq API.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsTyping(false);
    }
  };


  const handleShareLink = () => {
    setSharedMessageId("Chat link");
    setTimeout(() => setSharedMessageId(null), 2000);
  }

  return (
    <div className='h-full w-full xl:px-[40px] py-[20px] z-[100] flex flex-col justify-between relative font-raleway'>
      <button
        onClick={() => handleClose()}
        className='absolute top-[1.875rem] right-[1.875rem] text-white h-[35px] w-[35px] flex justify-center items-center border border-primary hover:border-white/20 rounded-full hover:text-primary'>
        <House size={16} />
      </button>

      <div className="absolute top-7 right-20 flex justify-end items-center gap-3">
        <motion.button
          onClick={resetChat}
          whileTap={{ scale: 0.95 }}
          className='flex items-center gap-2 text-white px-2 py-2 rounded-full hover:text-primary transition-colors'
        >
          <NotebookPen size={20} />
        </motion.button>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => handleShareLink()}
          className="flex items-center gap-1 text-white hover:text-primary transition-colors"
        >
          {sharedMessageId ? (
            <>
              <Check size={14} />
              <span>Shared!</span>
            </>
          ) : (
            <>
              <Share2 size={20} className="" />
            </>
          )}
        </motion.button>
      </div>

      {!messages.length && <div className="absolute top-0 left-0 w-full h-full flex justify-center -z-[1]">
        <div className='h-[300px] 2xl:h-[350px] mt-7 sm:mt-12 lg:mt-20 xl:mt-28 '>
          <Image
            className='h-full w-auto'
            src='images/robot.png'
            alt='chatbot'
            width={0}
            height={0}
            sizes='100vw'
          />
        </div>

      </div>}

      <div className='flex-1 overflow-y-auto px-5 xl:px-[40px] mt-10 2xl:mt-14 max-xl:mt-12 py-[20px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>
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
                  <div className={`w-full xl:w-max xl:max-w-[70%] flex flex-col gap-3 rounded-2xl px-6 py-4 text-sm xl:text-base ${message.sender === 'user'
                    ? 'self-end bg-orange-500 text-white'
                    : 'bg-[#34363A]/70 text-gray-200'
                    }`}>
                    <ReactMarkdown

                    >
                      {fixMarkdown(message.text)}
                    </ReactMarkdown>
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
        {!messages.length && <div className="">
          <p className='text-white text-[25px] font-nordiquePro text-center py-[20px]'>
            Search like never before
          </p>
          <div className='flex flex-wrap justify-center items-center w-full gap-2 text-gray-300 text-sm'>
            <StyledButton name='Ultimate Enterprise Solution' handleClick={(text) => {
              handleSendMessage(text);
            }} />
            <StyledButton name='Software Development Process' handleClick={(text) => {
              handleSendMessage(text);
            }} />
            <StyledButton name='Branding or Identity ' handleClick={(text) => {
              handleSendMessage(text);
            }} />
            <StyledButton name='Digital Marketing' handleClick={(text) => {
              handleSendMessage(text);
            }} />
            <StyledButton name='Machine Learning' handleClick={(text) => {
              handleSendMessage(text);
            }} />
          </div>
        </div>}
        <div className='w-full flex flex-col gap-3 rounded-[20px] bg-black overflow-hidden text-white py-3 px-5 xl:px-[35px]'>
          <textarea
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              adjustTextareaHeight(e.target);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className='bg-transparent outline-none border-none w-full resize-none min-h-[60px] max-h-[120px] transition-all duration-200'
            placeholder='Ask Anything...'
            rows={3}
            ref={(el) => el && adjustTextareaHeight(el)}
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
