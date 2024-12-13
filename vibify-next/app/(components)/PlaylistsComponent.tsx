"use client";
import React, { useState } from "react";
import { Playlist } from "../types/spotify";
import PlaylistItem from "./SpotifyItems/PlaylistItem";
import PlaylistItemComponent from "./PlaylistItemComponent";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface PlaylistsComponentProps {
  accessToken: string;
  playlists: Playlist[];
}
const PlaylistsComponent = ({
  accessToken,
  playlists,
}: PlaylistsComponentProps) => {
  const [playlistSelected, setPlaylistSelected] = useState<Playlist | null>(
    null
  );

  const handleClick = (playlist: Playlist) => {
    setPlaylistSelected(playlist);
  };
  const closeSelectedPlaylist = () => {
    setPlaylistSelected(null);
  };


  return (
    <div className="flex flex-col gap-4 relative">
      {!playlistSelected ? (
        <h3>My playlists</h3>
      ) : (
        <>
          <h3> Selected Playlist</h3>
          <span
            className=" cursor-pointer absolute right-0 top-0"
            onClick={() => closeSelectedPlaylist()}
          >
            <ArrowBackIcon />
          </span>
        </>
      )}

      <PlaylistItemComponent
        accessToken={accessToken}
        playlist={playlistSelected}
      />

      {!playlistSelected && (
        <div className="flex flex-col items-center  gap-4 ">
          {playlists &&
            playlists.map((playlist) => {
              if (playlist == null) return null;
              return (
                <div
                  key={playlist.id}
                  className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer`}
                  onClick={() => handleClick(playlist)}
                  style={{
                    transition: "background-color 0.3s ease", // Smooth transition for highlight
                  }}
                >
                  <PlaylistItem playlist={playlist} />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default PlaylistsComponent;
