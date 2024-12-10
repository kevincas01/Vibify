import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";

interface FeedAlbumComponentProps {
  playlist: Playlist;
}
const FeedPlaylistComponent = ({ playlist }: FeedAlbumComponentProps) => {
  const handleClick = () => {
    console.log("sfdsd");
  };
  return (
    <div
      key={playlist.id}
      className={`grid grid-cols-[75px_1fr_75px] gap-4 w-full cursor-pointer`}
      onClick={handleClick}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      {playlist.images && playlist.images.length > 0 && (
        <div className="relative w-[75px] aspect-square">
          <Image
            src={playlist.images[0].url}
            alt={playlist.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      <div className="flex justify-between gap-2 w-full min-w-0">
        <div className="flex flex-col min-w-0 ">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            {playlist.name}
          </p>
          <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
            {playlist.owner?.display_name}
          </p>
          <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
            {playlist.description}
          </p>
        </div>
      </div>
      <div>
        <p className="text-lightGray text-nowrap">
          {playlist.tracks.total}{" "}
          {playlist.tracks.total > 1 ? "Tracks" : "Track"}
        </p>
      </div>
    </div>
  );
};

export default FeedPlaylistComponent;
