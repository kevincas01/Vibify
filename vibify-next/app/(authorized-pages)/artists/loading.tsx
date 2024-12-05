import {
  limitElements,
  timeRangeElements,
  defaultArtistLimit,
  defaultArtistTimeRange,
} from "@/app/types/filters";
import { Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  const array = new Array(10).fill(null);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex gap-4 mt-4">
        {timeRangeElements.map((element) => (
          <div key={element.value}>
            <button
              className={`p-2 ${
                defaultArtistTimeRange === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
            >
              {element.text}
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        {limitElements.map((element) => (
          <div key={element.value}>
            <button
              className={`p-2 ${
                defaultArtistLimit === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
            >
              {element.value}
            </button>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col mt-4">
        <h3>Top Artists</h3>
        <div className="flex flex-wrap gap-2 mt-4 justify-around">
          {array.map((_, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center w-2/5 md:w-1/4 lg:w-1/6"
            >
              <div className="w-full aspect-square relative mb-2">
                <Skeleton variant="circular" width="100%" height="100%" />
              </div>
              <Skeleton
                variant="text"
                width="60%"
                sx={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
