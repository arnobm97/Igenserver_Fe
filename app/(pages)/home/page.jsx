'use client'

import TitleTexts from "@/app/components/home/TitleTexts";
import SelectMenuCardChatbot from "../../components/home/SelectMenuCardChatbot";
import SelectMenuCardCenter from "../../components/home/SelectMenuCardCenter";
import SelectMenuCardService from "../../components/home/SelectMenuCardService";
import LeftCard from "../../components/home/small/LeftCard";
import RightCard from "../../components/home/small/RightCard";
import CenterCard from "../../components/home/small/CenterCard";
import { useState } from "react";

export default function Home() {
const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div 
        className={isExpanded
        ? ' xl:hidden max-h-[100vh] w-full overflow-hidden  '
        : ' h-screen w-[100vw] xl:w-full xl:overflow-hidden font-ceraround '
      }>
           <div className="relative z-10 text-white grid px-[72px] pt-[50px] min-h-screen font-ceraRoundPro place-content-center w-full">
                    <div className="flex flex-col w-[100vw] h-screen items-center">
                        <TitleTexts />
                        <div className="hidden xl:flex absolute bottom-1 left-0  w-full h-full justify-center items-end !gap-[10px] pb-2">
                            <SelectMenuCardChatbot />
                            <SelectMenuCardCenter />
                            <SelectMenuCardService />
                        </div>
                        <div 
                         className='xl:hidden h-[700px] space-y-[20px] grid place-content-center w-full mt-[30px]'>
                        <div className="flex items-center justify-between w-[calc(100vw-20px)] max-w-[450px]">
                            <LeftCard isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
                            <RightCard isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
                            </div>
                            <CenterCard isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
                        </div>
                    </div>
                </div>
        </div>
    );
}
