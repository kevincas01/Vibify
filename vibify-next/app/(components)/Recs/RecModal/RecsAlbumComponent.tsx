import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";
import AlbumItem from "../../SpotifyItems/AlbumItem";
import { useRecommendItem } from "../../Providers/RecommendItemProvider";

interface RecsAlbumComponentProps {
  album: Album;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsAlbumComponent = ({ album, onClick }: RecsAlbumComponentProps) => {
  const { selectedId } = useRecommendItem();
  const handleClick = () => {
    if (onClick) {
      onClick(album.id, album);
    }
  };
  return (
    <li
      key={album.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full ${
        selectedId == album.id ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined}
      style={{
        transition: "background-color 0.3s ease",
      }}
    >
      <AlbumItem album={album} />
    </li>
  );
};

export default RecsAlbumComponent;
