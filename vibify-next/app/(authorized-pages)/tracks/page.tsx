import TracksComponent from "@/app/(components)/TracksComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {getUserTopWType } from "@/app/utils/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col items-center">
      <TracksComponent accessToken={accessToken} topTracks={topTracks} />
    </div>
  );
};

export default Tracks;
