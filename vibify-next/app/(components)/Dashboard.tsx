import React from "react";
import DarkButton from "@/app/(components)/DarkButton";
import {
  Artist,
  SpotifyUser,
  TopArtistsResponse,
  TopTracksResponse,
  Track,
} from "@/app/types/spotify";
import { convertDuration } from "@/app/utils/misc";
import Image from "next/image";

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
  return (
    <>
      {profile && (
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
          <DarkButton>Logout</DarkButton>
        </div>
      )}

      <div className="flex md:flex-row flex-col gap-4 w-full">
        {topArtists && (
          <div className="flex w-full md:w-1/2 flex-col">
            <h3>Top Artists of all Time</h3>
            <ul className="flex flex-col gap-4 mt-4">
              {topArtists.items.map((artist: Artist, _: number) => (
                <li key={artist.id} className="flex items-center gap-4">
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <h5>{artist.name}</h5>
                </li>
              ))}
            </ul>
          </div>
        )}
        {topTracks && (
          <div className="flex w-full md:w-1/2 flex-col">
            <h3>Top Songs of all Time</h3>
            <ul className="flex flex-col gap-4 mt-4">
              {topTracks.items.map((Track: Track, _: number) => (
                <li key={Track.id} className="flex gap-4 w-full">
                  <Image
                    src={Track.album.images[0].url}
                    alt={Track.name}
                    width={50}
                    height={50}
                  />
                  <div className="flex justify-between gap-2 w-full min-w-0">
                    <div className="flex flex-col min-w-0">
                      <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {Track.name}
                      </p>
                      <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                        {Track.artists.map((artist: Artist, index: number) => (
                          <React.Fragment key={index}>
                            {artist.name}
                            {index < Track.artists.length - 1 && " ~ "}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                    <div>
                      <p className="text-lightGray">
                        {convertDuration(Track.duration_ms)}
                      </p>
                    </div>
                  </div>
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
