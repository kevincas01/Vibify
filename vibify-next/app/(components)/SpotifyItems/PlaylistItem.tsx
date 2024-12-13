import { Playlist } from "@/app/types/spotify";
import Image from "next/image";
import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useRecommendItem } from "../Providers/RecommendItemProvider";

interface PlaylistItemProps {
  playlist: Playlist;
  recommend?: boolean;
}
const PlaylistItem = ({ playlist, recommend = true }: PlaylistItemProps) => {
  const { selectItem } = useRecommendItem();

  const handlePlaylistSelect = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling
    console.log("track.iutemmmmm");
    selectItem(playlist.id, playlist);
  };
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
      <div className="flex flex-col items-end">
        <p className="text-lightGray text-nowrap">
          {playlist.tracks.total}{" "}
          {playlist.tracks.total > 1 ? "Tracks" : "Track"}
        </p>
        {recommend && (
          <span className="cursor-pointer" onClick={handlePlaylistSelect}>
            <GroupAddIcon />
          </span>
        )}
      </div>
    </>
  );
};

export default PlaylistItem;
