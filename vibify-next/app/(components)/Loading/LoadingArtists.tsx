import { Skeleton } from "@mui/material";
import React from "react";

interface LoadingArtistsProps {
  count: number;
}

const LoadingArtists = ({ count }: LoadingArtistsProps) => {
  const array = new Array(count).fill(null);
  return (
    <>
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
    </>
  );
};

export default LoadingArtists;
