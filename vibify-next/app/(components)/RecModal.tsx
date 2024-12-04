"use client";
import React, { useState } from "react";
import {
  Artist,
  Track,
  TopTracksResponse,
  TopArtistsResponse,
  Album,
  Playlist,
} from "../types/spotify";

import SpotifySearch from "./SpotifySearch";
import { createRecommendation } from "../utils/supabase";
import RecsTrackComponent from "./Recs/RecsTrackComponent";
import RecsArtistComponent from "./Recs/RecsArtistComponent";
import RecsAlbumComponent from "./Recs/RecsAlbumComponent";
import RecsPlaylistComponent from "./Recs/RecsPlaylistComponent";
import CloseIcon from "@mui/icons-material/Close";
import DarkCircleButton from "./Buttons/DarkCircleButton";
interface RecModalProps {
  accessToken: string;
  topTracks: TopTracksResponse | null;
  topArtists: TopArtistsResponse | null; // You can add `topArtists` later if needed
}

const RecModal = ({ accessToken, topTracks, topArtists }: RecModalProps) => {
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
  interface recommentTypeElementsProps {
    value: string;
    text: string;
  }
  const recommentTypeElements: recommentTypeElementsProps[] = [
    {
      value: "track",
      text: "Tracks",
    },
    {
      value: "artist",
      text: "Artist",
    },
    {
      value: "album",
      text: "Album",
    },
    {
      value: "playlist",
      text: "Playlist",
    },
  ];

  const handleRecommendation = async () => {
    await createRecommendation(
      recommendType,
      selectedId,
      "ss",
      recommendationText
    );
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
        return null; // You can handle the case where the type is unknown or not passed
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {selectedItem ? (
        //An item is selected to be recommended
        <div className="relative ">
          <h2 className="text-main text-center">Recommend {recommendType} </h2>

          <div className="flex justify-center mt-[50px]">
            {renderSelectedItem(recommendType, selectedItem)}
          </div>
          <div className="absolute top-0 right-0">
            <DarkCircleButton onClick={deselectItem}>
              <CloseIcon />
            </DarkCircleButton>
          </div>
        </div>
      ) : (
        //The user needs to select an item to be recommended
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
                        ? " text-main border-b-2 border-b-main"
                        : "text-lightGray"
                    }`}
                    aria-selected={recommendType === element.value}
                  >
                    {element.text}
                  </button>
                </div>
              ))}{" "}
            </div>
          </div>

          {/* Conditional rendering based on the recommendType */}
          <div className="flex md:flex-row flex-col w-full justify-between md:gap-0 gap-10">
            {(recommendType === "track" || recommendType === "artist") && (
              <div className="flex box-border md:w-[48%] ">
                {recommendType === "track" && topTracks && (
                  <div className="w-full ">
                    <h3 className="text-main mt-[30px]">Your Top Tracks</h3>
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
                    <h3 className="text-main mt-[30px]">Your Top Artist</h3>
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

export default RecModal;
