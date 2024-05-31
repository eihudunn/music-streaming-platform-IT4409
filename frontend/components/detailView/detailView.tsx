import Album from "@/scheme/Album";
import { Playlist } from "@/scheme/Playlist";
import { Song } from "@/scheme/Song";
import React from "react";
import Header from "../Header";

interface DetailViewProps {
  data: Playlist | Song | Album;
}

const DetailView: React.FC<DetailViewProps> = ({ data }) => {
  return (
    <div className="flex-grow h-screen">
      <Header title={data.title} isContentDetail={true}>
        
      </Header>
    </div>
  );
};

export default DetailView;
