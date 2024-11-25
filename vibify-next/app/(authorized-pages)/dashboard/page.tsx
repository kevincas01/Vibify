"use client";
import React, { useEffect, useState } from "react";
import { getProfile, getUserTopWType } from "../../utils/spotify"; // Function to fetch profile from Spotify
import { getAccessToken } from "../../utils/accessTokens"; // Function to get the access token
import { redirect } from "next/navigation"; // For redirecting to the login page if no token
import Image from "next/image";

const Page = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [topArtists, setTopArtists] = useState<any[]>([]); // Set type for topArtists
  const [loading, setLoading] = useState<boolean>(false);

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
  }, []); // Run only once on mount

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);

    // Fetch the profile data
    const fetchProfile = async () => {
      try {
        const result = await getProfile(accessToken);
        setProfile(result); // Store the profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    // Fetch top artists
    const fetchTopArtists = async () => {
      try {
        const result = await getUserTopWType(accessToken, "artists", 5);
        setTopArtists(result); // Store top artists data
        console.log("Top artists:", result);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      }
    };

    // Run both fetch functions
    fetchProfile();
    fetchTopArtists();

    // Once data is fetched, stop loading
    setLoading(false);
  }, [accessToken]); // Run only when accessToken changes

  return (
    <div>
      <h2>Spotify Profile Page</h2>

      {/* Loading state */}
      {loading && <p>Loading profile...</p>}

      {/* Display the profile data if available */}
      {profile && !loading && (
        <div>
          <h2>Profile Information</h2>
          <h1>{profile.display_name}</h1>
          <div className="profile-image">
            {/* Use next/image for external images (make sure domain is configured) */}
            <Image
              className="rounded-full"
              alt="Profile Picture"
              src={profile.images[0].url}
              height={profile.images[0].height}
              width={profile.images[0].width}
            />
          </div>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Followers:</strong> {profile.followers.total}
          </p>

          {/* {topArtists && (
            <div>
              <h3>Top Artists</h3>
              <ul>
                {topArtists.items.map((artist, index) => (
                  <li key={index}>{artist.name}</li> // Assuming `name` is a property of `artist`
                ))}
              </ul>
            </div>
          )} */}
        </div>
      )}

      {/* If there's no profile data and it's not loading */}
      {!profile && !loading && <p>No profile data found.</p>}
    </div>
  );
};

export default Page;
