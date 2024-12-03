"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getAccessToken } from "../utils/accessTokens";
import { getSearchResultWType } from "../utils/spotify";
import { SpotifySearchResult, Track, Artist, Album, Playlist } from "../types/spotify";
import Image from "next/image";
import { convertDuration } from "../utils/misc";

interface SpotifySearchProps {
  accessToken: string;
  recommendType: string;
}

const SpotifySearch = ({ accessToken, recommendType }: SpotifySearchProps) => {
  const [searchType, setSearchType] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [searchResults, setSearchResults] =
    useState<SpotifySearchResult | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (type: string) => {
    if (!accessToken || !searchInput) return;

    console.log("search", type);
    const results = await getSearchResultWType(
      accessToken,
      type,
      searchInput,
      limit
    );
    const searchKey = `${type}s`; // "track" -> "tracks", "artist" -> "artists"

    setSearchResults(results[searchKey] || { items: [] }); // Ensure we always have an array for `items`
    console.log(results[searchKey]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setSearchType(recommendType);
    setSearchResults(null);
    fetchSearchResults(recommendType);
  }, [searchInput, recommendType]);

  const renderSearchResults = () => {
    if (loading) {
      return <p>loading...</p>;
    }
    if (!searchResults || !searchResults.items) {
      return <p>No results found.</p>;
    }

    if (searchType === "track") {
      return (
        <ul className="flex flex-col gap-4 mt-4">
          {searchResults.items.map((item, index) => {
            const track = item as Track;
            return (
              <li key={track.id} className={`flex gap-4 w-full cursor-pointer`}>
                <Image
                  src={track.album.images[0].url}
                  alt={track.name}
                  width={50}
                  height={50}
                />
                <div className="flex justify-between gap-2 w-full min-w-0">
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
                  <div>
                    <p className="text-lightGray">
                      {convertDuration(track.duration_ms)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    } else if (searchType === "artist") {
      return (
        <div className="flex flex-wrap gap-2 mt-4 justify-around">
          {searchResults.items.map((item) => {
            const artist = item as Artist;
            return (
              <div
                key={artist.id}
                className="flex flex-col items-center w-2/5 md:w-1/4 lg:w-1/6"
              >
                {artist.images.length > 0 && (
                  <div className="w-full aspect-square relative">
                    <Image
                      src={artist.images[0]?.url || ""}
                      alt={artist.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <h5 className="text-center mt-2">{artist.name}</h5>
              </div>
            );
          })}
        </div>
      );
    } else if (searchType === "album") {
      return (
        <ul className="flex flex-col gap-4 mt-4">
          {searchResults.items.map((item, index) => {
            const album = item as Album;
            return (
              <li key={album.id} className={`flex gap-4 w-full cursor-pointer`}>
                <Image
                  src={album.images[0].url}
                  alt={album.name}
                  width={75}
                  height={75}
                />
                <div className="flex justify-between gap-2 w-full min-w-0">
                  <div className="flex flex-col min-w-0 max-w-[80%]">
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {album.name}
                    </p>
                    <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                      {album.artists.map((artist: Artist, index: number) => (
                        <React.Fragment key={index}>
                          {artist.name}
                          {index < album.artists.length - 1 && " ~ "}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                  <div>
                  <p className="text-lightGray">

                    {album.total_tracks} {album.album_type=="album"?"Tracks":"Track"}
                  </p>
                </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    } else if (searchType === "playlist") {
      return (
        <ul className="flex flex-col gap-4 mt-4">
          {searchResults.items.map((item, index) => {
            const playlist = item as Playlist;
            if(!item)return
            return (
              <li key={playlist.id} className={`flex gap-4 w-full cursor-pointer`}>
                
                {playlist.images&& playlist.images.length > 0 && (<Image
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width={75}
                  height={75}
                />)}
                <div className="flex justify-between gap-2 w-full min-w-0">
                  <div className="flex flex-col min-w-0 max-w-[80%]">
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {playlist.name}
                    </p>
                    <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                      
                      {playlist.owner?.display_name}
                    </p>
                    <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                      
                      {playlist.description}
                    </p>
                  </div>
                  <div>
                  <p className="text-lightGray">

                    {playlist.tracks.total} {playlist.tracks.total>1?"Tracks":"Track"}
                  </p>
                </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    } else {
      console.log("l;ollllllllll");
      return null;
    }
  };

  return (
    <div>
      <h3>Search for {searchType}</h3>
      <input
        type="text"
        value={searchInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchInput(e.target.value);
        }}
        placeholder="Search for tracks or artists..."
      />

      {searchInput && <div>{renderSearchResults()}</div>}
    </div>
  );
};

export default SpotifySearch;
