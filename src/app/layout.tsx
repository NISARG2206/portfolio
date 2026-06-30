import type { Metadata } from "next";
import { Source_Serif_4, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import CursorReticle from "../components/CursorReticle";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Nisarg Patel | Field Report — Systems Developer",
  description:
    "Subject dossier: Nisarg Patel builds production web systems from Ahmedabad, India.",
  keywords: [
    "Nisarg Patel",
    "Systems Developer",
    "Fullstack",
    "Ahmedabad",
    "Backend",
    "Frontend",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${spaceMono.variable} ${syne.variable}`}
    >
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <div className="scanlines-overlay" aria-hidden="true" />
        <div className="dossier-grid-overlay" aria-hidden="true" />
        <div className="contour-overlay" aria-hidden="true" />
        <div className="radar-sweep" aria-hidden="true" />

        <CursorReticle />

        {children}
      </body>
    </html>
  );
}
