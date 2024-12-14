"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Album, Artist, Playlist, Track } from "../../types/spotify";
import { getSession, useSession } from "next-auth/react";
import {
  getPlaybackState,
  pausePlayback,
  startResumeTrackPlayback,
} from "../../utils/spotify";
import { toast } from "react-toastify";
import { showToast } from "./ToastProvider";
import { createRecommendation } from "../../utils/supabase";

interface RecommendContextProps {
  selectedId:string;
  selectedItem:Artist | Track | Album | Playlist | null;
  selectItem: (id: string, item: Artist | Track | Album | Playlist) => void;
  deselectItem: () => void;
  handleRecommendation: () => void;
  recommendationText: string;
  setRecommendationText: Dispatch<SetStateAction<string>>;
}

// Create the RecommendContext with default values
const RecommendContext = createContext<RecommendContextProps | undefined>(
  undefined
);

interface RecommendItemProviderProps {
  children: ReactNode;
}

// The provider component that wraps the app and provides state and actions
export const RecommendItemProvider: React.FC<RecommendItemProviderProps> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const accessToken = session?.user?.accessToken as string;
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<
    Artist | Track | Album | Playlist | null
  >(null);
  const [recommendationText, setRecommendationText] = useState<string>("");

  const selectItem = (id: string, item: Artist | Track | Album | Playlist) => {
    setSelectedId(id);
    setSelectedItem(item);
  };

  const deselectItem = () => {
    setSelectedId("");
    setRecommendationText("");
    setSelectedItem(null);
    setRecommendationText("");
  };

  const handleRecommendation = async () => {
    if (selectedItem && selectedItem == null) return;

    await createRecommendation(
      selectedItem?.type as string,
      selectedItem,
      selectedId,
      session?.user.userId as string,
      recommendationText
    );
    showToast("success", "Created recommendation");
  };

  return (
    <RecommendContext.Provider
      value={{
        selectedId,
        selectedItem,
        selectItem,
        deselectItem,
        handleRecommendation,
        recommendationText,
        setRecommendationText,
      }}
    >
      {children}
    </RecommendContext.Provider>
  );
};

// Custom hook to use the player context in any component
export const useRecommendItem = (): RecommendContextProps => {
  const context = useContext(RecommendContext);
  if (!context) {
    throw new Error(
      "useRecommendItem must be used within a RecommendItemProvider"
    );
  }
  return context;
};
