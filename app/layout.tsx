import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";
import { PageWrapper } from "@/lib/page-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DedhBigha — Lucknow's #1 Real Estate Platform | Buy, Rent, Sell",
    template: "%s | DedhBigha Lucknow",
  },
  description:
    "DedhBigha is Lucknow's trusted real estate marketplace. Buy, sell, or rent properties in Gomti Nagar, Hazratganj, Indira Nagar & more. Find verified flats, villas, plots across Lucknow.",
  keywords: [
    "real estate lucknow",
    "property in lucknow",
    "flats in gomti nagar",
    "house for sale lucknow",
    "buy property lucknow",
    "rent in hazratganj",
    "dedhbigha",
    "lucknow property",
  ],
  openGraph: {
    type: "website",
    siteName: "DedhBigha",
    title: "DedhBigha — Lucknow's #1 Real Estate Platform",
    description: "Lucknow's trusted real estate marketplace. Buy, sell, or rent properties across Lucknow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">
        <Providers><PageWrapper>{children}</PageWrapper></Providers>
      </body>
    </html>
  );
}
