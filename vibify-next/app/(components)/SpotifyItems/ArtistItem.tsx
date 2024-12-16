import {Artist } from "@/app/types/spotify";
import Image from "next/image";
import React from "react";
interface ArtistItemProps {
  artist: Artist;
}
const ArtistItem = ({ artist }: ArtistItemProps) => {
  return (
    <>
      <div className="w-full aspect-square relative">
        {artist.images && artist.images.length > 0 ? (
          <Image
            src={artist.images[0].url}
            alt={artist.name}
            fill
            className="rounded-full"
            style={{ objectFit: "cover" }}
            sizes="50vw"
          />
        ) : (
          <div className="relative w-[50px] md:w-[75px] aspect-square">
            <Image
              src={"/NoImage.png"}
              alt={artist.name}
              fill
              className="rounded-full"
              style={{ objectFit: "cover" }}
              sizes="50vw"
            />
          </div>
        )}
      </div>

      <h5 className="text-center mt-2">{artist.name}</h5>
    </>
  );
};

export default ArtistItem;
