import { FaPlay } from 'react-icons/fa';

interface PlayButtonProps {
  id: string;
  onClick?: (id: string) => void;
  isNotHidden?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  onClick,
  id,
  isNotHidden,
}) => {
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        return onClick(id);
      }}
      className={`transition ${!isNotHidden ? 'opacity-0' : 'opacity-100'} rounded-full flex items-center bg-green-500 p-4 drop-shadow-md group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110`}
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
