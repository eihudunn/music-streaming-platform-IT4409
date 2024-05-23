import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import fakeGetSongById from "@/actions/api/getSongByUserId";
import { NextAuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import Player from "@/components/Player";

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
  const userSong = fakeGetSongById();

  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthProvider>
          <ModalProvider />
          <Toaster />
          <Sidebar songs={userSong}>{children}</Sidebar>
          <Player />
        </NextAuthProvider>
      </body>
    </html>
  );
}
