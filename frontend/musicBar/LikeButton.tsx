'use client';

import isTrackLiked from '@/actions/song/isTrackLiked';
import likeSong from '@/actions/user/likeSong';
import unlikeSong from '@/actions/user/unlikeSong';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface LikeButtonProps {
  songId: string;
  size?: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId, size }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isLiked, setIsLiked] = useState(false);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  useEffect(() => {
    const checkIfLiked = async () => {
      if (!session) return;
      const data = await isTrackLiked(session?.user?._doc._id, songId);
      setIsLiked(data);
    };
    checkIfLiked();
  }, [session, songId]);

  const handleLike = async () => {
    //check if user is logged in
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (isLiked) {
      //delete liked from song
      console.log('unlike');
      await unlikeSong(session?.user?._doc._id, songId);
      setIsLiked(false);
    } else {
      //insert like to the table
      console.log('like');
      await likeSong(session?.user?._doc._id, songId);
      setIsLiked(true);
      toast.success('Liked!');
    }
    router.refresh();
  };

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition ">
      <Icon color={isLiked ? '#22c55e' : 'white'} size={size ? size : 25} />
    </button>
  );
};

export default LikeButton;
