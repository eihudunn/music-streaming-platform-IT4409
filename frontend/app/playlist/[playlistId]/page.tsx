"use client";

import Color, { Palette, useColor } from "color-thief-react";
import Header from "@/components/Header";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import getPlaylistById from "@/actions/getPlaylistById";
import { Playlist } from "@/scheme/Playlist";
import LikedContent from "@/app/liked/components/LikedContent";

const PlaylistDetail = () => {
  const params = useParams<{ playlistId: string }>();
  const playlistId = params!.playlistId;
  const [data, setData] = useState<Playlist | null>(null);

  useEffect(() => {
    const getPlaylist = async () => {
      const playlist = await getPlaylistById(playlistId);
      if (playlist) {
        setData(playlist);
      } else {
        console.error("No playlist found");
      }
    };
    if (playlistId) {
      getPlaylist();
    }
  }, [playlistId]);

  return (
    <div className="flex-grow h-screen rounded-lg">
      {data && (
        <Palette
          src={data?.img as string}
          crossOrigin="anonymous"
          format="hex"
          colorCount={3}
        >
          {({ data: imgColor, loading }) => {
            console.log(imgColor);
            if (loading) return <div>Loading...</div>;
            const color = imgColor[0] > "#202020" ? imgColor[0] : imgColor[1];
            return (
              <Header
                title={data?.title as string}
                isContentDetail={true}
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${color} var(--tw-gradient-from-position), #191b1d var(--tw-gradient-from-position) )`,
                }}
              >
                <div className="mt-5">
                  <div className="flex flex-col md:flex-row items-center gap-x-5">
                    <div className="relative h-44 w-44 lg:h-60 lg:w-60">
                      <Image
                        fill
                        src={data?.img as string}
                        alt={data?.title as string}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                      <p className="hidden md:block font-semibold text-lg">
                        Playlist
                      </p>
                      <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold">
                        {data?.title}
                      </h1>
                      <div className="flex items-center gap-x-2">
                        <img
                          src={data?.img}
                          alt="test"
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="text-white">test author</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Header>
            );
          }}
        </Palette>
      )}
      {/* <div className="text-white px-8 flex flex-col space-y-1 pb-28">
        {data?.tracks.map((track) => {
          //item component
          return (
            <div
              key={track.id}
              className="flex items-center justify-between py-2 border-b border-gray-500"
            >
              <div className="flex items-center gap-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                <div className="flex flex-col">
                  <p className="text-sm">{track.title}</p>
                  <p className="text-xs text-gray-400">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <button className="w-8 h-8 bg-gray-500 rounded-full"></button>
                <button className="w-8 h-8 bg-gray-500 rounded-full"></button>
              </div>
            </div>
          );
        })}
      </div> */}
      <LikedContent songs={data?.tracks!} />
    </div>
  );
};

export default PlaylistDetail;
