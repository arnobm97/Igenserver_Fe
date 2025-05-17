import Image from "next/image";

export default function HomeLayout({ children }) {
    return (
        <div className="!relative max-w-[1920px] mx-auto h-full">
            <div className="absolute top-5 left-5 flex items-center gap-2">
                <Image
                    src="/images/igenServerOfficialLogo.webp"
                    alt="Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[20px] lg:w-[30px] h-auto"
                />
                <h2 className="font-nordiquePro text-[1.375rem] text-white tracking-widest -mt-2">igenserver</h2>
            </div>
            {children}
        </div>
    );
}