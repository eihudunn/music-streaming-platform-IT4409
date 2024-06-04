'use client';

import { Palette } from 'color-thief-react';
import Header from '@/components/Header';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Song } from '@/scheme/Song';
import getSongBySongId from '@/actions/song/getSongBySongId';
import PageBreak from '@/components/PageBreak';

const SongDetail = () => {
  const params = useParams<{ songId: string }>();
  const songId = params?.songId;
  const [data, setData] = useState<Song | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSong = async () => {
      const song = await getSongBySongId(songId as string);
      if (song) {
        setData(song);
      } else {
        console.error('No song found');
      }
    };
    if (songId) {
      getSong();
    }
  }, [songId]);

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
            let color;
            if (imgColor) {
              color = imgColor[0] > '#202020' ? imgColor[0] : imgColor[1];
            } else {
              color = '#05614C';
            }
            return (
              <>
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
                          Song
                        </p>
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold">
                          {data?.title}
                        </h1>
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={data?.artistData?.[0].avatarImg}
                            alt="avt"
                            className="rounded-full h-8 w-8"
                            width={32}
                            height={32}
                          />
                          <p
                            className="text-white"
                            onClick={() =>
                              router.push(
                                `/artist/${data?.artistData?.[0]._id}`,
                              )
                            }
                          >
                            {data?.artistData?.[0].username}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Header>
                <PageBreak song={data as Song} type={data?.type} />
              </>
            );
          }}
        </Palette>
      )}
    </div>
  );
};

export default SongDetail;
