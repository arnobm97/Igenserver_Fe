import TitleTexts from "@/app/components/home/TitleTexts";
import SelectMenuCardChatbot from "../../components/home/SelectMenuCardChatbot";
import SelectMenuCardCenter from "../../components/home/SelectMenuCardCenter";
import SelectMenuCardService from "../../components/home/SelectMenuCardService";

export default function Home() {
    return (
        <div className="h-screen overflow-hidden font-ceraround">
           <div className="relative z-10 text-white grid px-[72px] pt-[50px] min-h-screen font-ceraRoundPro">
                    <div className="grid items-start h-fit gap-[133px]">
                        <TitleTexts />
                        <div className="absolute bottom-1 left-0 flex w-full h-full justify-center items-end !gap-[10px] pb-2">
                            <SelectMenuCardChatbot />
                            <SelectMenuCardCenter />
                            <SelectMenuCardService />
                        </div>
                    </div>
                </div>
        </div>
    );
}
