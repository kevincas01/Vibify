"use client";
import {
  Album,
  Artist,
  Playlist,
  TopArtistsResponse,
  TopTracksResponse,
  Track,
} from "@/app/types/spotify";
import { createRecommendation } from "@/app/utils/supabase";
import React, { useState } from "react";
import DarkCircleButton from "../Buttons/DarkCircleButton";
import Button from "../Buttons/Button";

// Use Next.js dynamic imports with suspense
import dynamic from "next/dynamic";
import LoadingScreen from "../LoadingScreen";

const CloseIcon = dynamic(() => import("@mui/icons-material/Close"), {
  ssr: false,
});

const RecsArtistComponent = dynamic(() => import("./RecsArtistComponent"), {
  loading: () => <LoadingScreen />,
});
const RecsTrackComponent = dynamic(() => import("./RecsTrackComponent"), {
  loading: () => <LoadingScreen />,
});
const RecsAlbumComponent = dynamic(() => import("./RecsAlbumComponent"), {
  loading: () => <LoadingScreen />,
});
const RecsPlaylistComponent = dynamic(() => import("./RecsPlaylistComponent"), {
  loading: () => <LoadingScreen />,
});
const SpotifySearch = dynamic(() => import("./SpotifySearch"), {
  loading: () => <LoadingScreen />,
});

interface RecModalProps {
  handleModalToggle: () => void;
  profileId: string;
  accessToken: string;
  topTracks: TopTracksResponse | null;
  topArtists: TopArtistsResponse | null;
}

const RecModal = ({
  handleModalToggle,
  profileId,
  accessToken,
  topTracks,
  topArtists,
}: RecModalProps) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<
    Artist | Track | Album | Playlist | null
  >(null);
  const [recommendType, setRecommendType] = useState<string>("track");
  const [recommendationText, setRecommendationText] = useState<string>("");

  const selectItem = (id: string, item: Artist | Track | Album | Playlist) => {
    setSelectedId(id);
    setSelectedItem(item);
  };

  const deselectItem = () => {
    setSelectedId("");
    setSelectedItem(null);
  };

  const recommentTypeElements: { value: string; text: string }[] = [
    { value: "track", text: "Tracks" },
    { value: "artist", text: "Artist" },
    { value: "album", text: "Album" },
    { value: "playlist", text: "Playlist" },
  ];

  const handleRecommendation = async () => {
    await createRecommendation(
      recommendType,
      selectedItem,
      selectedId,
      profileId,
      recommendationText
    );
    handleModalToggle();
    deselectItem();
  };

  const renderSelectedItem = (
    type: string,
    item: Artist | Track | Album | Playlist
  ) => {
    switch (type) {
      case "artist":
        return (
          <RecsArtistComponent
            artist={item as Artist}
            selected={selectedId === item.id}
          />
        );
      case "track":
        return (
          <RecsTrackComponent
            track={item as Track}
            selected={selectedId === item.id}
          />
        );
      case "album":
        return (
          <RecsAlbumComponent
            album={item as Album}
            selected={selectedId === item.id}
          />
        );
      case "playlist":
        return (
          <RecsPlaylistComponent
            playlist={item as Playlist}
            selected={selectedId === item.id}
          />
        );
      default:
        return null;
    }
  };

  // Show nothing until topTracks or topArtists are available
  if (!topArtists && !topTracks) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="absolute top-0 right-0">
        <DarkCircleButton onClick={() => handleModalToggle()}>
          <CloseIcon />
        </DarkCircleButton>
      </div>

      {selectedItem ? (
        // An item is selected to be recommended
        <div className="relative h-full">
          <div className="absolute top-0 right-0">
            <DarkCircleButton onClick={deselectItem}>
              <CloseIcon />
            </DarkCircleButton>
          </div>
          <h2 className="text-main text-center">Recommend {recommendType} </h2>

          <div className="flex flex-col justify-between gap-4 sticky bottom-0">
            <div className="flex justify-center mt-[50px]">
              {renderSelectedItem(recommendType, selectedItem)}
            </div>
            <div className="flex flex-col items-center gap-4 sticky bottom-0">
              <h3 className="w-full">Leave a message </h3>
              <textarea
                rows={5}
                value={recommendationText}
                onChange={(e) => setRecommendationText(e.target.value)}
              />
              <Button onClick={handleRecommendation}>
                Share Recommendation
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // The user needs to select an item to be recommended
        <>
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
                            selected={selectedId === track.id}
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
                          selected={selectedId === artist.id}
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
              <SpotifySearch
                accessToken={accessToken}
                recommendType={recommendType}
                selectedId={selectedId}
                selectItem={selectItem}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
{/* TODO comments table

we store the id pof the recommendations as a foreign key referencing recommendations table
store the user spotify_id of the commentor as a foreign key referencing user table
store the text they want to save 
created_at


*/}
export default RecModal;
