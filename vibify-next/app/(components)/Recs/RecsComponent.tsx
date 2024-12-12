"use client";
import { TopArtistsResponse, TopTracksResponse } from "@/app/types/spotify";
import RecModal from "./RecModal";

import { useState } from "react";
import CircleButton from "../Buttons/CircleButton";

import dynamic from "next/dynamic";

import RecFeed from "./Feed/RecFeed";

const AddIcon = dynamic(() => import("@mui/icons-material/Add"), {
  ssr: false,
});

interface RecsComponentProps {
  accessToken: string;
  userId: string;
  topArtists: TopArtistsResponse;
  topTracks: TopTracksResponse;
}
const RecsComponent = ({
  accessToken,
  userId,
  topArtists,
  topTracks,
}: RecsComponentProps) => {
  const [recommendModal, setRecommendModal] = useState(false);
  const handleModalToggle = () => {
    setRecommendModal((prev) => !prev);
  };

  return (
    <div className="h-full relative">
      {recommendModal ? (
        <>
          <RecModal
            handleModalToggle={handleModalToggle}
            userId={userId}
            topTracks={topTracks}
            topArtists={topArtists}
          />
        </>
      ) : (
        <RecFeed />
      )}
      <div className="fixed top-[20px] right-[20px] ">
        <CircleButton onClick={() => handleModalToggle()} size={40}>
          <AddIcon fontSize="medium" />
        </CircleButton>
      </div>
    </div>
  );
};

export default RecsComponent;
