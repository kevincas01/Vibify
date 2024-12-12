import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";

import ArtistItem from "../../SpotifyItems/ArtistItem";

interface RecsArtistComponentProps {
  artist: Artist;
  selected: boolean;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsArtistComponent = ({
  artist,
  selected,
  onClick,
}: RecsArtistComponentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(artist.id, artist); // Invoke the onClick function if it exists
    }
  };
  return (
    <div
      key={artist.id}
      className={`flex flex-col items-center w-2/5 md:w-1/4 ${
        selected ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <ArtistItem artist={artist}/>
    </div>
  );
};

export default RecsArtistComponent;
