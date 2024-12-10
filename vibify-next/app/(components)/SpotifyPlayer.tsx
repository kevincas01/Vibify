import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Artist, Track } from "../types/spotify";
import Image from "next/image";
import {
  getAvailableDevices,
  getPlaybackState,
  pausePlayback,
  startResumeTrackPlayback,
} from "../utils/spotify";
import { getSession } from "next-auth/react";
import { SpotifyAPI } from "../utils/clients/spotify";

interface SpotifyPlayerProps {
  track: Track;
  list?: Track[];
}

const SpotifyPlayer = ({ track }: SpotifyPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceId, setDeviceId] = useState("");

  // Function to handle track play
  const handleTrackPlay = async (uri: string, device: string) => {
    const session = await getSession();
    const accessToken = session?.user.accessToken as string;
    console.log(device);
    await startResumeTrackPlayback(accessToken, undefined, [uri], device);
    setIsPlaying(true); // Set isPlaying to true when track is played
  };


  const handlePlayPause = async () => {
    const session = await getSession();
    const accessToken = session?.user.accessToken as string;

    const playbackState = await getPlaybackState(accessToken);
    if (!playbackState.is_playing) {
      await startResumeTrackPlayback(
        accessToken,
        undefined,
        undefined,
        undefined
      );
      setIsPlaying(true)
    } else {
      pausePlayback(accessToken);
      setIsPlaying(false)
    }
  };

  // Function to fetch the playback state and handle devices
  useEffect(() => {
    const handleDevices = async () => {
      const session = await getSession();
      const accessToken = session?.user.accessToken as string;

      const playbackState = await getPlaybackState(accessToken);
      console.log(playbackState);

      const device = playbackState.device.id;
      setDeviceId(device);

      if (playbackState.is_playing && playbackState.item.id !== track.id) {
        // If playback is already happening on another track, switch to the new track
        setIsPlaying(true);
        handleTrackPlay(track.uri, device);
      } else if (!playbackState.is_playing) {
        // If nothing is playing, start the track
        handleTrackPlay(track.uri, device);
      }
    };

    handleDevices();
  }, [track.uri]); // Depend on track.uri to handle new tracks

  return (
    <div className="w-full md:pl-[108px] bg-grayBg py-4 px-2 fixed bottom-0 left-0 m-auto md:z-10 z-30">
      <div className="grid md:grid-cols-3 items-center grid-cols-2">
        <div className="flex flex-col gap-4">
          <li key={track.id} className="flex gap-4 w-full">
            <Image
              src={track.album.images[0].url}
              alt={track.name}
              width={50}
              height={50}
            />
            <div className="flex justify-between gap-2 w-full min-w-0">
              <div className="flex flex-col min-w-0">
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {track.name}
                </p>
                <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                  {track.artists.map((artist: Artist, index: number) => (
                    <React.Fragment key={index}>
                      {artist.name}
                      {index < track.artists.length - 1 && " ~ "}
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
