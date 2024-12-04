'use server'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSpotifyUserProfile, getUserTopWType } from "@/app/utils/spotify";
import RecsComponent from "@/app/(components)/Recs/RecsComponent";
import { Suspense } from "react";
import { getRecommendations } from "@/app/utils/supabase";

const RecsPage = async () => {
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
    <Suspense >
      <RecsComponent
        accessToken={accessToken}
        profile={profile}
        topArtists={topArtists}
        topTracks={topTracks}
      />
    </Suspense>
  );
};

export default RecsPage;
