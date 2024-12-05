"use client";
import {
  Album,
  Artist,
  Playlist,
  SpotifyUser,
  TopArtistsResponse,
  TopTracksResponse,
  Track,
} from "@/app/types/spotify";
import RecModal from "./RecModal";
import {
  Recommendations,
  RecommendationType,
} from "@/app/types/recommendations";
import { useState } from "react";
import CircleButton from "../Buttons/CircleButton";
import Image from "next/image";
import dynamic from "next/dynamic";
import FeedTrackComponent from "./Feed/FeedTrackComponent";
import FeedArtistComponent from "./Feed/FeedArtistComponent";
import FeedAlbumComponent from "./Feed/FeedAlbumComponent";
import FeedPlaylistComponent from "./Feed/FeedPlaylistComponent";

const PlayCircleOutlinedIcon = dynamic(
  () => import("@mui/icons-material/PlayCircleOutlined"),
  {
    ssr: false,
  }
);
const ChatBubbleOutlineIcon = dynamic(
  () => import("@mui/icons-material/ChatBubbleOutline"),
  {
    ssr: false,
  }
);
const FavoriteBorderIcon = dynamic(
  () => import("@mui/icons-material/FavoriteBorder"),
  {
    ssr: false,
  }
);
const AddIcon = dynamic(() => import("@mui/icons-material/Add"), {
  ssr: false,
});

interface RecsComponentProps {
  accessToken: string;
  profile: SpotifyUser;
  topArtists: TopArtistsResponse;
  topTracks: TopTracksResponse;
  recommendations: Recommendations[];
}
const RecsComponent = ({
  accessToken,
  profile,
  topArtists,
  topTracks,
  recommendations,
}: RecsComponentProps) => {
  const [recommendModal, setRecommenModal] = useState(false);

  const [feedType, setFeedType] = useState("all");

  const handleModalToggle = () => {
    setRecommenModal((prev) => !prev);
  };
  const recommendationsFeed: { value: string; text: string }[] = [
    { value: "followed", text: "Followed Recommendations" },
    { value: "all", text: "All Recommendations" },
  ];

  const renderRecomendationItem = (
    type: RecommendationType, // Use RecommendationType directly
    item: Artist | Track | Album | Playlist
  ) => {
    console.log(type);
    switch (type) {
      case RecommendationType.artist:
        console.log("skjsddd");
        return <FeedArtistComponent artist={item as Artist} />;
      case RecommendationType.track:
        return <FeedTrackComponent track={item as Track} />;
      case RecommendationType.album:
        return <FeedAlbumComponent album={item as Album} />;
      case RecommendationType.playlist:
        return <FeedPlaylistComponent playlist={item as Playlist} />;
      default:
        console.log("sdfsjdfjsddddddd");
        return null;
    }
  };
  const iconButtonSize = 25;
  return (
    <div className="h-full relative">
      {recommendModal ? (
        <>
          <RecModal
            handleModalToggle={handleModalToggle}
            profileId={profile.id}
            accessToken={accessToken || ""}
            topTracks={topTracks}
            topArtists={topArtists}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col items-center mb-[80px] max-w-[500px] mx-auto ">
            <div className="text-center w-full">
              <div className="flex gap-4 justify-around">
                {recommendationsFeed.map((element) => (
                  <div key={element.value}>
                    <button
                      onClick={() => setFeedType(element.value)}
                      className={`p-2 ${
                        feedType === element.value
                          ? "text-main border-b-2 border-b-main"
                          : "text-lightGray"
                      }`}
                      aria-selected={feedType === element.value}
                    >
                      {element.text}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-6">
                {recommendations.map((item: Recommendations, index: number) => (
                  <div className="flex flex-col gap-2 w-full" key={index}>
                    <div className="flex gap-4 w-full">
                      <Image
                        className="rounded-full"
                        src={item.users?.image_url as string}
                        alt="User Profile Image"
                        width={25}
                        height={25}
                        style={{ alignSelf: "flex-start" }} // Prevent the image from stretching
                      />

                      <div className="flex justify-between gap-2 w-full min-w-0">
                        <div className="flex flex-col min-w-0">
                          <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                            {item.users?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center py-4 border-y-[0.5px] border-y-gray-500">
                      {renderRecomendationItem(
                        item.recommendation_type,
                        item.recommended_item
                      )}
                    </div>
                    <div className="flex gap-2">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <FavoriteBorderIcon
                          style={{
                            width: iconButtonSize,
                            height: iconButtonSize,
                          }}
                        />
                        <span style={{ marginLeft: 4 }}>123</span>{" "}
                        {/* Dummy number */}
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ChatBubbleOutlineIcon
                          style={{
                            width: iconButtonSize,
                            height: iconButtonSize,
                          }}
                        />
                        <span style={{ marginLeft: 4 }}>456</span>{" "}
                        {/* Dummy number */}
                      </div>
                      <PlayCircleOutlinedIcon
                        style={{
                          width: iconButtonSize,
                          height: iconButtonSize,
                        }}
                      />
                      <AddIcon
                        style={{
                          width: iconButtonSize,
                          height: iconButtonSize,
                        }}
                      />
                    </div>

                    <div className="flex justify-between gap-2 w-full min-w-0">
                      <div className="flex flex-col min-w-0">
                        <p className="">
                          <span className="mr-2 font-bold">
                            {item.users?.email}
                          </span>
                          <span className="text-lightGray text-wrap"></span>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fixed md:bottom-[20px] bottom-[100px] right-[20px] ">
              <CircleButton onClick={() => handleModalToggle()} size={60}>
                <AddIcon fontSize="large" />
              </CircleButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecsComponent;
