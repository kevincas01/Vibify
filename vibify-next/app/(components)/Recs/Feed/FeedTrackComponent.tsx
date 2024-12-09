import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";
import React from "react";

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
      <Image
        src={track.album.images[0].url}
        alt={track.name}
        width={75}
        height={75}
      />
      <div className=" w-full min-w-0">
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
      </div>
      <div>
        <p className="text-lightGray">{convertDuration(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default FeedTrackComponent;
