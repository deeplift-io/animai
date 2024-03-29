import "./globals.css";
import type { Metadata } from "next";
import { Inter, Outfit, Space_Grotesk, Work_Sans } from "next/font/google";
import Providers from "./providers";
import { Toaster } from 'sonner';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const worksans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Animai | The vet in your pocket",
  description:
    "Get helpful, accurate assistance with your pet's health and well being.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} ${worksans.variable} ${inter.variable}`}
    >
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${worksans.variable} ${inter.variable}`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
