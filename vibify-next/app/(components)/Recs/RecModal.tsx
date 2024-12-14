"use client";
import {
  Artist,
  TopArtistsResponse,
  TopTracksResponse,
  Track,
} from "@/app/types/spotify";

import React, { useState } from "react";
import CircleButton from "../Buttons/CircleButton";

import dynamic from "next/dynamic";
import RecsArtistComponent from "./RecModal/RecsArtistComponent";
import RecsTrackComponent from "./RecModal/RecsTrackComponent";

import SpotifySearch from "./SpotifySearch";
import { recommentTypeElements } from "@/app/types/filters";
import { useRecommendItem } from "../Providers/RecommendItemProvider";

const CloseIcon = dynamic(() => import("@mui/icons-material/Close"), {
  ssr: false,
});

interface RecModalProps {
  handleModalToggle: () => void;
  userId: string;
  topTracks: TopTracksResponse | null;
  topArtists: TopArtistsResponse | null;
}

const RecModal = ({
  handleModalToggle,
  topTracks,
  topArtists,
}: RecModalProps) => {
  const { selectItem } = useRecommendItem();
  const [recommendType, setRecommendType] = useState<string>("track");

  // Show nothing until topTracks or topArtists are available
  if (!topArtists && !topTracks) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 relative md:mb-[50px]">
      <div className="fixed top-[20px] right-[20px] ">
        <CircleButton onClick={() => handleModalToggle()} size={40} dark={true}>
          <CloseIcon />
        </CircleButton>
      </div>

      <div className="text-center">
        <h2 className="text-main">Recommend </h2>
        <div className="flex gap-4 mt-4 justify-center">
          {recommentTypeElements.map((element) => (
            <div key={element.value}>
              <button
                onClick={() => setRecommendType(element.value)}
                className={`p-2 ${
                  recommendType === element.value
                    ? "text-main border-b-2 border-b-main"
                    : "text-lightGray"
                }`}
                aria-selected={recommendType === element.value}
              >
                {element.text}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Conditional rendering based on the recommendType */}
      <div className="flex md:flex-row flex-col w-full justify-between md:gap-0 gap-10">
        {(recommendType === "track" || recommendType === "artist") && (
          <div className="flex box-border md:w-[48%]">
            {recommendType === "track" && topTracks && (
              <div className="w-full">
                <h3 className="text-main md:mt-[30px]">Your Top Tracks</h3>
                <div className="flex w-full flex-col mt-4">
                  <ul className="flex flex-col gap-4">
                    {topTracks.items.map((track: Track) => (
                      <RecsTrackComponent
                        key={track.id}
                        track={track}
                        onClick={selectItem}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {recommendType === "artist" && topArtists && (
              <div>
                <h3 className="text-main md:mt-[30px]">Your Top Artist</h3>
                <div className="flex flex-wrap gap-2 mt-4 justify-around">
                  {topArtists?.items.map((artist: Artist) => (
                    <RecsArtistComponent
                      key={artist.id}
                      artist={artist}
                      onClick={selectItem}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div
          className={`flex box-border md:w-[48%] ${
            recommendType === "artist" || recommendType === "track"
              ? ""
              : "flex-1"
          }`}
        >
          <SpotifySearch recommendType={recommendType} />
        </div>
      </div>
    </div>
  );
};
{
  /* TODO comments table

we store the id pof the recommendations as a foreign key referencing recommendations table
store the user spotify_id of the commentor as a foreign key referencing user table
store the text they want to save 
created_at


*/
}
export default RecModal;
