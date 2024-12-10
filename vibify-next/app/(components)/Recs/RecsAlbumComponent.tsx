import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";

interface RecsAlbumComponentProps {
  album: Album;
  selected: boolean;
  onClick?: (id: string, item: Artist | Track | Album | Playlist) => void;
}
const RecsAlbumComponent = ({
  album,
  selected,
  onClick,
}: RecsAlbumComponentProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(album.id, album); // Invoke the onClick function if it exists
    }
  };
  return (
    <li
      key={album.id}
      className={`grid grid-cols-[75px_1fr_auto] gap-4 w-full ${
        selected ? "text-main" : "cursor-pointer"
      }`}
      onClick={onClick ? handleClick : undefined}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <Image
        src={album.images[0].url}
        alt={album.name}
        width={75}
        height={75}
      />
      <div className="w-full min-w-0">
        <div className="flex flex-col min-w-0 ">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
            {album.name}
          </p>
          <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
            {album.artists.map((artist: Artist, index: number) => (
              <React.Fragment key={index}>
                {artist.name}
                {index < album.artists.length - 1 && " ~ "}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <div>
        <p className="text-lightGray text-nowrap">
          {album.total_tracks}{" "}
          {album.album_type == "album" ? "Tracks" : "Track"}
        </p>
      </div>
    </li>
  );
};

export default RecsAlbumComponent;
