'use client';

import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import SearchContent from './components/SearchContent';
import searchAll from '@/actions/search/searchAll';
import { useEffect, useState } from 'react';
import { Playlist } from '@/scheme/Playlist';
import { Song } from '@/scheme/Song';
import Album from '@/scheme/Album';
import { LibraryType } from '@/const/libraryType';
import { UserDto } from '@/scheme/User';

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const Search = ({ searchParams }: SearchProps) => {
  //TODO: connect api search
  const [data, setData] = useState<any>({});
  const [selectedButton, setSelectedButton] = useState<string | null>('tracks');
  const [selectedData, setSelectedData] = useState<
    (Song | Playlist | Album | UserDto)[]
  >([]);

  useEffect(() => {
    if (selectedButton) {
      const filteredData = data[selectedButton];
      setSelectedData(filteredData);
      console.log(filteredData);
    } else {
      setSelectedData(data['tracks']);
      setSelectedButton('tracks');
    }
  }, [selectedButton, data]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchAll(searchParams.title);
      setData(data);
    };
    fetchData();
  }, [searchParams.title]);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
          <div
            id="library-button"
            className="flex px-5 space-x-2 overflow-hidden"
          >
            <button
              onClick={() => setSelectedButton('tracks')}
              className={`px-4 py-2 rounded-full font-semibold flex items-center ${
                selectedButton === 'tracks'
                  ? 'bg-white text-[#232323]'
                  : 'bg-[#232323] text-white hover:bg-[#3c3c3c]'
              }`}
            >
              Songs
            </button>
            <button
              onClick={() => setSelectedButton('playlists')}
              className={`px-4 py-2 rounded-full font-semibold flex items-center ${
                selectedButton === 'playlists'
                  ? 'bg-white text-[#232323]'
                  : 'bg-[#232323] text-white hover:bg-[#3c3c3c]'
              }`}
            >
              Playlists
            </button>
            <button
              onClick={() => setSelectedButton('artists')}
              className={`px-4 py-2 rounded-full font-semibold flex items-center ${
                selectedButton === 'artists'
                  ? 'bg-white text-[#232323]'
                  : 'bg-[#232323] text-white hover:bg-[#3c3c3c]'
              }`}
            >
              Artists
            </button>
            <button
              onClick={() => setSelectedButton('albums')}
              className={`px-4 py-2 rounded-full font-semibold flex items-center ${
                selectedButton === 'albums'
                  ? 'bg-white text-[#232323]'
                  : 'bg-[#232323] text-white hover:bg-[#3c3c3c]'
              }`}
            >
              Albums
            </button>
          </div>
        </div>
      </Header>
      <SearchContent data={selectedData} />
    </div>
  );
};

export default Search;
