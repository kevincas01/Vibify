"use client";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Artist } from "../types/spotify";
import Image from "next/image";

import { useTrackInfo } from "../context/player";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useRecommendItem } from "./Providers/RecommendItemProvider";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import SpotifyPlayerMobile from "./SpotifyPlayerMobile";

const SpotifyPlayer = () => {
  const { selectItem } = useRecommendItem();
  // const [deviceId, setDeviceId] = useState("");
  const {
    currentTrack,
    isPlaying,
    handlePlayPause,
    handleSkipNext,
    handleSkipPrevious,
  } = useTrackInfo();

  if (currentTrack === null) return null;
  return (
    <>
      <div className="hidden md:block w-full  bg-black fixed bottom-0 left-0 m-auto z-30 h-[80px] ">
        <div
          className="md:hidden fixed bottom-[60px] right-[0px]"
         
        >
          <CloseFullscreenIcon />
        </div>
        <div className="grid md:grid-cols-[1fr_1fr_1fr] items-center grid-cols-[1fr_1fr_auto] px-4 justify-center h-full">
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
                    {currentTrack.artists.map(
                      (artist: Artist, index: number) => (
                        <React.Fragment key={index}>
                          {artist.name}
                          {index < currentTrack.artists.length - 1 && " ~ "}
                        </React.Fragment>
                      )
                    )}
                  </p>
                </div>
              </div>
            </li>
          </div>
          <div className="flex flex-col justify-center text-5xl">
            <div className="flex justify-center items-center">
              <span
                className="cursor-pointer h-min text-4xl"
                onClick={() => {
                  handleSkipPrevious();
                }}
              >
                <SkipPreviousIcon fontSize="inherit" />
              </span>
              {!isPlaying ? (
                <span className="cursor-pointer h-min text-5xl">
                  <PlayArrowIcon
                    fontSize="inherit"
                    onClick={() => {
                      handlePlayPause();
                    }}
                  />
                </span>
              ) : (
                <span className="cursor-pointer h-min text-5xl">
                  <PauseIcon
                    fontSize="inherit"
                    onClick={() => {
                      handlePlayPause();
                    }}
                  />
                </span>
              )}
              <span
                className="cursor-pointer h-min text-4xl"
                onClick={() => {
                  handleSkipNext();
                }}
              >
                <SkipNextIcon fontSize="inherit" />
              </span>
            </div>
            {/* <div className="flex  text-xs justify-center items-center">
              <Slider
                maxMs={currentTrack.duration_ms}
                currentMs={currentPositionMs}
              />
            </div> */}
          </div>
          <div className="flex justify-end cursor-pointer">
            <span
              className="cursor-pointer"
              onClick={() => {
                selectItem(currentTrack.id, currentTrack);
              }}
            >
             <GroupAddIcon />
            </span>
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <SpotifyPlayerMobile />
      </div>
    </>
  );
};

export default SpotifyPlayer;
