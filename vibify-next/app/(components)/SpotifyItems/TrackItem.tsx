"use client";
import { Artist, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";
import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useRecommendItem } from "../Providers/RecommendItemProvider";
interface TrackItemProps {
  track: Track;
  recommend?: boolean;
}
const TrackItem = ({ track, recommend = true }: TrackItemProps) => {
  const { selectItem } = useRecommendItem();

  const handleTrackSelect = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling

    selectItem(track.id, track);
  };
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

      <div className="flex flex-col items-center">
        <p className="text-lightGray">{convertDuration(track.duration_ms)}</p>
        {recommend && <span className="cursor-pointer" onClick={handleTrackSelect}>
          <GroupAddIcon />
        </span>}
        
      </div>
    </>
  );
};

export default TrackItem;
