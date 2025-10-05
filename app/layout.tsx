import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const suisseIntl = localFont({
  src: [
    {
      path: "./fonts/SuisseIntl-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-suisse",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sync '25 - Event Schedule",
  description: "Run of show schedule for Sync '25 event in Los Angeles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={suisseIntl.variable}>{children}</body>
    </html>
  );
}