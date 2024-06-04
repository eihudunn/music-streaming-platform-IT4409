'use client';

import { Palette } from 'color-thief-react';
import Header from '@/components/Header';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PageBreak from '@/components/PageBreak';
import { UserDto } from '@/scheme/User';
import getUserById from '@/actions/user/getUserById';
import { LibraryType } from '@/const/libraryType';
import ArtistContent from '@/components/ArtistContent';
import getSongByUserId from '@/actions/song/getSongByUserId';
import { Song } from '@/scheme/Song';
import getAlbumByUserId from '@/actions/album/getAlbumByUserId';
import Album from '@/scheme/Album';

const ArtistDetail = () => {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId;
  const [data, setData] = useState<UserDto | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserById(userId as string);
        if (user) {
          setData(user);
        } else {
          console.error('No user found');
        }
      } catch (error) {
        console.error('Error calling getUserById:', error);
      }
    };
    if (userId) {
      getUser();
    }
  }, [userId]);

  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = await getSongByUserId(userId as string);
        if (songs) {
          setSongs(songs);
        } else {
          console.error('No songs found for this user');
        }
      } catch (error) {
        console.error('Error calling getSongByUserId:', error);
      }
    };

    if (userId) {
      fetchSongs();
    }
  }, [userId]);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albums = await getAlbumByUserId(userId as string);
        if (albums) {
          setAlbums(albums);
        } else {
          console.error('No album found for this user');
        }
      } catch (error) {
        console.error('Error calling getSongByUserId:', error);
      }
    };

    if (userId) {
      fetchAlbum();
    }
  }, [userId]);

  return (
    <>
      {data && (
        <Palette
          src={data?.avatarImg as string}
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
                  title={data?.username as string}
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
                          sizes="240"
                          src={
                            data?.avatarImg
                              ? (data?.avatarImg as string)
                              : '/images/default.png'
                          }
                          alt={data?.username as string}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                        <p className="hidden md:block font-semibold text-lg">
                          Verified Artist
                        </p>
                        <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-extrabold">
                          {data?.username}
                        </h1>
                        <div className="flex items-center gap-x-2">
                          <p className="text-white"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Header>
                <PageBreak
                  type={LibraryType.Artist}
                  id={userId}
                  songs={songs}
                  isProfile={true}
                />
                <div className="">
                  <h1 className="text-2xl font-bold mx-4">
                    Your Uploaded Song
                  </h1>
                  <ArtistContent songs={songs} isEdit={true} userId={userId} />
                </div>
                <div className="">
                  <h1 className="text-2xl font-bold mx-4">
                    Your Uploaded Album
                  </h1>
                  <ArtistContent songs={albums} isEdit={true} userId={userId} />
                </div>
              </>
            );
          }}
        </Palette>
      )}
    </>
  );
};

export default ArtistDetail;
