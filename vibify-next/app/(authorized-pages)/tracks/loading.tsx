import {
  defaultTrackLimit,
  defaultTrackTimeRange,
  limitElements,
  timeRangeElements,
} from "@/app/types/filters";
import { Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  const array = new Array(10).fill(null);
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mt-4">
        {timeRangeElements.map((element) => (
          <div key={element.value}>
            <button
              className={`p-2 ${
                defaultTrackTimeRange === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
              aria-selected={defaultTrackTimeRange === element.value}
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
                defaultTrackLimit === element.value
                  ? " text-main border-b-2 border-b-main"
                  : "text-lightGray"
              }`}
              aria-selected={defaultTrackLimit === element.value}
            >
              {element.value}
            </button>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col mt-4">
        <h3 className="mb-4">Top Tracks</h3>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
          {array.map((_, index: number) => (
            <div
              key={index}
              className="grid grid-cols-[75px_1fr_50px] gap-4 w-full"
            >
              <Skeleton variant="rectangular" width={75} height={75} />
              <div className="w-full min-w-0">
                <div className="flex flex-col min-w-0">
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
              </div>
              <div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
