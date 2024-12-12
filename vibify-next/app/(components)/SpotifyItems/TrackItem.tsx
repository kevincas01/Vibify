import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";
import React from "react";

interface TrackItemProps {
  track: Track;
}
const TrackItem = ({ track }: TrackItemProps) => {
  return (
    <>
      <div className="relative w-full aspect-square">
        {track.album.images && track.album.images.length > 0 ? (
          <Image
            src={track.album.images[0].url}
            alt={track.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="50px"
          />
        ) : (
          <Image
            src={"/NoImage.png"}
            alt={track.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="50px"
          />
        )}
      </div>
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
    </>
  );
};

export default TrackItem;
