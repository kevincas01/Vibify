import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";
import PlaylistItem from "../../SpotifyItems/PlaylistItem";

interface RecsAlbumComponentProps {
  playlist: Playlist;
  selected: boolean;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsPlaylistComponent = ({
  playlist,
  selected,
  onClick,
}: RecsAlbumComponentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(playlist.id, playlist); // Invoke the onClick function if it exists
    }
  };
  return (
    <li
      key={playlist.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full  ${
        selected ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined} // Set the selected track ID
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <PlaylistItem playlist={playlist}/>
    </li>
  );
};

export default RecsPlaylistComponent;
