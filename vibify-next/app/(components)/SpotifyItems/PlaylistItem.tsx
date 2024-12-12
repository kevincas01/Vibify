import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";
import React from "react";

interface PlaylistItemProps {
  playlist: Playlist;
}
const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  return (
    <>
      <div className="relative w-full aspect-square">
        {playlist.images && playlist.images.length > 0 ? (
          <Image
            src={playlist.images[0].url}
            alt={playlist.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50px, 75px"
          />
        ) : (
          <Image
            src={"/NoImage.png"}
            alt={playlist.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50px, 75px"
          />
        )}
      </div>
      <div className="w-full min-w-0">
        <div className="flex flex-col min-w-0 ">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            {playlist.name}
          </p>
          <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
            {playlist.owner?.display_name}
          </p>
          {/* <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
            {playlist.description}
          </p> */}
        </div>
      </div>
      <div>
        <p className="text-lightGray text-nowrap">
          {playlist.tracks.total}{" "}
          {playlist.tracks.total > 1 ? "Tracks" : "Track"}
        </p>
      </div>
    </>
  );
};

export default PlaylistItem;
