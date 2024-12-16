import PlaylistsComponent from "@/app/(components)/PlaylistsComponent";
import { authOptions } from "@/app/utils/libs/auth";
import { getUserPlaylists } from "@/app/utils/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "./loading";

const PlaylistsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;
  const userId = session.user.userId as string;

  const userPlaylistsResponse = await getUserPlaylists(accessToken, userId);

  return (
    <Suspense fallback={<Loading />}>
      <PlaylistsComponent
        accessToken={accessToken}
        playlists={userPlaylistsResponse.items}
      />
    </Suspense>
  );
};

export default PlaylistsPage;
