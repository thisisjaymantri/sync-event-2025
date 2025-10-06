import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
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
  title: "Sync '25",
  description: "Run of show schedule for Sync '25 event in Los Angeles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={suisseIntl.variable}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}