'use client';
import { useEffect, useState } from "react";

export default function MainLayout({ children }) {
    const [showStars, setShowStars] = useState(false);
    const [showBG1, setShowBG1] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

        if (!hasSeenIntro) {
            setShowStars(true);
            const starsTimeout = setTimeout(() => {
                setShowStars(false);
                setShowBG1(true);

                const bg1Timeout = setTimeout(() => {
                    setShowContent(true);
                    sessionStorage.setItem("hasSeenIntro", "true");
                }, 2000);

                return () => clearTimeout(bg1Timeout);
            }, 5000);

            return () => clearTimeout(starsTimeout);
        } else {
            setShowBG1(true);
            setShowContent(true);
        }
    }, []);

    return (
        <div className="relative h-screen font-ceraround xl:overflow-hidden">
            {/* Show stars video */}
            {showStars && (
                <div>
                    <video
                        autoPlay
                        muted
                        loop={false}
                        className="fixed inset-0 w-[100vw] h-[100vh] object-cover z-0"
                    >
                        <source src="video/initial-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {/* Show background video */}
            {(showBG1 || showContent) && (
                <video
                    autoPlay
                    muted
                    loop={true}
                    onPlay={(e) => {
                        const video = e.target;
                        video.currentTime = 2.5; // Start playback at 2.5 seconds
                    }}
                    className="fixed inset-0 w-full h-full object-cover z-0"
                >
                    <source src="video/BG_1.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            )}

            {showContent && (
                <div className="w-full">
                    {children}
                </div>
                
            )}
        </div>
    );
}
