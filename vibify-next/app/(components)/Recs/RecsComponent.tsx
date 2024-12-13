"use client";
import { TopArtistsResponse, TopTracksResponse } from "@/app/types/spotify";
import RecModal from "./RecModal";

import { useState } from "react";


import RecFeed from "./Feed/RecFeed";

interface RecsComponentProps {
  userId: string;
  topArtists: TopArtistsResponse;
  topTracks: TopTracksResponse;
}
const RecsComponent = ({
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
        <RecFeed handleModalToggle={handleModalToggle}/>
      )}
      
    </div>
  );
};

export default RecsComponent;
