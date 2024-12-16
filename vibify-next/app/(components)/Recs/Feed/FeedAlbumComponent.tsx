import React from "react";
import { Album } from "@/app/types/spotify";

import AlbumItem from "../../SpotifyItems/AlbumItem";

interface FeedAlbumComponentProps {
  album: Album;
}
const FeedAlbumComponent = ({ album }: FeedAlbumComponentProps) => {

  return (
    <div
      key={album.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer`}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <AlbumItem album={album} recommend={false} />
    </div>
  );
};

export default FeedAlbumComponent;
