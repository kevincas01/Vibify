import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";
import AlbumItem from "../../SpotifyItems/AlbumItem";

interface RecsAlbumComponentProps {
  album: Album;
  selected: boolean;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsAlbumComponent = ({
  album,
  selected,
  onClick,
}: RecsAlbumComponentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(album.id, album); 
    }
  };
  return (
    <li
      key={album.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full ${
        selected ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined}
      style={{
        transition: "background-color 0.3s ease", 
      }}
    >
      <AlbumItem album={album}/>
    </li>
  );
};

export default RecsAlbumComponent;
