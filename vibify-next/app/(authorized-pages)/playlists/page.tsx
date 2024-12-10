import PlaylistsComponent from "@/app/(components)/PlaylistsComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserPlaylists } from "@/app/utils/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const PlaylistsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;
  const userId = session.user.userId as string;

  const userPlaylistsResponse = await getUserPlaylists(accessToken, userId);

  console.log(userPlaylistsResponse)
  return (
    <div>
      <PlaylistsComponent playlists={userPlaylistsResponse.items}/>
    </div>
  );
};

export default PlaylistsPage;
