'use client';

import { Palette } from 'color-thief-react';
import Header from '@/components/Header';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LikedContent from '@/app/liked/components/LikedContent';
import Album from '@/scheme/Album';
import getAlbumById from '@/actions/album/getAlbumById';
import PageBreak from '@/components/PageBreak';
import { LibraryType } from '@/const/libraryType';

const AlbumDetail = () => {
  const params = useParams<{ albumId: string }>();
  const albumId = params?.albumId;
  const [data, setData] = useState<Album | null>(null);

  useEffect(() => {
    const getAlbum = async () => {
      const album = await getAlbumById(albumId as string);
      if (album) {
        setData(album);
      } else {
        console.error('No album found');
      }
    };
    if (albumId) {
      getAlbum();
    }
  }, [albumId]);

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
                          Album
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
                          <p className="text-white">{data?.artist}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Header>
                <PageBreak
                  songs={data?.tracks}
                  id={data?.id}
                  type={LibraryType.Album}
                />
                <LikedContent songs={data?.tracks} />
              </>
            );
          }}
        </Palette>
      )}
    </div>
  );
};

export default AlbumDetail;
