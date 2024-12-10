import PlaylistItemComponent from "@/app/(components)/PlaylistItemComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getPlaylistsItems } from "@/app/utils/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: {
    playlist_id: string;
  };
}
const PlaylistItemPage = async ({ params }: Props) => {
  const { playlist_id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;
  const userId = session.user.userId as string;

  const playlistItemsResponse = await getPlaylistsItems(
    accessToken,
    playlist_id
  );
  console.log(playlistItemsResponse)
  return (
    <div>
      <PlaylistItemComponent playlistItems={playlistItemsResponse.items} />
    </div>
  );
};

export default PlaylistItemPage;
