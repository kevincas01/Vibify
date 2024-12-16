"use client";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Artist } from "../types/spotify";
import Image from "next/image";

import { useTrackInfo } from "../context/player";
import { useRecommendItem } from "./Providers/RecommendItemProvider";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Drawer } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
interface SpotifyPlayerMobileProps {}

const SpotifyPlayerMobile = ({}: SpotifyPlayerMobileProps) => {
  const { selectItem } = useRecommendItem();
  // const [deviceId, setDeviceId] = useState("");
  const { currentTrack, isPlaying, handlePlayPause } = useTrackInfo();

  const [playerToggled, setPlayerToggled] = useState(false);
  const handlePlayerToggle = () => {
    setPlayerToggled((prev) => !prev);
  };

  if (currentTrack === null) return null;

  return (
    <>
      <div className="w-full bg-black fixed bottom-[75px]  left-0 m-auto z-30 h-[50px] ">
        <div
          className="grid items-center grid-cols-[auto_1fr_auto]  gap-4 px-4 justify-center h-full cursor-pointer"
          onClick={handlePlayerToggle}
        >
          <div className="relative w-[35px] h-[35px]">
            {currentTrack.album.images &&
            currentTrack.album.images.length > 0 ? (
              <Image
                src={currentTrack.album.images[0].url}
                alt={currentTrack.name}
                fill
                objectFit="cover"
                sizes="50px"
                id="currentTrackImage"
              />
            ) : (
              <Image
                src={"/NoImage.png"}
                alt={currentTrack.name}
                fill
                objectFit="cover"
                sizes="50px"
              />
            )}
          </div>
          <div className="flex justify-between gap-2  min-w-0">
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
          <div className="flex gap-4 text-2xl">
            <span className=" cursor-pointer">
              <OpenInFullIcon fontSize="inherit" />
            </span>
            {!isPlaying ? (
              <span
                className=" cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
              >
                <PlayArrowIcon fontSize="inherit" />
              </span>
            ) : (
              <span
                className=" cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
              >
                <PauseIcon fontSize="inherit" />
              </span>
            )}
          </div>
        </div>
        <Drawer
          anchor={"bottom"}
          open={playerToggled}
          onClose={handlePlayerToggle}
        >
          <div
            className="w-screen h-screen p-6"
            style={{
              transition: "background-color 0.3s ease", // Smooth transition
            }}
          >
            <span
              onClick={handlePlayerToggle}
              className="text-2xl cursor-pointer"
            >
              <CloseFullscreenIcon fontSize="inherit" />
            </span>
            <div className="flex flex-1 w-full h-[70vh] ">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden m-auto max-w-[500px]">
                <Image
                  src={currentTrack.album.images[0].url}
                  alt={currentTrack.name}
                  fill
                  id="currentTrackImage"
                />
              </div>
            </div>
            <div className="w-full min-w-0">
              <div className="flex flex-col min-w-0 ">
                <p className="text-ellipsis overflow-hidden whitespace-nowrap text-3xl">
                  {currentTrack.name}
                </p>
                <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap text-3xl">
                  {currentTrack.artists.map((artist: Artist, index: number) => (
                    <React.Fragment key={index}>
                      {artist.name}
                      {index < currentTrack.artists.length - 1 && " ~ "}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-around text-6xl">
              <SkipPreviousIcon fontSize="inherit" />

              {!isPlaying ? (
                <span className="cursor-pointer">
                  <PlayArrowIcon
                    fontSize="inherit"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent div click
                      handlePlayPause();
                    }}
                  />
                </span>
              ) : (
                <span className="cursor-pointer">
                  <PauseIcon
                    fontSize="inherit"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent div click
                      handlePlayPause();
                    }}
                  />
                </span>
              )}
              <SkipNextIcon fontSize="inherit" />
            </div>
            <div className="flex w-full justify-around text-4xl">
              <span
                className="cursor-pointer"
                
                onClick={() => {
                  selectItem(currentTrack.id, currentTrack);
                }}
              >
                <GroupAddIcon fontSize="inherit"/>
              </span>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default SpotifyPlayerMobile;
