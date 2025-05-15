import { Minus } from "lucide-react";
import Image from "next/image";

const TitleTexts = () => {
    return (
        <div className="w-[100vw] md:w-full -mt-8 sm:-mt-0 lg:ml-0 flex flex-col justify-center items-center gap-3 text-center px-4 lg:h-[234px] xl:-mt-7">
            <div className="max-w-4xl">
                <div className="flex flex-col items-center gap-1">
                    <div className="flex gap-2 text-center">
                        <p className="text-[22px] leading-[38px] sm:text-[35px] lg:text-[2.6875rem] 2xl:text-[50px] font-light font-nordiquePro sm:leading-[60px] mr-1">Your</p>
                        <div className="relative flex flex-col items-stretch">
                            <div className="flex gap-2">
                                <Image src="/images/quote-start.svg" width={0} height={0} sizes="100vw" className="w-4 h-auto -mt-2" />
                                <div className="flex items-center">
                                    <p className="text-[22px] leading-[38px] sm:text-[35px] lg:text-[2.6875rem] 2xl:text-[50px] font-light font-nordiquePro sm:leading-[60px]">purpose</p>
                                    <Minus size={20} className="mt-3 font-semibold" />
                                    <p className="text-[22px] leading-[38px] sm:text-[35px] lg:text-[2.6875rem] 2xl:text-[50px] font-light font-nordiquePro sm:leading-[60px]">driven</p>
                                </div>
                                <Image src="/images/quote-end.svg" width={0} height={0} sizes="100vw" className="w-4 h-auto -mt-2" />
                            </div>
                            <Image src="/images/underline.png" width={0} height={0} sizes="100vw" className="absolute inset-0 w-full h-auto mt-4 px-5" />
                        </div>
                    </div>

                </div>
                <div>
                    <p className="text-[25px] leading-[40px] sm:text-[35px] lg:text-[3.125rem] 2xl:text-[60px] font-bold sm:leading-[60px] tracking-wide font-ceraRoundPro mt-2">
                        Digital Transformation Partner
                    </p>
                    {/* Curved SVG Line */}

                </div>
            </div>
            <div className="max-w-5xl flex gap-1 mt-3">
                <p className="text-[0.7rem] sm:text-[15px] xl:text-[20px] text-gray-200 sm:leading-[30px]">
                    Transform your reach with data driven strategies, where detail oriented
                </p>
                <Image src="/images/quote-start.svg" width={0} height={0} sizes="100vw" className="w-3 h-auto -mt-2 ml-1" />
                <p className="text-[0.7rem] sm:text-[15px] xl:text-[20px] text-gray-200 sm:leading-[30px]">
                    agents
                </p>
                <Image src="/images/quote-end.svg" width={0} height={0} sizes="100vw" className="w-3 h-auto -mt-2 mr-1" />
                <div className="flex items-center">
                    <p className="text-[0.7rem] sm:text-[15px] xl:text-[20px] text-gray-200 sm:leading-[30px]">
                        co
                    </p>
                    <Minus size={12} className="mt-1" />
                    <p className="text-[0.7rem] sm:text-[15px] xl:text-[20px] text-gray-200 sm:leading-[30px]">
                        pilot your business
                    </p>
                </div>

            </div>
        </div>
    );
};

export default TitleTexts;
