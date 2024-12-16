"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Track } from "../types/spotify";
import { useSession } from "next-auth/react";
import {
  getPlaybackState,
  pausePlayback,
  skipNextPlayback,
  skipPreviousPlayback,
  startResumeTrackPlayback,
} from "../utils/spotify";
import { showToast } from "../(components)/Providers/ToastProvider";

interface TrackContextProps {
  currentTrack: Track | null;
  currentPositionMs: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  handleStartPlay: (track: Track) => void;
  handlePlayPause: () => void;
  handleSkipNext: () => void;
  handleSkipPrevious: () => void;
}

// Create the TrackContext with default values
const TrackContext = createContext<TrackContextProps | undefined>(undefined);

interface TrackProviderProps {
  children: ReactNode;
}

// The provider component that wraps the app and provides state and actions
export const TrackProvider: React.FC<TrackProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentPositionMs, setCurrentPositionMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const accessToken = session?.user?.accessToken as string;

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
      if (!accessToken) {
        showToast("warning", "You need to log in.");
        return;
      }

      const playbackState = await handleGetPlaybackState();
      if (!playbackState) {
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
      showToast("error", error.message);
    }
  };

  const handlePlayPause = async () => {
    try {
      if (!accessToken) {
        showToast("warning", "You need to log in.");
        return;
      }

      const playbackState = await handleGetPlaybackState();
      if (!playbackState) {
        return null;
      }

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
        await pausePlayback(accessToken);
      }
    } catch (error: any) {
      showToast("error", error.message);
    }
  };

  const handleSkipNext = async () => {
    try {
      if (!accessToken) {
        showToast("warning", "You need to log in.");
        return;
      }
  
      const playbackState = await handleGetPlaybackState();
      if (!playbackState) {
        showToast("warning", "No active playback. Play a song to connect a device.");
        return;
      }
  
      await skipNextPlayback(accessToken);
      await handleGetPlaybackState(); // Sync state after skipping
    } catch (error: any) {
      showToast("error", "Failed to skip to the next track.");
      console.error(error);
    }
  };

  const handleSkipPrevious = async () => {
    try {
      if (!accessToken) {
        //handle no access token
        //redirect the user to login?
      }
      const playbackState = handleGetPlaybackState();
      if (!playbackState) {
        return null;
      }
      await skipPreviousPlayback(accessToken);
      await handleGetPlaybackState(); 
    } catch (error) {}
  };

  const handleGetPlaybackState = async () => {
    try {
      const playbackState = await getPlaybackState(accessToken);
      if (!playbackState) {
        setCurrentTrack(null);
        setIsPlaying(false);
        showToast("warning", "Play a song on Spotify to connect a device.");
        return null;
      }

      console.log(playbackState)
      setIsPlaying(playbackState.is_playing);
      setCurrentTrack(playbackState.item);
      setCurrentPositionMs(playbackState.progress_ms);
      return playbackState;
    } catch (error) {
      console.error("Failed to fetch playback state", error);
      showToast("error", "Unable to fetch playback state.");
      return null;
    }
  };

  useEffect(() => {
    const fetchPlayback = async () => {
      if (!accessToken) return;

      try {
        const playbackState = await handleGetPlaybackState();
        if (!playbackState) {
          return null;
        }
      } catch (error: any) {
        console.error("Failed to fetch playback state", error);
      }
    };

    fetchPlayback();
  }, [accessToken]);

  return (
    <TrackContext.Provider
      value={{
        currentTrack,
        currentPositionMs,
        isPlaying,
        play,
        pause,
        handleStartPlay,
        handlePlayPause,
        handleSkipNext,
        handleSkipPrevious,
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
    throw new Error("useTrackInfo must be used within a TrackProvider");
  }
  return context;
};
