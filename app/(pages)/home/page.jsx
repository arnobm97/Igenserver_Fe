'use client'

import SelectMenuCardChatbot from "../../components/home/SelectMenuCardChatbot";
import SelectMenuCardCenter from "../../components/home/SelectMenuCardCenter";
import SelectMenuCardService from "../../components/home/SelectMenuCardService";
import LeftCard from "../../components/home/small/LeftCard";
import RightCard from "../../components/home/small/RightCard";
import CenterCard from "../../components/home/small/CenterCard";
import { useState } from "react";
import TitleTexts from "../../components/home/TitleTexts";

export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div
            className={'h-[calc(100vh-170px)] xl:h-[calc(100vh)] w-[100vw] xl:w-full xl:overflow-hidden font-ceraround pt-28 xl:pt-3 2xl:pt-28 lg:pt-0'
            }>
            <div className="relative z-10 text-white grid xl:px-[72px] xl:pt-0 min-h-[670px] font-ceraRoundPro w-full ">
                <div className="flex flex-col w-full xl:h-full justify-center items-center">
                    <TitleTexts />
                    <div className="relative hidden xl:flex w-full max-w-[1250px] justify-between items-center gap-3 mx-auto pb-2">
                        <SelectMenuCardChatbot />
                        <SelectMenuCardCenter />
                        <SelectMenuCardService />
                    </div>
                    <div
                        className='xl:hidden space-y-[20px] grid place-content-center w-full mt-3'>
                        <div className="flex items-center gap-7 w-[calc(100vw-20px)] max-w-[450px]">
                            <LeftCard isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                            <RightCard isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </div>
                        <CenterCard isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    </div>
                </div>
            </div>
        </div>
    );
}
