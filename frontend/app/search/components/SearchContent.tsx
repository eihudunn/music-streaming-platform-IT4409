"use client";

import MediaItem from '@/components/MediaItem';
import { Song } from '@/scheme/Song';
import React from 'react'

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({songs}) => {
  if (songs.length === 0) {
    return (
        <>
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No songs found.
            </div>
            <div>
                Please make sure your words are spelled correctly, or use fewer or different keywords.
            </div>
        </>
    )
  }
  return (
    <div className='flex flex-col gap-y-2 w-full px-6'>
        {songs.map((song) => (
            <div key={song.id} className='flex items-center gap-x-4 w-full'>
                <div className='flex-1'>
                    <MediaItem onClick={() => {}} data={song} />
                </div>
            </div>
        ))}
    </div>
  )
}

export default SearchContent;