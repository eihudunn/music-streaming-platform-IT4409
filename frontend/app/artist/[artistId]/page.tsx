'use client';

import { Palette } from 'color-thief-react';
import Header from '@/components/Header';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LikedContent from '@/app/liked/components/LikedContent';
import PageBreak from '@/components/PageBreak';
import { UserDto } from '@/scheme/User';
import getUserById from '@/actions/user/getUserById';

const ArtistDetail = () => {
  const params = useParams<{ artistId: string }>();
  const artistId = params?.artistId;
  const [data, setData] = useState<UserDto | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await getUserById(artistId as string);
        if (user) {
          setData(user);
        } else {
          console.error('No user found');
        }
      } catch (error) {
        console.error('Error calling getUserById:', error);
      }
    };
    if (artistId) {
      getUser();
    }
  }, [artistId]);

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
                          src={data?.avatarImg as string}
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
                          <p className="text-white">100 monthly listener</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Header>
                {/* <PageBreak
                  songs={data?.tracks as Song[]}
                  style={{
                    backgroundColor: `${color}`,
                    mixBlendMode: 'overlay',
                  }}
                />
                <LikedContent songs={data?.tracks as Song[]} /> */}
              </>
            );
          }}
        </Palette>
      )}
    </>
  );
};

export default ArtistDetail;
