import React from 'react';

export default function TitleTexts() {
    return (
        <div className="flex flex-col justify-center items-center text-center px-4 h-[234px] xl:-mt-7">
            <div className="max-w-4xl">
                <p className="text-[35px] xl:text-[50px] font-light font-nordiquePro leading-[60px]">
                    Building A Data Driven
                </p>
                <p className="text-[35px] xl:text-[60px] font-bold leading-[60px] tracking-wide font-ceraRoundPro">
                    Marketing Agency
                </p>
            </div>
            <div className="max-w-5xl mt-3">
                <p className="text-[15px] xl:text-[20px] text-gray-200 leading-[30px]">
                    Transform your brand&apos;s reach with data-driven strategies that
                    deliver measurable results. Unlock the power of insights to
                    drive smarter marketing campaigns.
                </p>
            </div>
        </div>
    );
}
