import React from "react";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import Image from "next/image";

interface FeedArtistComponentProps {
  artist: Artist;
}
const FeedArtistComponent = ({ artist }: FeedArtistComponentProps) => {
  const handleClick = () => {
    console.log("sfdsd");
  };
  return (
    <div
      key={artist.id}
      className={`flex flex-col items-center w-2/5 md:w-1/4 cursor-pointer`}
      onClick={handleClick}
      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      {artist.images.length > 0 && (
        <div className="w-full aspect-square relative">
          <Image
            src={artist.images[0]?.url || ""}
            alt={artist.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
      )}

      <h5 className="text-center mt-2">{artist.name}</h5>
    </div>
  );
};

export default FeedArtistComponent;
