import Image from "next/image";

export default function HomeLayout({ children }) {
    return (
        <div className="!relative max-w-[1920px] mx-auto h-full">
            <Image
                src="/images/igenServerLogo.png"
                alt="Logo"
                width={0}
                height={0}
                sizes="100vw"
                className="absolute top-5 left-5 w-[120px] lg:w-[173px] h-auto"
            />
            {children}
        </div>
    );
}