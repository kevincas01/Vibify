import { Album, Artist } from "@/app/types/spotify";
import Image from "next/image";
import React from "react";
interface AlbumItemProps {
  album: Album;
}
const AlbumItem = ({ album }: AlbumItemProps) => {
  return (
    <>
      <div className="relative w-full aspect-square">
        {album.images && album.images.length > 0 ? (
          <Image
            src={album.images[0].url}
            alt={album.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50px, 75px"
          />
        ) : (
          <Image
            src={"/NoImage.png"}
            alt={album.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 50px, 75px"
          />
        )}
      </div>
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
    </>
  );
};

export default AlbumItem;
