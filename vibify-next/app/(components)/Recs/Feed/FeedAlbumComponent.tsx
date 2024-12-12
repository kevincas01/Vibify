import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";
import AlbumItem from "../../SpotifyItems/AlbumItem";

interface FeedAlbumComponentProps {
  album: Album;
}
const FeedAlbumComponent = ({ album }: FeedAlbumComponentProps) => {
  const handleClick = () => {
    console.log("sfdsd");
  };
  return (
    <div
      key={album.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer`}
      onClick={handleClick}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <AlbumItem album={album}/>
    </div>
  );
};

export default FeedAlbumComponent;
