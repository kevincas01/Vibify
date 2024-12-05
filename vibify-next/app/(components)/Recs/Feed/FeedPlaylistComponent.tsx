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
      className={`flex gap-4 w-full cursor-pointer`}
      onClick={handleClick}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      {playlist.images && playlist.images.length > 0 && (
        <Image
          src={playlist.images[0].url}
          alt={playlist.name}
          width={75}
          height={75}
        />
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
        <div>
          <p className="text-lightGray text-nowrap">
            {playlist.tracks.total}{" "}
            {playlist.tracks.total > 1 ? "Tracks" : "Track"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedPlaylistComponent;
