"use client";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";

import {
  Recommendations,
  RecommendationType,
} from "@/app/types/recommendations";
import { useState } from "react";

import Image from "next/image";
import dynamic from "next/dynamic";

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

const RecFeed = () => {
  const { data: session, status } = useSession();

  if (!session) {
    return null;
  }
  const accessToken = session.user.accessToken as string;
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


//   TODO filter by many filters
//   const handleFeedFilterChange = (value: string) => {
//     setFeedType((prevFeedType) => {
//       if (value === "all") {
//         // If "All" is selected, it should exclude all others
//         return prevFeedType.includes("all") ? [] : ["all"];
//       }

//       if (prevFeedType.includes("all")) {
//         // If "All" is already selected, deselect "All" when choosing other filters
//         return [value];
//       }


//       // Toggle the selected filter (add if not selected, remove if selected)
//       if (prevFeedType.includes(value)) {
//         if(prevFeedType.length===1){
//             return [...prevFeedType]
//         }else
//         return prevFeedType.filter((item) => item !== value);
//       } else {
//         if(prevFeedType.length===3){
//             return ["all"]
//         }else
//         return [...prevFeedType, value];
//       }
//     });
//   };
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
    <>
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
            recommendationsData.map((item: Recommendations, index: number) => (
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
  );
};

export default RecFeed;
