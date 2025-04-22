import React from 'react';

export default function TitleTexts() {
    return (
        <div className="w-[100vw] md:w-full -mt-8 sm:-mt-0 lg:ml-0  flex flex-col justify-center items-center text-center px-4 h-[234px] xl:-mt-7">
            <div className="max-w-4xl">
                <p className="text-[22px] leading-[38px] sm:text-[35px] lg:text-[2.6875rem] 2xl:text-[50px] font-light font-nordiquePro sm:leading-[60px]">
                    Building A Data Driven
                </p>
                <p className="text-[25px] leading-[40px] sm:text-[35px] lg:text-[3.125rem] 2xl:text-[60px] font-bold sm:leading-[60px] tracking-wide font-ceraRoundPro">
                    Marketing Agency
                </p>
            </div>
            <div className="max-w-5xl mt-3">
                <p className="text-[0.7rem] sm:text-[15px] xl:text-[20px] text-gray-200 sm:leading-[30px]">
                    Transform your brand&apos;s reach with data-driven strategies that
                    deliver measurable results. Unlock the power of insights to
                    drive smarter marketing campaigns.
                </p>
            </div>
        </div>
    );
}
