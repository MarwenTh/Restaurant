import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/providers/SessionProvider";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import ThemeDataProvider from "@/context/theme-data-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodGuide",
  description: "Designed by Nawress and Zayneb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextThemesProvider
            attribute="class"
            // defaultTheme="dark"
            enableSystem
            // disableTransitionOnChange
          >
            {/* <ThemeDataProvider> */}
            <TooltipProvider>
              <Toaster position="top-right" />
              {children}
            </TooltipProvider>
            {/* </ThemeDataProvider> */}
          </NextThemesProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
