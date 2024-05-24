import type { Metadata } from "next";
import { Figtree, Play } from "next/font/google";

import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import fakeGetSongById from "@/actions/api/getSongByUserId";
import { NextAuthProvider } from "@/providers/AuthProvider";
import PlayingBar from "@/components/musicBar/PlayingBar";

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
          <Sidebar songs={userSong}>{children}</Sidebar>
          <PlayingBar songs={userSong}>{children}</PlayingBar>
        </NextAuthProvider>
      </body>
    </html>
  );
}
