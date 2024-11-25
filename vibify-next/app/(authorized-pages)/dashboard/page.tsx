"use client";

import React, { useEffect, useState } from "react";
import { getProfile, getUserTopWType } from "../../utils/spotify"; // Function to fetch profile from Spotify
import { getAccessToken } from "../../utils/accessTokens"; // Function to get the access token
import { redirect } from "next/navigation"; // For redirecting to the login page if no token
import Image from "next/image";
import { Artist, SpotifyUser, TopArtistsResponse } from "@/app/types/spotify";

const ProfilePage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<SpotifyUser | null>(null); // Use the SpotifyUser type
  const [loading, setLoading] = useState<boolean>(false);
  const [topArtists, setTopArtists] = useState<TopArtistsResponse | null>(null); // Use the TopArtistsResponse type

  // Fetch the access token when the component mounts
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

    const fetchProfile = async () => {
      try {
        const result = await getProfile(accessToken);
        setProfile(result);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    const fetchTopArtists = async () => {
      try {
        const result = await getUserTopWType(accessToken, "artists", 10);
        setTopArtists(result);
        console.log("Top artists:", result);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    fetchProfile();
    fetchTopArtists();

    setLoading(false);
  }, [accessToken]);

  return (
    <div>
      {profile && !loading && (
        <div className="w-full flex flex-col justify-center items-center h-[500px]">
          <div className="profile-image">
            <Image
              className="rounded-full"
              alt="Profile Picture"
              src={profile.images[0].url}
              height={150}
              width={150}
            />
          </div>
          <h1>{profile.display_name}</h1>
          <p>
            <strong>Followers:</strong> {profile.followers.total}
          </p>
        </div>
      )}

      <div className="flex gap-20px">
        {topArtists && (
          <div>
            <h3>Top Artists</h3>
            <ul className="flex flex-col gap-4 mt-4">
              {topArtists.items.map((artist: Artist, index: number) => (
                <li key={artist.id} className="flex items-center gap-4">
                  {/* <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <h4>{artist.name}</h4>
                  {/* </a> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {!profile && !loading && <p>No profile data found.</p>}
    </div>
  );
};

export default ProfilePage;
