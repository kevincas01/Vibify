"use client";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Artist, Track } from "../types/spotify";
import Image from "next/image";

import { useTrackInfo } from "../context/player";

interface SpotifyPlayerProps {}

const SpotifyPlayer = ({}: SpotifyPlayerProps) => {
  // const [deviceId, setDeviceId] = useState("");
  const { currentTrack, isPlaying, handlePlayPause } = useTrackInfo();

  if (currentTrack === null) return null;
  return (
    <div className="w-full md:pl-[108px] bg-grayBg py-4 px-2 fixed bottom-0 left-0 m-auto md:z-10 z-30">
      <div className="grid md:grid-cols-2 items-center grid-cols-2">
        <div className="flex flex-col gap-4">
          <li key={currentTrack.id} className="flex gap-4 w-full">
            <Image
              src={currentTrack.album.images[0].url}
              alt={currentTrack.name}
              width={50}
              height={50}
            />
            <div className="flex justify-between gap-2 w-full min-w-0">
              <div className="flex flex-col min-w-0">
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {currentTrack.name}
                </p>
                <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                  {currentTrack.artists.map((artist: Artist, index: number) => (
                    <React.Fragment key={index}>
                      {artist.name}
                      {index < currentTrack.artists.length - 1 && " ~ "}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </li>
        </div>
        <div className="flex gap-4 justify-center text-5xl">
          <SkipPreviousIcon fontSize="inherit" />
          {!isPlaying ? (
            <PlayArrowIcon
              fontSize="inherit"
              onClick={() => {
                handlePlayPause();
              }}
            />
          ) : (
            <PauseIcon
              fontSize="inherit"
              onClick={() => {
                handlePlayPause();
              }}
            />
          )}
          <SkipNextIcon fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
