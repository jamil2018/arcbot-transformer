import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import AppNavbar from "@/components/AppNavbar";
import { routes } from "@/constants/appRoutes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcbot Transform",
  description: "Automation script generator for Arcbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppNavbar routes={routes} />
          <div className="max-w-screen-2xl mx-auto px-6 mt-2">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
