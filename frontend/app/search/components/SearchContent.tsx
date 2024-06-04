'use client';

import LikeButton from '@/components/musicBar/LikeButton';
import MediaItem from '@/components/MediaItem';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/scheme/Song';
import React from 'react';
import { useRouter } from 'next/navigation';

interface SearchContentProps {
  data: any;
}

const SearchContent: React.FC<SearchContentProps> = ({ data }) => {
  const router = useRouter();

  const onDetailClick = (data: any) => {
    console.log(data);
    router.push(`/${data.type.toLowerCase()}/${data.id}`);
  };

  if (data?.length === 0) {
    return (
      <>
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400 items-center justify-center">
          <p>No data found.</p>
          <p>
            Please make sure your words are spelled correctly, or use fewer or
            different keywords.
          </p>
        </div>
      </>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {data?.map((datum: any) => (
        <div key={data.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem
              onClick={() => onDetailClick(datum)}
              key={datum.id}
              data={datum}
            />
          </div>
          {/* <LikeButton songId={data.id} /> */}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
