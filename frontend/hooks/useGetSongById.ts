import getSongBySongId from "@/actions/getSongBySongId";
import { Song } from "@/scheme/Song";
import { useEffect, useMemo, useState } from "react";

const useGetSongById = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);

  //get song by id
  useEffect(() => {
    setIsLoading(true);
    //fetch song by id
    const getSongById = async () => {
      const data = await getSongBySongId(id);
      setSong(data as Song);
      setIsLoading(false);
    };
    getSongById();
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
