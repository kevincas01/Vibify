"use client";
import {
  Album,
  Artist,
  Playlist,
  SpotifyUser,
  TopArtistsResponse,
  TopTracksResponse,
  Track,
} from "@/app/types/spotify";
import RecModal from "./RecModal";
import {
  Recommendations,
  RecommendationType,
} from "@/app/types/recommendations";
import { useState } from "react";
import CircleButton from "../Buttons/CircleButton";
import Image from "next/image";
import dynamic from "next/dynamic";
import FeedTrackComponent from "./Feed/FeedTrackComponent";
import FeedArtistComponent from "./Feed/FeedArtistComponent";
import FeedAlbumComponent from "./Feed/FeedAlbumComponent";
import FeedPlaylistComponent from "./Feed/FeedPlaylistComponent";
import {
  defaultFeedType,
  recommendationsFeedFilters,
} from "@/app/types/filters";

import { useTrackInfo } from "@/app/context/player";
import { Drawer } from "@mui/material";
import DrawerItem from "./Drawer/DrawerItem";
import { getSession } from "next-auth/react";

const PlayCircleOutlinedIcon = dynamic(
  () => import("@mui/icons-material/PlayCircleOutlined"),
  {
    ssr: false,
  }
);
const ChatBubbleOutlineIcon = dynamic(
  () => import("@mui/icons-material/ChatBubbleOutline"),
  {
    ssr: false,
  }
);
const FavoriteBorderIcon = dynamic(
  () => import("@mui/icons-material/FavoriteBorder"),
  {
    ssr: false,
  }
);
const AddIcon = dynamic(() => import("@mui/icons-material/Add"), {
  ssr: false,
});
const VisibilityOutlinedIcon = dynamic(
  () => import("@mui/icons-material/VisibilityOutlined"),
  {
    ssr: false,
  }
);

interface RecsComponentProps {
  accessToken: string;
  userId: string;
  topArtists: TopArtistsResponse;
  topTracks: TopTracksResponse;
  recommendations: Recommendations[];
}
const RecsComponent = ({
  accessToken,
  userId,
  topArtists,
  topTracks,
  recommendations,
}: RecsComponentProps) => {
  const [recommendModal, setRecommendModal] = useState(false);

  const [feedType, setFeedType] = useState<string[]>([defaultFeedType]);

  const { handleStartPlay } = useTrackInfo();

  const handleModalToggle = () => {
    setRecommendModal((prev) => !prev);
  };

  const [addDrawerSelectedID, setAddDrawerSelectedID] = useState("");
  const [isOpenAddDrawer, setIsOpenAddDrawer] = useState(false);

  const handleAddDrawerToggle = () => {
    setIsOpenAddDrawer(!isOpenAddDrawer);
  };

  const handleFollowToggle = (item: any) => {
    // Your logic to follow the item goes here
    console.log("Following", item);
  };

  const handleAddClick = async (
    type: string,
    item: Album | Artist | Track | Playlist
  ) => {
    if (type === "track") {
      handleAddDrawerToggle();
      setAddDrawerSelectedID(item.id);
    } else {
      handleFollowToggle(item);
    }
  };

  const handleFeedFilterChange = (value: string) => {
    setFeedType((prevFeedType) => {
      if (value === "all") {
        // If "All" is selected, it should exclude all others
        return prevFeedType.includes("all") ? [] : ["all"];
      }

      if (prevFeedType.includes("all")) {
        // If "All" is already selected, deselect "All" when choosing other filters
        return [value];
      }
      //TODO Handle filtering api calls to supabase. only have ui right now 

      // Toggle the selected filter (add if not selected, remove if selected)
      if (prevFeedType.includes(value)) {
        return prevFeedType.filter((item) => item !== value);
      } else {
        return [...prevFeedType, value];
      }
    });
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

  const handleLike = () => {
    console.log("liking");
  };
  const handleAdd = () => {
    console.log("liking");
  };
  return (
    <div className="h-full relative">
      {recommendModal ? (
        <>
          <RecModal
            handleModalToggle={handleModalToggle}
            userId={userId}
            topTracks={topTracks}
            topArtists={topArtists}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col items-center mb-[80px] max-w-[500px] mx-auto ">
            <div className="text-center w-full">
              <div className="flex gap-4 justify-around">
                {recommendationsFeedFilters.map((element) => (
                  <div key={element.value}>
                    <button
                      onClick={() => handleFeedFilterChange(element.value)}
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
              {recommendations.map((item: Recommendations, index: number) => (
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

                    <div className="flex w-full">
                      <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {item.users?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center py-4 ">
                    {renderRecomendationItem(
                      item.recommendation_type,
                      item.recommended_item
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <FavoriteBorderIcon
                        style={{
                          width: iconButtonSize,
                          height: iconButtonSize,
                          cursor: "pointer",
                        }}
                      />
                      <span style={{ marginLeft: 4 }}>123</span>{" "}
                      {/* Dummy number */}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <ChatBubbleOutlineIcon
                        style={{
                          width: iconButtonSize,
                          height: iconButtonSize,
                          cursor: "pointer",
                        }}
                      />
                      <span style={{ marginLeft: 4 }}>456</span>{" "}
                      {/* Dummy number */}
                    </div>
                    {item.recommendation_type == "track" ? (
                      <span
                        onClick={() => {
                          handleTrackPlay(item.recommended_item as Track);
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
                      <VisibilityOutlinedIcon
                        style={{
                          width: iconButtonSize,
                          height: iconButtonSize,
                          cursor: "pointer",
                        }}
                      />
                    )}

                    <span
                      onClick={() => {
                        handleAddClick(
                          item.recommendation_type,
                          item.recommended_item
                        );
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
              ))}
            </div>
            {isOpenAddDrawer && (
              <Drawer
                anchor={"bottom"}
                open={isOpenAddDrawer}
                onClose={handleAddDrawerToggle}
              >
                <DrawerItem
                  id={addDrawerSelectedID}
                  userId={userId}
                  accessToken={accessToken}
                  onClose={handleAddDrawerToggle}
                />
              </Drawer>
            )}

            <div className="fixed md:bottom-[20px] bottom-[100px] right-[20px] ">
              <CircleButton onClick={() => handleModalToggle()} size={60}>
                <AddIcon fontSize="large" />
              </CircleButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecsComponent;
