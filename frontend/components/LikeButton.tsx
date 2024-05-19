import { useRouter } from "next/navigation";
import { useState } from "react";

interface LikeButtonProps {
    songId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({songId}) => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);

  return (
    <div>
        liked?
    </div>
  )
}

export default LikeButton;