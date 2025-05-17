'use client'

import { useEffect, useState } from "react";
import SelectMenuCardChatbot from "./SelectMenuCardChatbot";
import SelectMenuCardCenter from "./SelectMenuCardCenter";
import SelectMenuCardService from "./SelectMenuCardService";
import LeftCard from "./small/LeftCard";
import RightCard from "./small/RightCard";
import CenterCard from "./small/CenterCard";
import TitleTexts from "./TitleTexts";
import { UAParser } from "ua-parser-js";

const Homepage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [userData, setUserData] = useState({
        device: "",
        ip: "",
        country: "",
        city: "",
        browser: "",
        language: "",
        referrer: "",
        timezone: ""
    });

    const [ipAddress, setIpAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIpAndLocation = async () => {
            setLoading(true);
            setError(null);
            try {
                // Step 1: Get IP address
                const ipRes = await fetch('https://api.ipify.org?format=json');
                if (!ipRes.ok) throw new Error(`Failed to get IP. Status: ${ipRes.status}`);
                const { ip } = await ipRes.json();
                setIpAddress(ip);

                // Step 2: Get Geo + ISP Info
                const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,timezone,query`);
                if (!geoRes.ok) throw new Error(`Failed to get geo info. Status: ${geoRes.status}`);
                const geoData = await geoRes.json();

                if (geoData.status !== "success") throw new Error(`IP-API error: ${geoData.message}`);

                // Step 3: Extract browser data
                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const parser = new UAParser();
                const result = parser.getResult();

                setUserData({
                    device: result.device.type || "desktop",
                    os: `${result.os.name} ${result.os.version}`,
                    browser: `${result.browser.name} ${result.browser.version}`,
                    ip,
                    country: geoData.country,
                    city: geoData.city,
                    language: navigator.language,
                    referrer: document.referrer,
                    timezone
                });

            } catch (e) {
                setError(e);
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchIpAndLocation();
    }, []);

    useEffect(() => {
        if (userData.ip) {
            fetch('/api/google-sheets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userData })
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Uploaded to sheet:", data);
                })
                .catch(err => {
                    console.error("Failed to upload to sheet", err);
                });
        }
    }, [userData]);

    return (
        <div
            className={'h-[calc(100vh-170px)] xl:h-[calc(100vh)] w-[100vw] xl:w-full xl:overflow-hidden font-ceraround pt-28 xl:pt-3 2xl:pt-28 lg:pt-0'
            }>
            <div className="relative z-10 text-white grid xl:px-[72px] xl:pt-0 min-h-[670px] font-ceraRoundPro w-full ">
                <div className="flex flex-col w-full xl:h-full justify-center items-center gap-3">
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
};

export default Homepage;
