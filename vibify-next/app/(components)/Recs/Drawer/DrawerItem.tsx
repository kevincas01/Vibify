import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../../Buttons/Button";
import { Playlist } from "@/app/types/spotify";
import useSWR from "swr";
import { fetchNextPageOfItems } from "@/app/utils/spotify";

interface DrawerItemProps {
  id: string; // The song ID you want to add to a playlist
  userId: string;
  onClose: () => void;
}

const DrawerItem = ({ id, userId, onClose }: DrawerItemProps) => {
  const { data: session } = useSession();

  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState<string[]>([]); // State for selected playlists (multiple)

  const playlistKey = `playlist`;
  const { data: playlistInitialData, isLoading: playlistInitialDataLoading } =
    useSWR(playlistKey, () =>
      fetchNextPageOfItems(
        accessToken as string,
        "https://api.spotify.com/v1/me/playlists"
      )
    );

  // Filter playlists based on the given criteria
  const filteredPlaylists = React.useMemo(() => {
    if (!playlistInitialData) return [];
    return playlistInitialData.filter((playlist: Playlist) => {
      return (
        playlist &&
        (playlist.owner?.id === userId ||
          playlist.collaborative ||
          !playlist.public)
      );
    });
  }, [playlistInitialData]);

  // Handle selecting a playlist
  const handleSelectPlaylist = (playlistId: string) => {
    setSelectedPlaylistIds((prevSelected) => {
      if (prevSelected.includes(playlistId)) {
        return prevSelected.filter((id) => id !== playlistId);
      } else {
        return [...prevSelected, playlistId];
      }
    });
  };

  // Handle adding track to selected playlists
  const handleAddToPlaylist = async () => {
    const session = await getSession();
    const accessToken = session?.user.accessToken as string;

    try {
      const promises = selectedPlaylistIds.map((playlistId) => {
        // Construct the API endpoint for each playlist
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const body = JSON.stringify({
          uris: [`spotify:track:${id}`], // Use the track ID passed via props
        });

        // Send the request to add the track to the playlist
        return fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body,
        });
      });

      // Wait for all requests to complete
      await Promise.all(promises);

      // Optionally, you can give feedback to the user here (e.g., success message)
    } catch (error) {
      console.error("Error adding song to playlists:", error);
      // Optionally, show an error message to the user
    } finally {
      onClose();
    }
  };
  if (!session) {
    return null;
  }
  const accessToken = session.user.accessToken;
  return (
    <div className="h-[75vh]">
      <div className="text-center sticky top-0 bg-black w-full">
        <h2 className="text-white">Add to Playlist</h2>
      </div>
      <div className="p-6 flex-1 overflow-auto">
        {playlistInitialDataLoading ? (
          <p>Loading playlists...</p>
        ) : (
          <div>
            <div className="flex flex-col gap-4 mb-20">
              {filteredPlaylists.map((playlist: Playlist) => (
                <div
                  key={playlist.id}
                  className={`grid grid-cols-[50px_1fr_auto] md:grid-cols-[75px_1fr_auto] gap-4 w-full cursor-pointer`}
                  style={{
                    transition: "background-color 0.3s ease",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleSelectPlaylist(playlist.id)}
                >
                  {/* Playlist Image */}
                  {playlist.images && playlist.images.length > 0 ? (
                    <div className="relative w-[50px] md:w-[75px] aspect-square">
                      <Image
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 50px, 75px"
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

                  {/* Playlist Info */}
                  <div className="w-full min-w-0">
                    <div className="flex flex-col min-w-0 ">
                      <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {playlist.name}
                      </p>
                      <span className="flex gap-2">
                        {userId !== playlist.owner?.id && (
                          <p className="text-lightGray text-ellipsis overflow-hidden whitespace-nowrap">
                            {playlist.owner?.display_name}
                          </p>
                        )}
                        <p className="text-lightGray text-nowrap">
                          {playlist.tracks.total}{" "}
                          {playlist.tracks.total > 1 ? "Tracks" : "Track"}
                        </p>
                      </span>
                    </div>
                  </div>

                  {/* Radio Button Style for Selection */}
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-6 h-6 border-2 flex justify-center items-center rounded-full ${
                        selectedPlaylistIds.includes(playlist.id)
                          ? " border-[#1DB954]"
                          : "border-lightGray"
                      }`}
                    >
                      {selectedPlaylistIds.includes(playlist.id) && (
                        <div className="w-2 h-2 bg-main rounded-full m-auto"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-[50%] translate-x-[-50%]">
        <Button onClick={handleAddToPlaylist}>Done</Button>
      </div>
    </div>
  );
};

export default DrawerItem;
