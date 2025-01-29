import React from 'react';

export default function TitleTexts() {
    return (
        <div className="flex flex-col justify-center items-center text-center px-4 h-[234px]">
            <div className="max-w-4xl">
                <p className="text-[70px] font-light font-nordiquePro leading-[90px]">
                    Building A Data Driven
                </p>
                <p className="text-[80px] font-bold leading-[90px] tracking-wide font-ceraRoundPro">
                    Marketing Agency
                </p>
            </div>
            <div className="max-w-5xl mt-3">
                <p className="text-[20px] text-gray-200 leading-[40px]">
                    Transform your brand&apos;s reach with data-driven strategies that
                    deliver measurable results. Unlock the power of insights to
                    drive smarter marketing campaigns.
                </p>
            </div>
        </div>
    );
}
