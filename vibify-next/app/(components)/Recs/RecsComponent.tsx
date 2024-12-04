"use client";
import {
  SpotifyUser,
  TopArtistsResponse,
  TopTracksResponse,
} from "@/app/types/spotify";
import RecModal from "./RecModal";

interface RecsComponentProps {
  accessToken: string;
  profile: SpotifyUser;
  topArtists: TopArtistsResponse;
  topTracks: TopTracksResponse;
}

const RecsComponent = ({
  accessToken,
  profile,
  topArtists,
  topTracks,
}: RecsComponentProps) => {

  return (
    <div className="h-full relative">
      <RecModal
        profileId={profile.id}
        accessToken={accessToken || ""}
        topTracks={topTracks}
        topArtists={topArtists}
      />
    </div>
  );
};

export default RecsComponent;
