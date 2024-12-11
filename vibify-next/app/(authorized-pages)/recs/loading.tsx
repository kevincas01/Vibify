import {
  defaultFeedType,
  recommendationsFeedFilters,
} from "@/app/types/filters";
import { RecommendationType } from "@/app/types/recommendations";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
const PlayCircleOutlinedIcon = dynamic(
  () => import("@mui/icons-material/PlayCircleOutlined")
);
const ChatBubbleOutlineIcon = dynamic(
  () => import("@mui/icons-material/ChatBubbleOutline")
);
const FavoriteBorderIcon = dynamic(
  () => import("@mui/icons-material/FavoriteBorder")
);
const AddIcon = dynamic(() => import("@mui/icons-material/Add"));

const Loading = () => {
  const iconButtonSize = 25;

  const exampleRecFeed: { type: RecommendationType }[] = [
    {
      type: RecommendationType.artist,
    },
    {
      type: RecommendationType.track,
    },
    {
      type: RecommendationType.album,
    },
    {
      type: RecommendationType.playlist,
    },
  ];
  const renderRecomendationItem = (type: RecommendationType, index: number) => {
    switch (type) {
      case RecommendationType.artist:
        return (
          <div
            key={index}
            className={`flex flex-col items-center w-2/5 md:w-1/4 cursor-pointer`}
            style={{
              transition: "background-color 0.3s ease", // Smooth transition for highlight
            }}
          >
            <div className="w-full aspect-square relative mb-2">
              <Skeleton variant="circular" width={"100%"} height={"100%"} />
            </div>

            <Skeleton
              variant="text"
              width="45%"
              sx={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}
            />
          </div>
        );
      case RecommendationType.track:
        return (
          <div key={index} className={`flex gap-4 w-full cursor-pointer`}>
            <div>
              <Skeleton variant="rectangular" width={75} height={75} />
            </div>

            <div className="flex justify-between gap-2 w-full min-w-0">
              <div className="flex flex-col flex-1">
                <Skeleton
                  variant="text"
                  width="55%"
                  sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                />
                <Skeleton
                  variant="text"
                  width="35%"
                  sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                />
              </div>
              <div className="w-[10%]">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                />
              </div>
            </div>
          </div>
        );
      case RecommendationType.album:
      case RecommendationType.playlist:
        return (
          <div
            key={index}
            className={`flex gap-4 w-full cursor-pointer`}
            style={{
              transition: "background-color 0.3s ease", // Smooth transition for highlight
            }}
          >
            <div>
              <Skeleton variant="rectangular" width={75} height={75} />
            </div>
            <div className="flex justify-between gap-2 w-full min-w-0">
              <div className="flex flex-col flex-1">
                <Skeleton
                  variant="text"
                  width="55%"
                  sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                />
                <Skeleton
                  variant="text"
                  width="35%"
                  sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                />
              </div>
              <div className="w-[10%]">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="h-full relative">
      <div className="flex flex-col items-center mb-[80px] max-w-[500px] mx-auto ">
        <div className="text-center w-full">
          <div className="flex gap-4 justify-around">
            {recommendationsFeedFilters.map((element) => (
              <div key={element.value}>
                <button
                  className={`p-2 ${
                    defaultFeedType === element.value
                      ? "text-main border-b-2 border-b-main"
                      : "text-lightGray"
                  }`}
                  aria-selected={defaultFeedType === element.value}
                >
                  {element.text}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col">
          {exampleRecFeed.map((item, index: number) => (
            <div className="flex flex-col gap-2 w-full py-6 border-b-[0.5px] border-b-gray-500">
              <div className="flex gap-4 w-full">
                <div className="profile-image">
                  <Skeleton variant="circular" width={25} height={25} />
                </div>
                <div className="flex w-full min-w-0">
                  <Skeleton
                    variant="text"
                    width="45%"
                    sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center py-4 ">
                {renderRecomendationItem(item.type, index)}
              </div>
              <div className="flex gap-2">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FavoriteBorderIcon
                    style={{
                      width: iconButtonSize,
                      height: iconButtonSize,
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
                    }}
                  />
                  <span style={{ marginLeft: 4 }}>456</span>{" "}
                  {/* Dummy number */}
                </div>
                <PlayCircleOutlinedIcon
                  style={{
                    width: iconButtonSize,
                    height: iconButtonSize,
                  }}
                />
                <AddIcon
                  style={{
                    width: iconButtonSize,
                    height: iconButtonSize,
                  }}
                />
              </div>

              <div className="flex justify-between gap-2 w-full ">
                <div className="flex flex-col w-full">
                  <Skeleton
                    variant="text"
                    width="100%"
                    sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                  />
                  <Skeleton
                    variant="text"
                    width="35%"
                    sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
