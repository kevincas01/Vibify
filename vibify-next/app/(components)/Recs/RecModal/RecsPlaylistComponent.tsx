import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";

interface RecsAlbumComponentProps {
  playlist: Playlist;
  selected: boolean;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsPlaylistComponent = ({
  playlist,
  selected,
  onClick,
}: RecsAlbumComponentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(playlist.id, playlist); // Invoke the onClick function if it exists
    }
  };
  return (
    <li
      key={playlist.id}
      className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full  ${
        selected ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined} // Set the selected track ID
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      {playlist.images && playlist.images.length > 0 ? (
        <div className="relative w-[50px] md:w-[75px] aspect-square">
          <Image
            src={playlist.images[0].url}
            alt={playlist.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50px, 75px"
          />
        </div>
      ) : (
        <div className="relative w-[50px] md:w-[75px] aspect-square">
          <Image
            src={"/NoImage.png"}
            alt={playlist.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50px, 75px"
          />
        </div>
      )}
      <div className="w-full min-w-0">
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
    </li>
  );
};

export default RecsPlaylistComponent;
