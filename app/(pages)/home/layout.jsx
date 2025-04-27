export default function HomeLayout({ children }) {
    return (
        <div className="!relative max-w-[1920px] mx-auto h-full">
            <img
                src="/images/igenServerLogo.png"
                alt="Logo"
                className="absolute top-5 left-5 w-[120px] lg:w-[173px] h-auto"
            />
            {children}
        </div>
    );
}