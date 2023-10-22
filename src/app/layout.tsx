import "./globals.css";
import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import Providers from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Animai | The vet in your pocket",
  description: "Get helpful, accurate assistance with your pet's health and well being.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} font-light`}
    >
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
