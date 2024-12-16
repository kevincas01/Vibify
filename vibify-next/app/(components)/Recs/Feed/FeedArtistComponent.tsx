import React from "react";
import { Artist } from "@/app/types/spotify";

import ArtistItem from "../../SpotifyItems/ArtistItem";

interface FeedArtistComponentProps {
  artist: Artist;
}
const FeedArtistComponent = ({ artist }: FeedArtistComponentProps) => {

  return (
    <div
      key={artist.id}
      className={`flex flex-col items-center w-2/5 md:w-1/4 relative`}

      style={{
        transition: "background-color 0.3s ease", // Smooth transition for highlight
      }}
    >
      <ArtistItem artist={artist} />
    </div>
  );
};

export default FeedArtistComponent;
