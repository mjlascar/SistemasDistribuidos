import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Avellan publicidad",
  description: "Jeje publicidad",
};
/*
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}*/


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <header className="justify-items-center p-6">
          <nav className="flex flex-row gap-[300px] row-start-2 items-center">
            <Link href="/">Lista</Link> 
            <img
              className="dark:invert "
              src="/avellan.svg"
              alt="Avellan logo"
              width={240}
            /> 
            <Link href="/about">About</Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="flex flex-col items-center">
          <a href= "https://avellan.com.ar">avellan.com.ar</a>
        </footer>
      </body>
    </html>
  );
}
