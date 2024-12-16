"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Album, Artist, Track } from "../types/spotify";
import AlbumItem from "./SpotifyItems/AlbumItem";
import DarkButton from "./Buttons/DarkButton";
import LoadingBars from "./LoadingBars";
import { useTrackInfo } from "../context/player";
import { fetchNextAlbumTracks } from "../utils/spotify";
import Image from "next/image";
import { convertDuration } from "../utils/misc";

interface AlbumItemComponentProps {
  accessToken: string;
  album: Album | null;
  recommend?: boolean;
}

const AlbumItemComponent = ({
  accessToken,
  album,
  recommend = true,
}: AlbumItemComponentProps) => {
  const { handleStartPlay } = useTrackInfo();
  const [trackItems, setTrackItems] = useState<Track[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [loadNext, setLoadNext] = useState(false);

  const albumItemsKey =
    album && nextUrl ? `album-${album.id}-${nextUrl}` : null;

  // Fetch data with SWR
  const { data, error, isLoading } = useSWR(
    loadNext ? albumItemsKey : null,
    () => fetchNextAlbumTracks(accessToken, nextUrl as string),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (album && album.type == "album") {
      const initialUrl = `https://api.spotify.com/v1/albums/${album.id}/tracks`;
      setNextUrl(initialUrl);
      setTrackItems([]); // Reset when a new album is selected
      setLoadNext(true);
    }
  }, [album]);

  useEffect(() => {
    if (data && data.items) {
      const tracksWithImages = data.items.map((track) => ({
        ...track,
        album: { ...track.album, images: album?.images || [] },
      }));

      setTrackItems((prevItems) => [...prevItems, ...tracksWithImages]);
      setNextUrl(data.next); // Update next pagination URL
      setLoadNext(false);
    }
  }, [data]);

  const handleLoadMore = () => {
    if (!nextUrl) return;
    setLoadNext(true);
  };

  if (error) {
    return <p className="text-red-500">Failed to load album tracks.</p>;
  }

  if (!album || album.type !== "album") {
    return null; // Ensure type safety for album rendering
  }

  return (
    <div className="flex flex-col gap-4 w-full mb-[50px]">
      <div
        key={album.id}
        className="grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full"
      >
        <AlbumItem album={album} recommend={recommend}/>
      </div>

      <h3>Album Tracks</h3>
      <div className="flex flex-col items-center py-4 gap-4">
        {trackItems.map((track) => (
          <div
            onClick={() => {
              handleStartPlay(track);
            }}
            key={track.id}
            className="grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer hover:text-main hover:bg-lightGrayBg"
          >
            <div className="relative w-full aspect-square">
              {album.images && album.images.length > 0 ? (
                <Image
                  src={album.images[0].url}
                  alt={album.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 50px, 75px"
                />
              ) : (
                <Image
                  src={"/NoImage.png"}
                  alt={album.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 50px, 75px"
                />
              )}
            </div>
            <div className=" w-full min-w-0">
              <div className="flex flex-col min-w-0">
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {track.name}
                </p>
                <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                  {track.artists.map((artist: Artist, index: number) => (
                    <React.Fragment key={index}>
                      {artist.name}
                      {index < track.artists.length - 1 && " ~ "}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lightGray">
                {convertDuration(track.duration_ms)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isLoading && <LoadingBars />}
      {!isLoading && trackItems.length > 0 && nextUrl && (
        <DarkButton onClick={handleLoadMore}>Load More</DarkButton>
      )}
    </div>
  );
};

export default AlbumItemComponent;
