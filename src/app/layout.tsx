import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DynamicProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nectar Take Home",
  description: "Created by @nvsriram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-dynamic-base-2`}>
        <DynamicProvider>{children}</DynamicProvider>
      </body>
    </html>
  );
}
