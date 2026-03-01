import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robotics Motion Planning",
  description:
    "Enterprise-style UI for planar 3-DoF trajectory generation and kinematics visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-dvh bg-surface text-slate-900">
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
