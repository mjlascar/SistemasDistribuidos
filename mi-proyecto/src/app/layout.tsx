"use client";

import "./globals.css";
import Link from "next/link";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
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
            <Link href="/favorites">Favorites</Link>
          </nav>
        </header>

        <body>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </body>

        <footer className="flex flex-col items-center">
          <a href= "https://avellan.com.ar">avellan.com.ar</a>
        </footer>
      </body>
    </html>
  );
}
