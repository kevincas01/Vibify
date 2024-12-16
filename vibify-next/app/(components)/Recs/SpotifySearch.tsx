"use client";
import React, { ChangeEvent, useState } from "react";
import { getSearchResultWType } from "../../utils/spotify";
import {
  SpotifySearchResponse,
  Track,
  Artist,
  Album,
  Playlist,
} from "../../types/spotify";
import RecsTrackComponent from "./RecModal/RecsTrackComponent";
import RecsArtistComponent from "./RecModal/RecsArtistComponent";
import RecsAlbumComponent from "./RecModal/RecsAlbumComponent";
import RecsPlaylistComponent from "./RecModal/RecsPlaylistComponent";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import LoadingBars from "../LoadingBars";
import { useRecommendItem } from "../Providers/RecommendItemProvider";

interface SpotifySearchProps {
  recommendType: string;
}

const SpotifySearch = ({ recommendType }: SpotifySearchProps) => {
  const { selectItem } = useRecommendItem();
  const { data: session } = useSession();

  const [searchInput, setSearchInput] = useState<string>("");


  const searchKey = `search ` + searchInput + " " + recommendType;
  const {
    data: SearchData,
    isLoading: SearchDataLoading,
  } = useSWR(searchInput ? searchKey : null, () =>
    getSearchResultWType(
      session?.user.accessToken as string,
      recommendType,
      searchInput,
      10
    )
  );

  const renderSearchResults = () => {
    if (SearchDataLoading) {
      return <LoadingBars />;
    }

    if (!SearchData) {
      return <p>No results found.</p>;
    }
    const searchKey = `${recommendType}s`; // "track" -> "tracks", "artist" -> "artists"
    const searchResult = SearchData[searchKey as keyof SpotifySearchResponse];

    if (!searchResult) {
      return <p>No results found.</p>;
    }

    if (recommendType === "track") {
      return (
        <ul className="flex flex-col gap-4 mt-4">
          {searchResult.items.map((item) => {
            const track = item as Track;
            return (
              <RecsTrackComponent
                key={track.id}
                track={track}
                onClick={selectItem}
              />
            );
          })}
        </ul>
      );
    } else if (recommendType === "artist") {
      return (
        <div className="flex flex-wrap gap-2 mt-4 justify-around">
          {searchResult.items.map((item) => {
            const artist = item as Artist;
            return (
              <RecsArtistComponent
                key={artist.id}
                artist={artist}
                onClick={selectItem}
              />
            );
          })}
        </div>
      );
    } else if (recommendType === "album") {
      return (
        <ul className="flex flex-col gap-4 mt-4">
          {searchResult.items.map((item) => {
            const album = item as Album;
            return (
              <RecsAlbumComponent
                key={album.id}
                album={album}
                onClick={selectItem}
              />
            );
          })}
        </ul>
      );
    } else if (recommendType === "playlist") {
      return (
        <ul className="flex flex-col gap-4 mt-4">
          {searchResult.items.map((item) => {
            const playlist = item as Playlist;
            if (!item) return;
            return (
              <RecsPlaylistComponent
                key={playlist.id}
                playlist={playlist}
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
  if (!session) {
    return null;
  }

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
      <h3 className="text-main">Search for {recommendType}</h3>
      {searchInput && <div>{renderSearchResults()}</div>}
    </div>
  );
};

export default SpotifySearch;
