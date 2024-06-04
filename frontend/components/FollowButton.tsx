'use client';

import followAlbum from '@/actions/follow/followAlbum';
import followArtist from '@/actions/follow/followArtist';
import isFollowedAlbum from '@/actions/follow/isFollowedAlbum';
import isFollowedArtist from '@/actions/follow/isFollowedArtist';
import unFollowAlbum from '@/actions/follow/unFollowAlbum';
import unFollowArtist from '@/actions/follow/unFollowArtist';
import { LibraryType } from '@/const/libraryType';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

interface FollowButtonProps {
  id: string;
  type: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ id, type }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isFollowed, setIsFollowed] = useState(false);

  const Icon = isFollowed ? IoCheckmarkDoneCircle : IoMdAddCircleOutline;

  useEffect(() => {
    const checkArtistFollowed = async () => {
      if (!session) return;
      const data = await isFollowedArtist(session?.user?._doc._id, id);
      setIsFollowed(data);
    };
    const checkAlbumFollowed = async () => {
      if (!session) return;
      const data = await isFollowedAlbum(session?.user?._doc._id, id);
      setIsFollowed(data);
    };
    if (type === LibraryType.Artist) {
      checkArtistFollowed();
    } else if (type === LibraryType.Album) {
      checkAlbumFollowed();
    }
  }, [session, id, type]);

  const handleFollow = async () => {
    //check if user is logged in
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (isFollowed) {
      //delete Followed from song
      console.log('unfollow');
      if (type === LibraryType.Artist) {
        await unFollowArtist({ userId: session?.user?._doc._id, artistId: id });
      }
      if (type === LibraryType.Album) {
        await unFollowAlbum({ userId: session?.user?._doc._id, albumId: id });
      }
      setIsFollowed(false);
    } else {
      //insert follow to the table
      console.log('follow');
      if (type === LibraryType.Artist) {
        await followArtist({ userId: session?.user?._doc._id, artistId: id });
      }
      if (type === LibraryType.Album) {
        await followAlbum({ userId: session?.user?._doc._id, albumId: id });
      }
      setIsFollowed(true);
      toast.success('Followed!');
    }
    router.refresh();
  };

  return (
    <button onClick={handleFollow} className="hover:opacity-75 transition ">
      <Icon color={isFollowed ? '#22c55e' : 'white'} size={40} />
    </button>
  );
};

export default FollowButton;
