import axiosClient from "@/app/_utils/GlobalApi";

// const getSong = () => axiosClient.get('/song/get');

const fakeGetSongById = () => {
  return [
    {
      id: "1",
      title: "Bao tiền một mớ bình yên",
      artist: "me",
      href: "https://audio.https://res.cloudinary.com/dgpijywn0/video/upload/v1713953187/song/bao_ti%E1%BB%81n_m%E1%BB%99t_m%E1%BB%9B_b%C3%ACnh_y%C3%AAn-_Acoustic_-_14_Casper_Bon_Nghi%C3%AAm_-_B%C3%A0i_h%C3%A1t_lyrics_ulxrnd.mp3",
      image:
        "https://res.cloudinary.com/dgpijywn0/image/upload/v1713953259/image/btmmby_b56lft.jpg",
    },
    {
      id: "2",
      title: "watafak",
      artist: "me",
      href: "https://res.cloudinary.com/dgpijywn0/video/upload/v1713953170/song/Tr%C3%B4i_-_Kha_-_B%C3%A0i_h%C3%A1t_lyrics_fxa13u.mp3",
      image:
        "https://res.cloudinary.com/dgpijywn0/image/upload/v1713953259/image/btmmby_b56lft.jpg",
    },
    {
      id: "3",
      title: "How deep is your love",
      artist: "me",
      href: "https://res.cloudinary.com/dgpijywn0/video/upload/v1713953167/song/Gi%C3%B3_V%E1%BA%ABn_H%C3%A1t_-_Long_Ph%E1%BA%A1m_-_B%C3%A0i_h%C3%A1t_lyrics_c6puby.mp3",
      image:
        "https://res.cloudinary.com/dgpijywn0/image/upload/v1713953259/image/btmmby_b56lft.jpg",
    },
    {
      id: "6",
      title: "Chuyện rằng",
      artist: "me",
      href: "https://res.cloudinary.com/dgpijywn0/video/upload/v1713953173/song/Em_Ch%E1%BA%AFc_Kh%C3%B4ng_-_Ph%E1%BA%A1m_Nguy%C3%AAn_Ng%E1%BB%8Dc_BMZ_-_B%C3%A0i_h%C3%A1t_lyrics_prcbtx.mp3",
      image:
        "https://res.cloudinary.com/dgpijywn0/image/upload/v1713953259/image/btmmby_b56lft.jpg",
    },
    {
      id: "7",
      title: "How deep is your love",
      artist: "me",
      href: "https://res.cloudinary.com/dgpijywn0/video/upload/v1713953174/song/n%C3%A0ng_th%C6%A1..._tr%E1%BB%9Di_gi%E1%BA%A5u_tr%E1%BB%9Di_mang_%C4%91i_-_AMEE_Ho%C3%A0ng_D%C5%A9ng_-_B%C3%A0i_h%C3%A1t_lyrics_fxidtn.mp3",
      image:
        "https://res.cloudinary.com/dgpijywn0/image/upload/v1713953259/image/nt_u6rqpl.jpg",
    },
  ];
};

export default fakeGetSongById;

export const fakeGetSongBySongId = () => {
  return {
    id: "1",
    title: "Bao tiền một mớ bình yên",
    artist: "me",
    href: "https://res.cloudinary.com/dgpijywn0/video/upload/v1713953187/song/bao_ti%E1%BB%81n_m%E1%BB%99t_m%E1%BB%9B_b%C3%ACnh_y%C3%AAn-_Acoustic_-_14_Casper_Bon_Nghi%C3%AAm_-_B%C3%A0i_h%C3%A1t_lyrics_ulxrnd.mp3",
    image:
      "https://res.cloudinary.com/dgpijywn0/image/upload/v1713953259/image/btmmby_b56lft.jpg",
  };
};
