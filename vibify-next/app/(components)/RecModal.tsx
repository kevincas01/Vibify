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
import Image from "next/image";
import { convertDuration } from "../utils/misc";
import SpotifySearch from "./SpotifySearch";

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

  const selectOption = (
    id: string,
    item: Artist | Track | Album | Playlist
  ) => {
    setSelectedId(id);
    setSelectedItem(item);
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
  return (
    <div className="flex flex-col gap-4">
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
                      <li
                        key={track.id}
                        className={`flex gap-4 w-full cursor-pointer ${
                          selectedId === track.id ? "text-main" : ""
                        }`}
                        onClick={() => selectOption(track.id, track)} // Set the selected track ID
                        style={{
                          transition: "background-color 0.3s ease", // Smooth transition for highlight
                        }}
                      >
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
                              {track.artists.map(
                                (artist: Artist, index: number) => (
                                  <React.Fragment key={index}>
                                    {artist.name}
                                    {index < track.artists.length - 1 && " ~ "}
                                  </React.Fragment>
                                )
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-lightGray">
                              {convertDuration(track.duration_ms)}
                            </p>
                          </div>
                        </div>
                      </li>
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
                    <div
                      key={artist.id}
                      className={`flex flex-col items-center w-2/5 md:w-1/4  cursor-pointer ${
                        selectedId === artist.id ? "text-main" : ""
                      }`}
                      onClick={() => selectOption(artist.id, artist)}
                      style={{
                        transition: "background-color 0.3s ease", // Smooth transition for highlight
                      }}
                    >
                      {artist.images.length > 0 && (
                        <div className="w-full aspect-square relative">
                          <Image
                            src={artist.images[0]?.url || ""}
                            alt={artist.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}

                      <h5 className="text-center mt-2">{artist.name}</h5>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

<div className={`flex box-border md:w-[48%] ${recommendType === "artist" || recommendType === "track" ? "" : "flex-1"}`}>
          <SpotifySearch
            accessToken={accessToken}
            recommendType={recommendType}
            selectedId={selectedId}
            selectOption={selectOption}
          />
        </div>
      </div>
    </div>
  );
};

export default RecModal;
