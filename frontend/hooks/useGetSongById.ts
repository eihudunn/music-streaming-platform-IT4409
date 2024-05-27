import { fakeGetSongBySongId } from "@/actions/api/getSongByUserId";
import { Song } from "@/scheme/Song";
import { useEffect, useMemo, useState } from "react";

const useGetSongById = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  //get song by id
  useEffect(() => {
    setIsLoading(true);
    //fetch song by id
    const data = fakeGetSongBySongId();
    setSong(data as Song);
    setIsLoading(false);
  }, [id]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
