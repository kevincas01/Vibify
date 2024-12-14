"use client";

import { Artist, TopArtistsResponse } from "@/app/types/spotify";
import { getUserTopWType } from "@/app/utils/spotify";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  limitElements,
  timeRangeElements,
  defaultArtistLimit,
  defaultArtistTimeRange,
} from "../types/filters";
import useSWR from "swr";
import LoadingArtists from "./Loading/LoadingArtists";
import ArtistItem from "./SpotifyItems/ArtistItem";
interface ArtistsComponentProps {
  accessToken: string;
}
const Artists = ({ accessToken }: ArtistsComponentProps) => {
  const [artistTimeRange, setArtistTimeRange] = useState<string>(
    defaultArtistTimeRange
  );
  const [artistLimit, setArtistLimit] = useState<number>(defaultArtistLimit);

  const artistKey = `artists ` + artistTimeRange + " " + artistLimit;
  const {
    data: artistsData,
    error: artistsDataError,
    isLoading: artistsDataLoading,
    mutate,
  } = useSWR(artistKey, () =>
    getUserTopWType(accessToken, "artists", artistTimeRange, artistLimit)
  );

  const handleArtistLimitChange = (limit: number) => {
    setArtistLimit(limit);
    mutate();
  };

  const handleTimeRangeChange = (range: string) => {
    setArtistTimeRange(range);
    mutate();
  };

  return (
    <div className="flex flex-col items-center w-full  mb-[50px]">
      <div className="flex gap-4 mt-4">
        {timeRangeElements.map((element) => (
          <div key={element.value}>
            <button
              onClick={() => handleTimeRangeChange(element.value)}
              className={`p-2 ${
                artistTimeRange === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
              aria-selected={artistTimeRange === element.value}
            >
              {element.text}
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        {limitElements.map((element) => (
          <div key={element.value}>
            <button
              onClick={() => handleArtistLimitChange(element.value)}
              className={`p-2 ${
                artistLimit === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
              aria-selected={artistLimit === element.value}
            >
              {element.value}
            </button>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col mt-4">
        <h3>Top Artists</h3>
        {artistsDataLoading ? (
          <div className="flex flex-wrap gap-2 mt-4 justify-around">
            <LoadingArtists count={artistLimit} />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mt-4 justify-around">
              {artistsData?.items.map((artist: Artist) => (
                <div
                  key={artist.id}
                  className="flex flex-col items-center w-2/5 md:w-1/4 lg:w-1/6"
                >
                  <ArtistItem artist={artist}/>
                </div>
              ))}
            </div>
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default Artists;
