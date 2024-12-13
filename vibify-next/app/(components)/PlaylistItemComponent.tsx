'use client'
import React from "react";
import { Artist, PlaylistItem, Track } from "../types/spotify";
import Image from "next/image";
import { convertDuration } from "../utils/misc";
import TrackItem from "./SpotifyItems/TrackItem";
interface PlaylistItemComponentProps {
  playlistItems: PlaylistItem[];
}
const PlaylistItemComponent = ({
  playlistItems,
}: PlaylistItemComponentProps) => {
  return (
    <div className=" flex flex-col gap-4">
      <h3>Playlist Tracks</h3>

      <div className="flex flex-col items-center py-4  gap-4 ">
        {playlistItems.map((playlistItem, _: number) => {
          if (playlistItem === null) return null;
          return (
            <div
              key={playlistItem.track.id}
              className="grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full"
            >
              <TrackItem track={playlistItem.track}/>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistItemComponent;
