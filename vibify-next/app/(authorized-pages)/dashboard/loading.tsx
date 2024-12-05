import DarkButton from "@/app/(components)/Buttons/DarkButton";
import { Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  const array = new Array(10).fill(null);
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center h-[400px] text-center gap-2">
        <div className="profile-image">
          <Skeleton variant="circular" width={150} height={150} />
        </div>

        <Skeleton
          variant="text"
          width="20%"
          sx={{ fontSize: "3.75rem", lineHeight: "1" }}
        />

        <Skeleton variant="text" width="15%" sx={{ fontSize: "1rem", lineHeight: "1.5rem" }} />

        <DarkButton> Logout </DarkButton>
      </div>

      <div className="flex md:flex-row flex-col gap-4 w-full">
        <div className="flex w-full md:w-1/2 flex-col">
          <Skeleton
            variant="text"
            width="35%"
            sx={{ fontSize: "1.5rem", lineHeight: "2rem" }}
          />

          <ul className="flex flex-col gap-4 mt-4">
            {array.map((_, index: number) => (
              <li key={index} className="flex items-center gap-4">
                <Skeleton variant="circular" width={50} height={50} />

                <Skeleton
                  variant="text"
                  width="35%"
                  sx={{ fontSize: "1.125rem", lineHeight: "1.75rem" }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full md:w-1/2 flex-col">
          <Skeleton
            variant="text"
            width="35%"
            sx={{ fontSize: "1.5rem", lineHeight: "2rem" }}
          />

          <ul className="flex flex-col gap-4 mt-4">
            {array.map((_, index: number) => (
              <li key={index} className="flex gap-4 w-full">
                <div>
                  <Skeleton variant="rectangular" width={50} height={50} />
                </div>
                <div className="flex  w-full">
                  <div className="flex flex-col flex-1">
                    <Skeleton
                      variant="text"
                      width="35%"
                      sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                    />
                    <Skeleton
                      variant="text"
                      width="35%"
                      sx={{ fontSize: "1rem", lineHeight: "1.5rem" }}
                    />
                  </div>
                  <div className="w-[10%]">
                    <Skeleton variant="text" sx={{ fontSize: "1rem", lineHeight: "1.5rem" }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Loading;
