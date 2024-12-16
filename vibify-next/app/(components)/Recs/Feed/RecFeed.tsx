"use client";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";

import {
  Recommendations,
  RecommendationType,
} from "@/app/types/recommendations";
import { useState } from "react";

import Image from "next/image";

import {
  defaultFeedType,
  recommendationsFeedFilters,
} from "@/app/types/filters";

import { useTrackInfo } from "@/app/context/player";
import { Drawer } from "@mui/material";
import FeedArtistComponent from "./FeedArtistComponent";
import FeedTrackComponent from "./FeedTrackComponent";
import FeedAlbumComponent from "./FeedAlbumComponent";
import FeedPlaylistComponent from "./FeedPlaylistComponent";
import DrawerItem from "../Drawer/DrawerItem";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { getRecommendations } from "@/app/utils/supabase";
import CircleButton from "../../Buttons/CircleButton";
import { showToast } from "../../Providers/ToastProvider";

import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PlaylistItemComponent from "../../PlaylistItemComponent";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AlbumItemComponent from "../../AlbumItemComponent";
interface RecFeedProps {
  handleModalToggle: () => void;
}
const RecFeed = ({ handleModalToggle }: RecFeedProps) => {
  const [itemSelected, setItemSelected] = useState<
    Playlist | Artist | Album | null
  >(null);
  const { data: session, status } = useSession();

  if (!session) {
    return null;
  }
  const userId = session.user.userId as string;

  const [feedType, setFeedType] = useState<string>(defaultFeedType);

  const { handleStartPlay } = useTrackInfo();

  const [addDrawerSelectedID, setAddDrawerSelectedID] = useState("");
  const [isOpenAddDrawer, setIsOpenAddDrawer] = useState(false);

  const feedKey = `feed ` + feedType;
  const {
    data: recommendationsData,
    error: recommendationsDataError,
    isLoading: recommendationsDataLoading,
    mutate,
  } = useSWR(feedKey, () => getRecommendations(feedType));

  const handleAddDrawerToggle = () => {
    setIsOpenAddDrawer(!isOpenAddDrawer);
  };

  const handleFollowToggle = (item: Album | Artist | Playlist) => {
    // Your logic to follow the item goes here
    console.log("Following", item);
    showToast("success", "Followed the " + item.type);
  };

  function isTrack(item: any): item is Track {
    return item && item.type === "track";
  }

  const handleAddClick = async (item: Album | Artist | Track | Playlist) => {
    if (isTrack(item)) {
      handleAddDrawerToggle();
      setAddDrawerSelectedID(item.id);
    } else {
      handleFollowToggle(item);
    }
  };
  const handleViewClick = (item: any) => {
    setItemSelected(item);
  };

  const renderRecomendationItem = (
    type: RecommendationType, // Use RecommendationType directly
    item: Artist | Track | Album | Playlist
  ) => {
    switch (type) {
      case RecommendationType.artist:
        return <FeedArtistComponent artist={item as Artist} />;
      case RecommendationType.track:
        return <FeedTrackComponent track={item as Track} />;
      case RecommendationType.album:
        return <FeedAlbumComponent album={item as Album} />;
      case RecommendationType.playlist:
        return <FeedPlaylistComponent playlist={item as Playlist} />;
      default:
        return null;
    }
  };
  const iconButtonSize = 25;

  const handleTrackPlay = async (track: Track) => {
    handleStartPlay(track);
  };

  const closeSelectedPlaylist = () => {
    setItemSelected(null);
  };
  return (
    <>
      {itemSelected && (
        <>
          <h3> View Playlist</h3>
          <span
            className=" cursor-pointer absolute right-0 top-0"
            onClick={() => closeSelectedPlaylist()}
          >
            <ArrowBackIcon />
          </span>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        {/* Album Component */}
        <div
          style={{ display: itemSelected?.type === "album" ? "block" : "none" }}
        >
          <AlbumItemComponent
            accessToken={session.user.accessToken as string}
            album={itemSelected as Album}
          />
        </div>

        {/* Playlist Component */}
        <div
          style={{
            display: itemSelected?.type === "playlist" ? "block" : "none",
          }}
        >
          <PlaylistItemComponent
            accessToken={session.user.accessToken as string}
            playlist={itemSelected as Playlist}
          />
        </div>
      </div>

      {!itemSelected && (
        <>
          <div className="fixed top-[20px] right-[20px] ">
            <CircleButton onClick={() => handleModalToggle()} size={40}>
              <AddIcon fontSize="medium" />
            </CircleButton>
          </div>
          <h3 className="text-center mb-4">Recommendations</h3>
          <div className="flex flex-col items-center mb-[80px] max-w-[500px] mx-auto ">
            <div className="text-center w-full">
              <div className="flex justify-around">
                {recommendationsFeedFilters.map((element) => (
                  <div key={element.value}>
                    <button
                      onClick={() => setFeedType(element.value)}
                      className={`p-2 ${
                        feedType.includes(element.value)
                          ? "text-main border-b-2 border-b-main"
                          : "text-lightGray"
                      }`}
                      aria-selected={feedType.includes(element.value)}
                    >
                      {element.text}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col">
              {recommendationsData &&
                recommendationsData.map(
                  (item: Recommendations, index: number) => (
                    <div
                      className="flex flex-col gap-2 w-full py-6 border-b-[0.5px] border-b-gray-500"
                      key={index}
                    >
                      <div className="flex gap-4 w-full">
                        <Image
                          className="rounded-full"
                          src={item.users?.image_url as string}
                          alt="User Profile Image"
                          width={25}
                          height={25}
                          style={{ alignSelf: "flex-start" }} // Prevent the image from stretching
                        />

                        <div className="flex w-full justify-between">
                          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {item.users?.email}
                          </p>
                          <div className="flex gap-2">
                            {item.recommendation_type == "track" ? (
                              <span
                                onClick={() => {
                                  handleTrackPlay(
                                    item.recommended_item as Track
                                  );
                                }}
                                style={{
                                  display: "inline-block",
                                  cursor: "pointer",
                                  textAlign: "center",
                                }}
                                aria-label="Play"
                              >
                                <PlayCircleOutlinedIcon
                                  style={{
                                    width: iconButtonSize,
                                    height: iconButtonSize,
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            ) : (
                              <span
                                onClick={() => {
                                  handleViewClick(item.recommended_item);
                                }}
                                style={{
                                  display: "inline-block",
                                  cursor: "pointer",
                                  textAlign: "center",
                                }}
                                aria-label="View"
                              >
                                <VisibilityOutlinedIcon
                                  style={{
                                    width: iconButtonSize,
                                    height: iconButtonSize,
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            )}
                            <span
                              onClick={() => {
                                handleAddClick(item.recommended_item);
                              }}
                              style={{
                                display: "inline-block",
                                cursor: "pointer",

                                textAlign: "center",
                              }}
                              aria-label="Add"
                            >
                              <AddIcon
                                style={{
                                  width: iconButtonSize,
                                  height: iconButtonSize,
                                  cursor: "pointer",
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center py-4 ">
                        {renderRecomendationItem(
                          item.recommendation_type,
                          item.recommended_item
                        )}
                      </div>

                      <div className="flex justify-between gap-2 w-full">
                        <div className="flex flex-col">
                          <p className="">
                            <span className="mr-2 font-bold">
                              {item.users?.email}
                            </span>
                            <span className="text-lightGray text-wrap"></span>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              {isOpenAddDrawer && (
                <Drawer
                  anchor={"bottom"}
                  open={isOpenAddDrawer}
                  onClose={handleAddDrawerToggle}
                >
                  <DrawerItem
                    id={addDrawerSelectedID}
                    userId={userId}
                    onClose={handleAddDrawerToggle}
                  />
                </Drawer>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecFeed;
