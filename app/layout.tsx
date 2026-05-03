import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import CubeCursor from "@/components/cursor/CubeCursor";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  title: "MindSpace Studio | Architecture & Interior Design",
  description:
    "A premium architecture and interior design landing page starter built with Next.js, Three.js, React Three Fiber, Tailwind CSS, and Framer Motion.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
      <CubeCursor />
      {children}
      </body>
      </html>
  );
}
