import { Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  const array = new Array(10).fill(null);
  return (
    <div className=" flex flex-col gap-4">
      <h3>My playlists</h3>

      <div className="flex flex-col items-center py-4  gap-4 ">
        {array.map((_, index: number) => {
          return (
            <div
              key={index}
              className={`grid grid-cols-[50px_1fr_65px] md:grid-cols-[75px_1fr_65px] gap-4 w-full cursor-pointer`}
              style={{
                transition: "background-color 0.3s ease", // Smooth transition for highlight
              }}
            >
              <div className="relative w-[50px] md:w-[75px] aspect-square">
                <Skeleton
                  variant="rectangular"
                  width={"100%"}
                  height={"100%"}
                />
              </div>

              <div className="w-full min-w-0">
                <div className="flex flex-col min-w-0 ">
                  <Skeleton
                    variant="text"
                    width="35%"
                    sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                  />
                  <Skeleton
                    variant="text"
                    width="25%"
                    sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                  />
                  {/* <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                    {playlist.description}
                  </p> */}
                </div>
              </div>
              <div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
