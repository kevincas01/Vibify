'use server'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSpotifyUserProfile, getUserTopWType } from "@/app/utils/spotify";
import RecsComponent from "@/app/(components)/Recs/RecsComponent";
import { Suspense } from "react";
import { getRecommendations } from "@/app/utils/supabase";
import Loading from "./loading";

const RecsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;
  const userId=session.user.userId as string
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

  const recommendations= await getRecommendations()
  return (
    <Suspense fallback={<Loading/>}>
      <RecsComponent
        accessToken={accessToken}
        userId={userId}
        topArtists={topArtists}
        topTracks={topTracks}
        recommendations={recommendations}
      />
    </Suspense>
  );
};

export default RecsPage;
