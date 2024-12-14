"use client";
import React from "react";
import DarkButton from "@/app/(components)/Buttons/DarkButton";
import {
  Artist,
  SpotifyUser,
  TopArtistsResponse,
  TopTracksResponse,
  Track,
} from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import { useTrackInfo } from "../context/player";
import TrackItem from "./SpotifyItems/TrackItem";
interface DashboardComponentProps {
  profile: SpotifyUser;
  topArtists: TopArtistsResponse;
  topTracks: TopTracksResponse;
}
const DashboardComponent = ({
  profile,
  topArtists,
  topTracks,
}: DashboardComponentProps) => {
  const { handleStartPlay } = useTrackInfo();

  const handleLogout = async () => {
    await signOut();
    redirect("/");
  };
  const handleTrackPlay = async (track: Track) => {
    handleStartPlay(track);
  };
  return (
    <>
      {profile && (
        <div className="w-full flex flex-col justify-center items-center h-[400px] text-center gap-2">
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

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full mb-[50px]">
        {topArtists && (
          <div className="flex w-full flex-col">
            <h3>Top Artists of all Time</h3>
            <ul className="flex flex-col gap-4 mt-4">
              {topArtists.items.map((artist: Artist, _: number) => (
                <li key={artist.id} className="flex items-center gap-4">
                  <div>
                    <Image
                      src={artist.images[0].url}
                      alt={artist.name}
                      width={50}
                      height={50}
                      className="rounded-full aspect-square object-cover"
                    />
                  </div>
                  <h5>{artist.name}</h5>
                </li>
              ))}
            </ul>
          </div>
        )}
        {topTracks && (
          <div className="flex w-full flex-col">
            <h3>Top Songs of all Time</h3>
            <ul className="flex flex-col gap-4 mt-4">
              {topTracks.items.map((track: Track, _: number) => (
                <li
                onClick={() => {
                  handleStartPlay(track);
                }}
                  key={track.id}
                  className="grid grid-cols-[50px_1fr_auto] gap-4 w-full  cursor-pointer hover:text-main hover:bg-lightGrayBg"
                >
                  <TrackItem track={track} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardComponent;
