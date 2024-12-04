"use client";
import RecModal from "@/app/(components)/RecModal";
import {
  SpotifyUser,
  TopArtistsResponse,
  TopTracksResponse,
} from "@/app/types/spotify";
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
    <div>
      <RecModal
        accessToken={accessToken || ""}
        topTracks={topTracks}
        topArtists={topArtists}
      />
    </div>
  );
};

export default RecsComponent;
