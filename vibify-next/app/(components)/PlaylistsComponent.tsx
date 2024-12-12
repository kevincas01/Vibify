"use client";
import React from "react";
import { Playlist } from "../types/spotify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PlaylistItem from "./SpotifyItems/PlaylistItem";

interface PlaylistsComponentProps {
  playlists: Playlist[];
}
const PlaylistsComponent = ({ playlists }: PlaylistsComponentProps) => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/playlists/${id}`);
  };
  return (
    <div className=" flex flex-col gap-4">
      <h3>My playlists</h3>

      <div className="flex flex-col items-center py-4  gap-4 ">
        {playlists &&
          playlists.map((playlist) => {
            if (playlist == null) return null;
            return (
              <div
                key={playlist.id}
                className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer`}
                onClick={() => handleClick(playlist.id)}
                style={{
                  transition: "background-color 0.3s ease", // Smooth transition for highlight
                }}
              >
                <PlaylistItem playlist={playlist}/>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlaylistsComponent;
