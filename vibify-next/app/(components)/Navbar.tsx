"use client";

import React from "react";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import Link from "next/link";
const Navbar = () => {
  const pathname = usePathname();

  const currentPage = pathname?.split("/")[1];

  return (
    <div className="md:h-screen bg-background w-screen fixed md:top-0 md:w-[100px]  bottom-0 md:block flex flex-col">
      <div className="flex flex-col justify-center h-full">
        <ul className=" flex flex-row md:flex-col navbar-links text-center w-full">
          <li
            className={`flex box py-4 md:py-2 justify-center flex-1 text-sm flex-col items-center ${
              currentPage === "dashboard"
                ? " border-t-4 md:border-t-0 md:border-l-4 border-main bg-grayBg"
                : ""
            }`}
          >
            <Link href="/dashboard">
              <DashboardIcon />
              <div>Dashboard</div>
            </Link>
          </li>
          <li
            className={`flex box py-4 md:py-2 justify-center flex-1 text-sm flex-col items-center ${
              currentPage === "recs"
                ? " border-t-4 md:border-t-0 md:border-l-4 border-main bg-grayBg"
                : ""
            }`}
          >
            <Link href={"/recs"}>
              <DashboardIcon />
              <div>Recs</div>
            </Link>
          </li>
          <li
            className={`flex box py-4 md:py-2 justify-center flex-1 text-sm flex-col items-center   ${
              currentPage === "artists"
                ? " border-t-4 md:border-t-0 md:border-l-4 border-main"
                : ""
            }`}
          >
            <Link href={"/artists"}>
              <PersonIcon />
              <div>Top Artists</div>
            </Link>
          </li>
          <li
            className={`flex box py-4 md:py-2 justify-center flex-1 text-sm flex-col items-center   ${
              currentPage === "songs"
                ? " border-t-4 md:border-t-0 md:border-l-4 border-main"
                : ""
            }`}
          >
            <Link href={"/songs"}>
              <MusicNoteOutlinedIcon />
              <div>Songs</div>
            </Link>
          </li>
          <li
            className={`flex box py-4 md:py-2 justify-center flex-1 text-sm flex-col items-center   ${
              currentPage === "playlists"
                ? " border-t-4 md:border-t-0 md:border-l-4 border-main"
                : ""
            }`}
          >
            <Link href={"/playlists"}>
              <LibraryMusicIcon />
              <div>Playlists</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
