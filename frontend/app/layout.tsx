import type { Metadata } from "next";
import { Figtree, Play } from "next/font/google";

import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import { NextAuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import Player from "@/components/musicBar/Player";
const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthProvider>
          <ModalProvider />
          <Toaster />
          <Sidebar>{children}</Sidebar>
          <Player />
        </NextAuthProvider>
      </body>
    </html>
  );
}
