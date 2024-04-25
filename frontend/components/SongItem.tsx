"use client"

import { Song } from "@/scheme/Song";
import Image from "next/image";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({data, onClick}) => {
  return (
    <div onClick={() => onClick(data.id)}
        className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hove:bg-neutral-400/10 transition p-3"
    >   
        <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
            <Image className="object-cover" src={data.image || '/images/default.png'} fill alt="Song image" />
        </div>
    </div>
  )
}

export default SongItem;
