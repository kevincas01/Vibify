"use client";
import React from "react";
import { Playlist } from "../types/spotify";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PlaylistsComponentProps {
  playlists: Playlist[];
}
const PlaylistsComponent = ({ playlists }: PlaylistsComponentProps) => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/playlists/${id}`);
  };
  return (
    <div className=" flex flex-col gap-4">
      <h3>My playlists</h3>

      <div className="flex flex-col items-center py-4  gap-4 ">
        {playlists &&
          playlists.map((playlist) => {
            if (playlist == null) return null;
            return (
              <div
                key={playlist.id}
                className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer`}
                onClick={() => handleClick(playlist.id)}
                style={{
                  transition: "background-color 0.3s ease", // Smooth transition for highlight
                }}
              >
                {playlist.images && playlist.images.length > 0 ? (
                  <div className="relative w-[50px] md:w-[75px] aspect-square">
                    <Image
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 50px, 75px" // 50px on small screens, 75px on larger screens
                    />
                  </div>
                ) : (
                  <div className="relative w-[50px] md:w-[75px] aspect-square">
                    <Image
                      src={"/NoImage.png"}
                      alt={playlist.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 50px, 75px"
                    />
                  </div>
                )}
                <div className="w-full min-w-0">
                  <div className="flex flex-col min-w-0 ">
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {playlist.name}
                    </p>
                    <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                      {playlist.owner?.display_name}
                    </p>
                    {/* <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                      {playlist.description}
                    </p> */}
                  </div>
                </div>
                <div>
                  <p className="text-lightGray text-nowrap">
                    {playlist.tracks.total}{" "}
                    {playlist.tracks.total > 1 ? "Tracks" : "Track"}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlaylistsComponent;
