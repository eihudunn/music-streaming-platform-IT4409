"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import { Song } from "@/scheme/Song";
import { useRouter } from "next/navigation";
import React from "react";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  //useUser hook

  //check is logged

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-2-y 2-full px-6 text-neutral-400">
        No liked songs;
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => {
        return (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div className="flex-1">
              <MediaItem onClick={() => {}} data={song} />
            </div>
            <LikeButton songId={song.id} />
          </div>
        );
      })}
    </div>
  );
};

export default LikedContent;
