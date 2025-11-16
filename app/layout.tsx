import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { ContactWidget } from "@/components/contact-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exsurion",
  description: "Exsurion | Medical Instruments",
  icons: {
    icon: "/excurion.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <CartProvider>
        <NuqsAdapter>
          {children}
          {/* <WhatsAppButton /> */}
        </NuqsAdapter>
        </CartProvider>
      </body>
    </html>
  );
}
