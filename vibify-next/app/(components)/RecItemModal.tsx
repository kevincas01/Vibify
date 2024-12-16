"use client";
import React from "react";
import CircleButton from "./Buttons/CircleButton";
import { Album, Artist, Playlist, Track } from "@/app/types/spotify";
import RecsArtistComponent from "./Recs/RecModal/RecsArtistComponent";
import RecsTrackComponent from "./Recs/RecModal/RecsTrackComponent";
import RecsAlbumComponent from "./Recs/RecModal/RecsAlbumComponent";
import RecsPlaylistComponent from "./Recs/RecModal/RecsPlaylistComponent";
import { useRecommendItem } from "./Providers/RecommendItemProvider";
import Button from "./Buttons/Button";
// const CloseIcon = dynamic(() => import("@mui/icons-material/Close"), {
//   ssr: false,
// });
import CloseIcon from "@mui/icons-material/Close";

const RecItemModal = () => {
  const {
    deselectItem,
    selectedItem,
    recommendationText,
    setRecommendationText,
    handleRecommendation,
  } = useRecommendItem();
  const renderSelectedItem = (
    type: string,
    item: Artist | Track | Album | Playlist
  ) => {
    switch (type) {
      case "artist":
        return <RecsArtistComponent artist={item as Artist} />;
      case "track":
        return <RecsTrackComponent track={item as Track} />;
      case "album":
        return <RecsAlbumComponent album={item as Album} />;
      case "playlist":
        return <RecsPlaylistComponent playlist={item as Playlist} />;
      default:
        return null;
    }
  };

  const handleCreateRecommendation = () => {
    deselectItem();
    handleRecommendation();
  };
  if (!selectedItem) return null;
  return (
    <div className="w-full md:pl-[100px] pb-[80px] md:pb-0 bg-grayBg min-h-screen fixed top-0 box-border">
      <div className="fixed top-[20px] right-[20px]">
        <CircleButton onClick={deselectItem} size={40} dark={true}>
          <CloseIcon />
        </CircleButton>
      </div>
      <div className=" p-6 md:p-10 box-border">
        <h2 className="text-main text-center">Recommending</h2>

        <div className="flex flex-col justify-between gap-4 sticky bottom-0">
          <div className="flex justify-center mt-[50px]">
            {renderSelectedItem(selectedItem.type, selectedItem)}
          </div>
          <div className="flex flex-col items-center gap-4 sticky bottom-0">
            <h3 className="w-full">Leave a message </h3>
            <textarea
              rows={5}
              value={recommendationText}
              onChange={(e) => setRecommendationText(e.target.value)}
            />
            <Button onClick={() => handleCreateRecommendation()}>
              Recommend
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecItemModal;
