"use client";

import { Artist, TopTracksResponse, Track } from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import { getUserTopWType } from "@/app/utils/spotify";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface TracksComponentProps {
  accessToken: string;
  topTracks: TopTracksResponse;
}

const TracksComponent = ({ accessToken, topTracks }: TracksComponentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newTopTracks, setNewTopTracks] =
    useState<TopTracksResponse>(topTracks);
  const [trackLimit, setTrackLimit] = useState<number>(10);
  const [timeRange, setTimeRange] = useState<string>("short_term");

  const fetchTopTracks = async () => {
    setLoading(true);
    try {
      const result = await getUserTopWType(
        accessToken,
        "tracks",
        timeRange,
        trackLimit
      );
      setNewTopTracks(result); // Update state with the new tracks
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopTracks(); // Fetch new top tracks when timeRange or trackLimit changes
  }, [timeRange, trackLimit]);

  const handleTrackLimitChange = (limit: number) => {
    setTrackLimit(limit);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  interface TimeRangeProps {
    text: string;
    value: string;
  }

  interface TrackLimitProps {
    value: number;
  }

  const timeRangeElements: TimeRangeProps[] = [
    {
      text: "All time",
      value: "long_term",
    },
    {
      text: "Last 6 Months",
      value: "medium_term",
    },
    {
      text: "Last 4 weeks",
      value: "short_term",
    },
  ];

  const trackLimitElements: TrackLimitProps[] = [
    {
      value: 3,
    },
    {
      value: 5,
    },
    {
      value: 10,
    },
    {
      value: 20,
    },
    {
      value: 50,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mt-4">
        {timeRangeElements.map((element) => (
          <div key={element.value}>
            <button
              onClick={() => handleTimeRangeChange(element.value)}
              className={`p-2 ${
                timeRange === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
              aria-selected={timeRange === element.value}
            >
              {element.text}
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        {trackLimitElements.map((element) => (
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
          <h3>Top Tracks</h3>
          <div className="flex flex-wrap gap-2 mt-4 justify-between">
            {newTopTracks && (
              <div className="flex w-full  flex-col">
                <div className="flex gap-6 mt-4 flex-wrap justify-around">
                  {newTopTracks.items.map((song: Track, _: number) => (
                    <div key={song.id} className="flex gap-4 w-full md:w-[45%]">
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
                            {song.artists.map(
                              (artist: Artist, index: number) => (
                                <React.Fragment key={index}>
                                  {artist.name}
                                  {index < song.artists.length - 1 && " ~ "}
                                </React.Fragment>
                              )
                            )}
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TracksComponent;
