import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";
import React from "react";
import TrackItem from "../../SpotifyItems/TrackItem";

interface FeedTrackComponentProps {
  track: Track;
}
const FeedTrackComponent = ({ track }: FeedTrackComponentProps) => {
  const handleClick = () => {
    console.log("sfdsd");
  };
  return (
    <div
      key={track.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer`}
      onClick={handleClick}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <TrackItem track={track}/>
    </div>
  );
};

export default FeedTrackComponent;
