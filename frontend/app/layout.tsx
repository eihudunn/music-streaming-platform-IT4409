import type { Metadata } from 'next';
import { Figtree, Play } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import Sidebar from '@/components/sidebar/Sidebar';
import ModalProvider from '@/providers/ModalProvider';
import fakeGetSongById from '@/actions/api/getSongByUserId';
import { NextAuthProvider } from '@/providers/AuthProvider';
import Player from '@/components/musicBar/Player';
import UserProvider from '@/providers/UserProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get default songs
  const userSong = fakeGetSongById().map((song) => ({
    ...song,
    searchTitle: '',
  }));

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
