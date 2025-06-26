import localFont from "next/font/local";
import "./globals.css";
import { Raleway } from "next/font/google";

const arktype = localFont({
  src: "./fonts/Arkitype-TektypeRegular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-arktype",
});

const ceraRoundPro = localFont({
  src: "./fonts/Ceraroundpro-regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-ceraroundpro",
});

const nordiquePro = localFont({
  src: "./fonts/Nordiquepro-regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-nordiquepro",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body
        className={`
        ${arktype.variable}  
        ${nordiquePro.variable} 
        ${ceraRoundPro.variable}
        ${raleway.variable} 
        max-w-[1920px]
        mx-auto
        `}
      >
        {children}
      </body>
    </html>
  );
}
