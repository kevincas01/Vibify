"use client";

import { Artist, TopTracksResponse, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import { getUserTopWType } from "@/app/utils/spotify";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  defaultTrackLimit,
  defaultTrackTimeRange,
  limitElements,
  timeRangeElements,
} from "../types/filters";

interface TracksComponentProps {
  accessToken: string;
  topTracks: TopTracksResponse;
}

const TracksComponent = ({ accessToken, topTracks }: TracksComponentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newTopTracks, setNewTopTracks] =
    useState<TopTracksResponse>(topTracks);
  const [trackTimeRange, setTimeRange] = useState<string>(
    defaultTrackTimeRange
  );
  const [trackLimit, setTrackLimit] = useState<number>(defaultTrackLimit);

  const fetchTopTracks = async (range: string, limit: number) => {
    setLoading(true);
    try {
      const result = await getUserTopWType(accessToken, "tracks", range, limit);
      setNewTopTracks(result); // Update state with the new tracks
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackLimitChange = (limit: number) => {
    setTrackLimit(limit);
    fetchTopTracks(trackTimeRange, limit);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    fetchTopTracks(range, trackLimit);
  };

  interface TimeRangeProps {
    text: string;
    value: string;
  }

  interface TrackLimitProps {
    value: number;
  }

  return (
    <div className="flex flex-col items-center w-full">
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

      {loading ? (
        <div className="flex justify-center items-center mt-4 h-full">
          <div className="spinner">Loading...</div>
        </div>
      ) : (
        <div className="flex w-full flex-col mt-4">
          <h3 className="mb-4">Top Tracks</h3>

          {newTopTracks && (
            <div className="grid grid-cols-2 gap-8 w-full">
              {newTopTracks.items.map((song: Track, _: number) => (
                <div key={song.id} className="flex gap-4 w-full">
                  <Image
                    src={song.album.images[0].url}
                    alt={song.name}
                    width={75}
                    height={75}
                  />
                  <div className="flex justify-between gap-2 w-full min-w-0">
                    <div className="flex flex-col min-w-0">
                      <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {song.name}
                      </p>
                      <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                        {song.artists.map((artist: Artist, index: number) => (
                          <React.Fragment key={index}>
                            {artist.name}
                            {index < song.artists.length - 1 && " ~ "}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                    <div>
                      <p className="text-lightGray">
                        {convertDuration(song.duration_ms)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TracksComponent;
