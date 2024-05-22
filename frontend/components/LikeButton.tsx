"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();

  //TODO: get auth user

  const [isLiked, setIsLiked] = useState(false);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = () => {
    //check if user is logged in
    if (isLiked) {
      //delete liked from song
      setIsLiked(false);
    } else {
      //insert like to the table
      setIsLiked(true);
      toast.success("Liked!");
    }
    router.refresh();
  };

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition ">
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
