import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Suspense } from "react";
import GlobalLoader from "@/components/Loaders/GlobalLoader";
import IntlAndContextWrapper from "@/intlAndContextWrapper/IntlAndContextWrapper";
import SiteSettings from "@/components/SiteSettings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Probashi Sheba",
  description: "Probashi Sheba is the best recruitment agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<GlobalLoader />}>
          <Providers>
            <IntlAndContextWrapper>
              <SiteSettings />
              {children}
            </IntlAndContextWrapper>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
