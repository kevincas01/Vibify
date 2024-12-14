"use client";

import { Track } from "@/app/types/spotify";
import { getUserTopWType } from "@/app/utils/spotify";

import React, {  useState } from "react";
import {
  defaultTrackLimit,
  defaultTrackTimeRange,
  limitElements,
  timeRangeElements,
} from "../types/filters";
import useSWR from "swr";
import LoadingTracks from "./Loading/LoadingTracks";
import { useTrackInfo } from "../context/player";
import TrackItem from "./SpotifyItems/TrackItem";

interface TracksComponentProps {
  accessToken: string;
}

const TracksComponent = ({ accessToken }: TracksComponentProps) => {
  const [trackTimeRange, setTimeRange] = useState<string>(
    defaultTrackTimeRange
  );
  const [trackLimit, setTrackLimit] = useState<number>(defaultTrackLimit);

  const { handleStartPlay } = useTrackInfo();

  const trackKey = `tracks ` + trackTimeRange + " " + trackLimit;
  const {
    data: tracksData,
    error: tracksDataError,
    isLoading: tracksDataLoading,
    mutate,
  } = useSWR(trackKey, () =>
    getUserTopWType(accessToken, "tracks", trackTimeRange, trackLimit)
  );

  const handleTrackLimitChange = (limit: number) => {
    setTrackLimit(limit);
    mutate();
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    mutate();
  };

  return (
    <div className="flex flex-col items-center w-full mb-[50px]">
      {/*  Time Range Elements Selector */}
      <div className="flex gap-4 mt-4">
        {timeRangeElements.map((element) => (
          <div key={element.value}>
            <button
              onClick={() => handleTimeRangeChange(element.value)}
              className={`p-2 ${
                trackTimeRange === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
              aria-selected={trackTimeRange === element.value}
            >
              {element.text}
            </button>
          </div>
        ))}
      </div>
      {/*  Limit Elements Selector */}
      <div className="flex gap-4 mt-4">
        {limitElements.map((element) => (
          <div key={element.value}>
            <button
              onClick={() => handleTrackLimitChange(element.value)}
              className={`p-2 ${
                trackLimit === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
              aria-selected={trackLimit === element.value}
            >
              {element.value}
            </button>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col mt-4">
        <h3 className="mb-4">Top Tracks</h3>
        {tracksDataLoading ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
            <LoadingTracks count={trackLimit} />
          </div>
        ) : (
          <>
            {tracksData && (
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
                {tracksData.items.map((track: Track, _: number) => (
                  <div
                    onClick={() => {
                      handleStartPlay(track);
                    }}
                    key={track.id}
                    className="grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer hover:text-main hover:bg-lightGrayBg"
                  >
                    <TrackItem track={track} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default TracksComponent;
