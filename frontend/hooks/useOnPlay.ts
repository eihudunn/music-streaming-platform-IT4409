import { Song } from '@/scheme/Song';

import usePlayer from './usePlayer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import playSong from '@/actions/song/playSong';

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const router = useRouter();
  //get user auth
  const { data: session, status } = useSession();

  const onPlay = async (id: string) => {
    //make non-login cant play
    //redirect to login
    if (status === 'unauthenticated') {
      // redirect to login
      router.push('/login');
      return;
    }

    await playSong(id, session?.user?._doc._id);
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
