"use client"; // Ensure the code runs on the client side

import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname hook

const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname

  // Determine the current page based on the pathname
  const currentPage = pathname?.split("/")[1]; // Extract the first segment of the path

  return (
    <div className="h-screen">
      <div className="flex flex-col justify-center h-full">
        {/* Display different content based on the current page */}
        <ul className="navbar-links">
          <li className={currentPage === "dashboard" ? "active" : ""}>Dashboard</li>
          <li className={currentPage === "artists" ? "active" : ""}>Artists</li>
          <li className={currentPage === "songs" ? "active" : ""}>Songs</li>
          <li className={currentPage === "playlists" ? "active" : ""}>Playlists</li>
          <li className={currentPage === "profiles" ? "active" : ""}>Profiles</li>
          <li className={currentPage === "settings" ? "active" : ""}>Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
