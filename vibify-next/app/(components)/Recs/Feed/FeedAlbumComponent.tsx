import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";

interface FeedAlbumComponentProps {
  album: Album;
}
const FeedAlbumComponent = ({ album }: FeedAlbumComponentProps) => {
  const handleClick = () => {
    console.log("sfdsd");
  };
  return (
    <div
      key={album.id}
      className={`flex gap-4 w-full cursor-pointer`}
      onClick={handleClick}
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
      <div className="flex gap-2 w-full min-w-0">
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
        <div>
          <p className="text-lightGray text-nowrap">
            {album.total_tracks}{" "}
            {album.album_type == "album" ? "Tracks" : "Track"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedAlbumComponent;
