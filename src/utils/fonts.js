import { Dancing_Script, Parkinsans } from "next/font/google";

export const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"],
    display: "swap",
    variable: "--font-dancing-script",
});

export const parkinsans = Parkinsans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    display: "swap",
    variable: "--font-parkinsans",
});
