import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";
import React from "react";
import TrackItem from "../../SpotifyItems/TrackItem";

interface RecsTrackComponentProps {
  track: Track;
  selected: boolean;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsTrackComponent = ({
  track,
  selected,
  onClick,
}: RecsTrackComponentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(track.id, track); // Invoke the onClick function if it exists
    }
  };
  return (
    <li
      key={track.id}
      className={`grid grid-cols-[50px_1fr_auto] gap-4 w-full ${
        selected ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
     <TrackItem track={track}/>
    </li>
  );
};

export default RecsTrackComponent;
