import React from "react";
import { Artist, PlaylistItem, Track } from "../types/spotify";
import Image from "next/image";
import { convertDuration } from "../utils/misc";
interface PlaylistItemComponentProps {
  playlistItems: PlaylistItem[];
}
const PlaylistItemComponent = ({
  playlistItems,
}: PlaylistItemComponentProps) => {
  return (
    <div className=" flex flex-col gap-4">
      <h3>My playlists</h3>

      <div className="flex flex-col items-center py-4  gap-4 ">
        {playlistItems.map((playlistItem, _: number) => {
          if (playlistItem===null) return null
          return (
          <div key={playlistItem.track.id} className="flex gap-4 w-full">
            {playlistItem.track.album.images && playlistItem.track.album.images.length > 0 ? (
                   <div className="relative w-[50px] md:w-[75px] aspect-square">
                    <Image
                      src={playlistItem.track.album.images[0].url}
                      alt={playlistItem.track.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 50px, 75px"
                    />
                  </div>
                ) : (
                   <div className="relative w-[50px] md:w-[75px] aspect-square">
                    <Image
                      src={"/NoImage.png"}
                      alt={playlistItem.track.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 50px, 75px"
                    />
                  </div>
                )}
            <div className="flex justify-between gap-2 w-full min-w-0">
              <div className="flex flex-col min-w-0">
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {playlistItem.track.name}
                </p>
                <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                  {playlistItem.track.artists.map(
                    (artist: Artist, index: number) => (
                      <React.Fragment key={index}>
                        {artist.name}
                        {index < playlistItem.track.artists.length - 1 && " ~ "}
                      </React.Fragment>
                    )
                  )}
                </p>
              </div>
              <div>
                <p className="text-lightGray">
                  {convertDuration(playlistItem.track.duration_ms)}
                </p>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default PlaylistItemComponent;
