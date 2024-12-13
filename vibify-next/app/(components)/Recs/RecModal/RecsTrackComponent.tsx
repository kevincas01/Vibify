import { Album, Artist, Playlist, Track } from "@/app/types/spotify";

import React from "react";
import TrackItem from "../../SpotifyItems/TrackItem";
import { useRecommendItem } from "../../Providers/RecommendItemProvider";

interface RecsTrackComponentProps {
  track: Track;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsTrackComponent = ({ track, onClick }: RecsTrackComponentProps) => {
  const { selectedId } = useRecommendItem();
  const handleClick = () => {
    if (onClick) {
      onClick(track.id, track); // Invoke the onClick function if it exists
    }
  };
  return (
    <li
      key={track.id}
      className={`grid grid-cols-[50px_1fr_auto] gap-4 w-full ${
        selectedId == track.id ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <TrackItem track={track} />
    </li>
  );
};

export default RecsTrackComponent;
