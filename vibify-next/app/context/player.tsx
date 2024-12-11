"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Track } from "../types/spotify";
import { getSession } from "next-auth/react";
import {
  getPlaybackState,
  pausePlayback,
  startResumeTrackPlayback,
} from "../utils/spotify";
import { toast } from "react-toastify";

interface TrackContextProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  updateCurrentTrack: (track: Track) => void;
  handleStartPlay: (track: Track) => void;
  handlePlayPause: () => void;
}

// Create the TrackContext with default values
const TrackContext = createContext<TrackContextProps | undefined>(undefined);

interface TrackProviderProps {
  children: ReactNode;
}

// The provider component that wraps the app and provides state and actions
export const TrackProvider: React.FC<TrackProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = () => {
    if (currentTrack) {
      setIsPlaying(true);
    }
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const handleStartPlay = async (track: Track) => {
    try {
      const session = await getSession();
      const accessToken = session?.user.accessToken as string;

      const playbackState = await getPlaybackState(accessToken);
      if (playbackState === null) {
        setCurrentTrack(null);
        setIsPlaying(false);
        console.log("you need to connect your app first before playing");
        // TODO Handle toastify message to open and play on the app first
        return null;
      }

      await startResumeTrackPlayback(
        accessToken,
        undefined,
        [track.uri],
        undefined
      );

      setCurrentTrack(track);
      setIsPlaying(true);
    } catch (error: any) {
      console.log("skhdksjd toastingg");
      // Handle the error (e.g., display a message to the user, log the error, etc.)
      toast(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handlePlayPause = async () => {
    try {
      const session = await getSession();
      const accessToken = session?.user.accessToken as string;

      const playbackState = await getPlaybackState(accessToken);
      if (!playbackState.is_playing) {
        play();
        await startResumeTrackPlayback(
          accessToken,
          undefined,
          undefined,
          undefined
        );
      } else {
        pause();
        pausePlayback(accessToken);
      }
    } catch (error: any) {
      console.log("ffff toastingg");
      // Handle the error (e.g., display a message to the user, log the error, etc.)
      toast(error.message);
    }
  };

  const updateCurrentTrack = (track: Track) => {
    handleStartPlay(track);
  };

  useEffect(() => {
    const fetchPlayback = async () => {
      const session = await getSession();
      const accessToken = session?.user.accessToken as string;

      const playbackState = await getPlaybackState(accessToken);
      if (!playbackState) return null;

      setIsPlaying(playbackState.is_playing);
      setCurrentTrack(playbackState.item);
    };
    fetchPlayback();
  }, []);

  return (
    <TrackContext.Provider
      value={{
        currentTrack,
        isPlaying,
        play,
        pause,
        updateCurrentTrack,
        handleStartPlay,
        handlePlayPause,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

// Custom hook to use the player context in any component
export const useTrackInfo = (): TrackContextProps => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error("usePlayer must be used within a TrackProvider");
  }
  return context;
};
