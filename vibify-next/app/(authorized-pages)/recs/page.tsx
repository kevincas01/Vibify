"use client";
import Button from "@/app/(components)/Button";
import RecModal from "@/app/(components)/RecModal";
import {
  SpotifyUser,
  TopArtistsResponse,
  TopTracksResponse,
} from "@/app/types/spotify";

import { getSpotifyUserProfile, getUserTopWType } from "@/app/utils/spotify";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "@/app/utils/accessTokens";
const RecsPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [topArtists, setTopArtists] = useState<TopArtistsResponse | null>(null); // Use the TopArtistsResponse type
  const [topTracks, setTopTracks] = useState<TopTracksResponse | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      redirect("/"); // Redirect to login if no access token
    } else {
      setAccessToken(token); // Set the token in state if available
    }
  }, []);
  console.log('sdd')
  useEffect(() => {
    if (!accessToken) return;
    
    const fetchTopArtists = async () => {
      try {
        const result = await getUserTopWType(
          accessToken,
          "artists",
          "long_term",
          10
        );
        setTopArtists(result);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };
    const fetchTopSongs = async () => {
      try {
        const result = await getUserTopWType(
          accessToken,
          "tracks",
          "long_term",
          10
        );
        setTopTracks(result);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    fetchTopArtists();
    fetchTopSongs();

  }, [accessToken]);

  return (
    <div>
      <RecModal accessToken={accessToken || ""} topTracks={topTracks} topArtists={topArtists}/>
    </div>
  );
};

export default RecsPage;
