"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getSearchResultWType } from "../../utils/spotify";
import {
  SpotifySearchResponse,
  Track,
  Artist,
  Album,
  Playlist,
} from "../../types/spotify";
import Image from "next/image";
import { convertDuration } from "../../utils/misc";
import RecsTrackComponent from "./RecModal/RecsTrackComponent";
import RecsArtistComponent from "./RecModal/RecsArtistComponent";
import RecsAlbumComponent from "./RecModal/RecsAlbumComponent";
import RecsPlaylistComponent from "./RecModal/RecsPlaylistComponent";

interface SpotifySearchProps {
  accessToken: string;
  recommendType: string;
  selectedId: string;
  selectItem: (id: string, item: Artist | Track | Album | Playlist) => void;
}

const SpotifySearch = ({
  accessToken,
  recommendType,
  selectedId,
  selectItem,
}: SpotifySearchProps) => {
  const [searchType, setSearchType] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [searchResults, setSearchResults] =
    useState<SpotifySearchResponse | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (type: string) => {
    if (!accessToken || !searchInput) return;

    const results = await getSearchResultWType(
      accessToken,
      type,
      searchInput,
      limit
    );
    const searchKey = `${type}s`; // "track" -> "tracks", "artist" -> "artists"

    setSearchResults(results[searchKey] || { items: [] }); // Ensure we always have an array for `items`
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
              <RecsTrackComponent
                key={track.id}
                track={track}
                selected={selectedId === track.id}
                onClick={selectItem}
              />
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
              <RecsArtistComponent
                key={artist.id}
                artist={artist}
                selected={selectedId === artist.id}
                onClick={selectItem}
              />
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
              <RecsAlbumComponent
                key={album.id}
                album={album}
                selected={selectedId === album.id}
                onClick={selectItem}
              />
            );
          })}
        </ul>
      );
    } else if (searchType === "playlist") {
      return (
        <ul className="flex flex-col gap-4 mt-4">
          {searchResults.items.map((item, index) => {
            const playlist = item as Playlist;
            if (!item) return;
            return (
              <RecsPlaylistComponent
                key={playlist.id}
                playlist={playlist}
                selected={selectedId === playlist.id}
                onClick={selectItem}
              />
            );
          })}
        </ul>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="w-full box-border">
      <input
        type="text"
        value={searchInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchInput(e.target.value);
        }}
        placeholder={`Search for your favorite`}
      />
      <h3 className="text-main">Search for {searchType}</h3>
      {searchInput && <div>{renderSearchResults()}</div>}
    </div>
  );
};

export default SpotifySearch;
