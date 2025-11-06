"use client";

import "./globals.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from 'react-modal';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  useEffect(() => {
    // para que el modal use 'body' como el contenedor de la app
    Modal.setAppElement('body'); 
  }, []);

  return (
    <html lang="es">
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

        
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        

        <footer className="flex flex-col items-center">
          <a href= "https://avellan.com.ar">avellan.com.ar</a>
        </footer>
      </body>
    </html>
  );
}
