"use client";

import React, { useEffect, useState } from "react";
import { getSpotifyUserProfile, getUserTopWType } from "../../utils/spotify";
import { getAccessToken } from "../../utils/accessTokens";
import { redirect } from "next/navigation";
import Image from "next/image";
import {
  Artist,
  SpotifyUser,
  TopArtistsResponse,
  TopTracksResponse,
  Track,
} from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import DarkButton from "@/app/(components)/DarkButton";

const ProfilePage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<SpotifyUser | null>(null); // Use the SpotifyUser type
  const [loading, setLoading] = useState<boolean>(false);
  const [topArtists, setTopArtists] = useState<TopArtistsResponse | null>(null); // Use the TopArtistsResponse type
  const [topSongs, setTopSongs] = useState<TopTracksResponse | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      redirect("/"); // Redirect to login if no access token
    } else {
      setAccessToken(token); // Set the token in state if available
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);

    const fetchProfile = async () => {
      try {
        const result = await getSpotifyUserProfile(accessToken);
        setProfile(result);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
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
        setTopSongs(result);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    fetchProfile();
    fetchTopArtists();
    fetchTopSongs();

    setLoading(false);
  }, [accessToken]);

  const handleLogout = () => {
    localStorage.clear();
    // sessionStorage.clear();

    redirect("/");
  };
  return (
    <div>
      {profile && !loading && (
        <div className="w-full flex flex-col justify-center items-center h-[400px] text-center">
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
          <DarkButton onClick={handleLogout}>Logout</DarkButton>
        </div>
      )}

      <div className="flex md:flex-row flex-col gap-4 w-full">
        {topArtists && (
          <div className="flex w-full md:w-1/2 flex-col">
            <h3>Top Artists of all Time</h3>
            <ul className="flex flex-col gap-4 mt-4">
              {topArtists.items.map((artist: Artist, _: number) => (
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
                  <h5>{artist.name}</h5>
                  {/* </a> */}
                </li>
              ))}
            </ul>
          </div>
        )}
        {topSongs && (
          <div className="flex w-full md:w-1/2 flex-col">
            <h3>Top Songs of all Time</h3>
            <ul className="flex flex-col gap-4 mt-4">
              {topSongs.items.map((song: Track, _: number) => (
                <li key={song.id} className="flex gap-4 w-full">
                  <Image
                    src={song.album.images[0].url}
                    alt={song.name}
                    width={50}
                    height={50}
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
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
