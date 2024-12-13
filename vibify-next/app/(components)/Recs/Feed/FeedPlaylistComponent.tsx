import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";
import PlaylistItem from "../../SpotifyItems/PlaylistItem";

interface FeedAlbumComponentProps {
  playlist: Playlist;
}
const FeedPlaylistComponent = ({ playlist }: FeedAlbumComponentProps) => {
  const handleClick = () => {
    console.log("sfdsd");
  };
  return (
    <div
      key={playlist.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer`}
      onClick={handleClick}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <PlaylistItem playlist={playlist} recommend={false}/>
    </div>
  );
};

export default FeedPlaylistComponent;
