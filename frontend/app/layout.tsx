import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import fakeGetSongById from "@/actions/api/getSongByUserId";

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
        <ModalProvider />
        <Sidebar songs={userSong}> 
          {children}
        </Sidebar>
        </body>
    </html>
  );
}