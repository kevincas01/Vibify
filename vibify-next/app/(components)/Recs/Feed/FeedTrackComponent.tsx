import { Track } from "@/app/types/spotify";

import React from "react";
import TrackItem from "../../SpotifyItems/TrackItem";

interface FeedTrackComponentProps {
  track: Track;
}
const FeedTrackComponent = ({ track }: FeedTrackComponentProps) => {

  return (
    <div
      key={track.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full `}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <TrackItem track={track} recommend={false} />
    </div>
  );
};

export default FeedTrackComponent;
