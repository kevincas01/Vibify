"use client";

import { Artist, TopArtistsResponse } from "@/app/types/spotify";
import { getUserTopWType } from "@/app/utils/spotify";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface ArtistsComponentProps {
  accessToken: string;
  topArtists: TopArtistsResponse;
}
const Artists = ({ accessToken, topArtists }: ArtistsComponentProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newTopArtists, setNewTopArtists] =
    useState<TopArtistsResponse>(topArtists);
  const [artistLimit, setArtistLimit] = useState<number>(10);
  const [timeRange, setTimeRange] = useState<string>("short_term");

  const fetchTopArtists = async () => {
    setLoading(true);
    try {
      const result = await getUserTopWType(
        accessToken,
        "artists",
        timeRange,
        artistLimit
      );
      setNewTopArtists(result); // Update state with the new tracks
    } catch (error) {
      console.error("Error fetching top tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopArtists(); // Fetch new top tracks when timeRange or artistLimit changes
  }, [timeRange, artistLimit]);

  const handleArtistLimitChange = (limit: number) => {
    setArtistLimit(limit);
  };
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };
  interface TimeRangeProps {
    text: string;
    value: string;
  }
  interface ArtistLimitProps {
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
  const artistLimitElements: ArtistLimitProps[] = [
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
    <div className="flex flex-col items-center w-full">
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
        {artistLimitElements.map((element) => (
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

      {loading ? (
        <div className="flex justify-center items-center mt-4 h-full">
          <div className="spinner">Loading...</div>{" "}
        </div>
      ) : (
        <div className="flex w-full flex-col mt-4">
          <h3>Top Artists</h3>
          <div className="flex flex-wrap gap-2 mt-4 justify-around">
            {newTopArtists?.items.map((artist: Artist) => (
              <div
                key={artist.id}
                className="flex flex-col items-center w-2/5 md:w-1/4 lg:w-1/6"
              >
                <div className="w-full aspect-square relative">
                  <Image
                    src={artist.images[0]?.url || ""}
                    alt={artist.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h5 className="text-center mt-2">{artist.name}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Artists;
