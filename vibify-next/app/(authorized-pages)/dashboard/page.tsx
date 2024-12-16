import DashboardComponent from "@/app/(components)/DashboardComponent";
import { authOptions } from "@/app/utils/libs/auth";
import { getSpotifyUserProfile, getUserTopWType } from "@/app/utils/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;

  const profile = await getSpotifyUserProfile(accessToken);
  const topArtists = await getUserTopWType(
    accessToken,
    "artists",
    "long_term",
    10
  );
  const topTracks = await getUserTopWType(
    accessToken,
    "tracks",
    "long_term",
    10
  );

  return (
    <Suspense fallback={<Loading />}>
      <DashboardComponent
        profile={profile}
        topArtists={topArtists}
        topTracks={topTracks}
      />
    </Suspense>
  );
};

export default ProfilePage;
