import axiosClient from '@/app/_utils/GlobalApi';

const getSuggestion = async (id: string) => {
  try {
    const { data } = await axiosClient.get(`/song/suggestion/${id}`);
    data.MostPopularTracks = data.MostPopularTracks?.map((song: any) => {
      song.id = song._id;
      delete song._id;
      return song;
    });
    data.HotTracks = data.HotTracks?.map((song: any) => {
      song.id = song._id;
      delete song._id;
      return song;
    });
    data.artistFollowedTracks = data.artistFollowedTracks?.map((song: any) => {
      song.id = song._id;
      delete song._id;
      return song;
    });
    return data || {};
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getSuggestion;
