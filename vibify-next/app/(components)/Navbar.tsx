"use client";

import React, { ReactElement } from "react";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import Link from "next/link";
const Navbar = () => {
  const pathname = usePathname();

  const currentPage = pathname?.split("/")[1];

  interface NavbarElementProp {
    href: string;
    icon?:ReactElement;
    text: string;
    value: string;
  }

  const navbarElements: NavbarElementProp[] = [
    {
      href: "/dashboard",
      icon:<DashboardIcon />,
      text: "Dashboard",
      value: "dashboard",
    },{
      href: "/recs",
      icon:<LibraryMusicIcon/>,
      text: "Recs",
      value: "recs",
    },{
      href: "/tracks",
      icon:<MusicNoteOutlinedIcon/>,
      text: "Tracks",
      value: "tracks",
    },{
      href: "/artists",
      icon:<PersonIcon/>,
      text: "Artists",
      value: "artists",
    },{
      icon:<LibraryMusicIcon/>,
      href: "/playlists",
      text: "Playlists",
      value: "playlists",
    },
  ];
  return (
    <div className="z-20 md:h-screen bg-background w-screen fixed md:top-0 md:w-[100px]  bottom-0 md:block flex flex-col">
      <div className="flex flex-col justify-center h-full">
        <ul className=" flex flex-row md:flex-col navbar-links text-center w-full">
          {navbarElements.map((element: NavbarElementProp) => (
            <li
              key={element.value}
              className={`flex box py-4 md:py-2 justify-center flex-1 text-sm flex-col items-center ${
                currentPage === element.value
                  ? " border-t-4 md:border-t-0 md:border-l-4 border-main bg-grayBg"
                  : ""
              }`}
            >
              <Link href={element.href}>
                {element.icon}
                <div>{element.text}</div>
              </Link>
            </li>
          ))}
          
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
