"use client";

import { Artist, TopTracksResponse, Track } from "@/app/types/spotify";
import { getAccessToken } from "@/app/utils/accessTokens";
import { convertDuration } from "@/app/utils/misc";
import { getUserTopWType } from "@/app/utils/spotify";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Tracks = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [topTracks, setTopTracks] = useState<TopTracksResponse | null>(null); // Use the TopTracksResponse type

  const [artistLimit, setArtistLimit] = useState<number>(10);
  const [timeRange, setTimeRange] = useState<string>("short_term"); // Default is "short_term" (last 4 weeks)

  console.log(topTracks);
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      console.log("No token, redirecting to login");
      redirect("/"); // Redirect to login if no access token
    } else {
      console.log("Token found, setting accessToken");
      setAccessToken(token); // Set the token in state if available
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);

    const fetchTopTracks = async () => {
      try {
        const result = await getUserTopWType(
          accessToken,
          "tracks",
          timeRange,
          artistLimit
        );
        setTopTracks(result);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, [accessToken, timeRange, artistLimit]); // Fetch top artists whenever timeRange changes

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
          <h3>Top Tracks</h3>
          <div className="flex flex-wrap gap-2 mt-4 justify-between">
            {topTracks && (
              <div className="flex w-full  flex-col">
                <div className="flex gap-6 mt-4 flex-wrap justify-around">
                  {topTracks.items.map((song: Track, _: number) => (
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
                                <>
                                  {artist.name}
                                  {index < song.artists.length - 1 && " ~ "}
                                </>
                              )
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-lightGray">{convertDuration(song.duration_ms)}</p>
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

export default Tracks;
