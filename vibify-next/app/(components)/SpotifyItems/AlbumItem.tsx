'use client' 
import { Album, Artist } from "@/app/types/spotify";
import Image from "next/image";
import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useRecommendItem } from "../Providers/RecommendItemProvider";
interface AlbumItemProps {
  album: Album;
  recommend?: boolean;
}
const AlbumItem = ({ album, recommend = true }: AlbumItemProps) => {
  const { selectItem } = useRecommendItem();

  const handleAlbumSelect = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling
    console.log("track.iutemmmmm");
    selectItem(album.id, album);
  };
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
      <div className="flex flex-col items-end">
        <p className="text-lightGray text-nowrap">
          {album.total_tracks}{" "}
          {album.album_type == "album" ? "Tracks" : "Track"}
        </p>
        {recommend && (
          <span className="cursor-pointer" onClick={handleAlbumSelect}>
            <GroupAddIcon />
          </span>
        )}
      </div>
    </>
  );
};

export default AlbumItem;
