import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({songId}) => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);


  
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if(!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };


  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  )
}

export default LikeButton;