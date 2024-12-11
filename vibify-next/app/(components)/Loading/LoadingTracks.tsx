import { Skeleton } from "@mui/material";
import React from "react";

interface LoadingTracksProps {
  count: number;
}

const LoadingTracks = ({ count }: LoadingTracksProps) => {
  const array = new Array(count).fill(null);
  return (
    <>
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
    </>
  );
};

export default LoadingTracks;
