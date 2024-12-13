import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";

import PlaylistItem from "../../SpotifyItems/PlaylistItem";
import { useRecommendItem } from "../../Providers/RecommendItemProvider";

interface RecsAlbumComponentProps {
  playlist: Playlist;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsPlaylistComponent = ({
  playlist,
  onClick,
}: RecsAlbumComponentProps) => {
  const { selectedId } = useRecommendItem();
  const handleClick = () => {
    if (onClick) {
      onClick(playlist.id, playlist); // Invoke the onClick function if it exists
    }
  };
  return (
    <li
      key={playlist.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full  ${
        selectedId == playlist.id ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined} // Set the selected track ID
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <PlaylistItem playlist={playlist} recommend={selectedId !== playlist.id}/>
    </li>
  );
};

export default RecsPlaylistComponent;
