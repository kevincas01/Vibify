import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";
import React from "react";

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
      className={`flex gap-4 w-full ${
        selected ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <Image
        src={track.album.images[0].url}
        alt={track.name}
        width={50}
        height={50}
      />
      <div className="flex justify-between gap-2 w-full min-w-0">
        <div className="flex flex-col min-w-0">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            {track.name}
          </p>
          <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
            {track.artists.map((artist: Artist, index: number) => (
              <React.Fragment key={index}>
                {artist.name}
                {index < track.artists.length - 1 && " ~ "}
              </React.Fragment>
            ))}
          </p>
        </div>
        <div>
          <p className="text-lightGray">{convertDuration(track.duration_ms)}</p>
        </div>
      </div>
    </li>
  );
};

export default RecsTrackComponent;
