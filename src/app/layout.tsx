import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BootstrappedLDProvider } from '@/components/BootstrappedLDProvider';
import { UserProvider } from '@/context/UserContext';
import { LaunchDarklyContextUpdater } from '@/components/LaunchDarklyWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gravity Farms Petfood - Feature Flags Demo",
  description: "A Next.js demo showcasing real-time feature flagging with LaunchDarkly and Vercel Flags SDK",
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
        suppressHydrationWarning={true}
      >
        <BootstrappedLDProvider>
          <UserProvider>
            <LaunchDarklyContextUpdater />
            {children}
          </UserProvider>
        </BootstrappedLDProvider>
      </body>
    </html>
  );
}
