"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Playlist, PlaylistTrack } from "../types/spotify";
import TrackItem from "./SpotifyItems/TrackItem";
import PlaylistItem from "./SpotifyItems/PlaylistItem";
import DarkButton from "./Buttons/DarkButton";
import { fetchNextPlaylistItems } from "../utils/spotify";
import LoadingBars from "./LoadingBars";
import { useTrackInfo } from "../context/player";

interface PlaylistItemComponentProps {
  accessToken: string;
  playlist: Playlist | null;
  recommend?: boolean;
}

const PlaylistItemComponent = ({
  accessToken,
  playlist,
  recommend = true,
}: PlaylistItemComponentProps) => {
  const { handleStartPlay } = useTrackInfo();
  const [playlistItems, setPlaylistItems] = useState<PlaylistTrack[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loadNext, setLoadNext] = useState(false);

  const playlistItemsKey =
    playlist && nextUrl ? `playlist-${playlist.id}-${nextUrl}` : null;

  // Fetch data with SWR
  const { data, error, isLoading } = useSWR(
    loadNext ? playlistItemsKey : null, // Unique key per playlist and pagination state
    () => fetchNextPlaylistItems(accessToken, nextUrl as string),
    {
      revalidateOnFocus: false, // Prevent refetching when window gains focus
    }
  );

  // Update playlist items when new data is fetched
  useEffect(() => {
    if (playlist && playlist.type == "playlist") {
      const initialUrl = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
      setNextUrl(initialUrl);
      setPlaylistItems([]); // Reset playlist items when a new playlist is selected
      setLoadNext(true);
    }
  }, [playlist]);

  useEffect(() => {
    if (data && data.items) {
      setPlaylistItems((prevItems) => [...prevItems, ...data.items]);
      setNextUrl(data.next); // Update the next URL for pagination
      setLoadNext(false);
    }
  }, [data]);

  // Handle loading more tracks
  const handleLoadMore = () => {
    if (!nextUrl) return;
    setLoadNext(true);
  };

  // Error handling
  if (error) {
    return <p className="text-red-500">Failed to load playlist tracks.</p>;
  }

  // If no playlist is selected, show a message
  if (!playlist || playlist.type !== "playlist") {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 w-full mb-[50px]">
      {/* Display selected playlist */}
      <div
        key={playlist.id}
        className="grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full"
      >
        <PlaylistItem playlist={playlist} recommend={recommend} />
      </div>

      {/* Playlist Tracks */}
      <h3>Playlist Tracks</h3>
      <div className="flex flex-col items-center py-4 gap-4">
        {playlistItems.length > 0 &&
          playlistItems.map((playlistItem) => (
            <div
              onClick={() => {
                handleStartPlay(playlistItem.track);
              }}
              key={playlistItem.track.id}
              className=" pplaylist-itemmmm grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer hover:text-main hover:bg-lightGrayBg"
            >
              <TrackItem track={playlistItem.track} recommend={recommend} />
            </div>
          ))}
      </div>

      {/* Load More Button */}
      {isLoading && <LoadingBars />}
      {!isLoading && playlistItems.length > 0 && nextUrl && (
        <DarkButton onClick={handleLoadMore}>Load More</DarkButton>
      )}
    </div>
  );
};

export default PlaylistItemComponent;
