import TracksComponent from "@/app/(components)/TracksComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserTopWType } from "@/app/utils/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const Tracks = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;

  const topTracks = await getUserTopWType(
    accessToken,
    "tracks",
    "long_term",
    10
  );

  return (
    <Suspense>
      <TracksComponent accessToken={accessToken} topTracks={topTracks} />
    </Suspense>
  );
};

export default Tracks;
