import localFont from "next/font/local";
import "./globals.css";

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

export const nordiquePro = localFont({
  src: "./fonts/Nordiquepro-regular.otf",
  weight: "400",
  style: "normal",
  variable: "--font-nordiquepro",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressContentEditableWarning suppressHydrationWarning>
      <body
        className={`
        ${arktype.variable}  
        ${nordiquePro.variable} 
        ${ceraRoundPro.variable} 
        antialiased
        max-w-[1440px]
        mx-auto
        `}
      >
        {children}
      </body>
    </html>
  );
}
