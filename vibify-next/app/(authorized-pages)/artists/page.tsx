import ArtistsComponent from "@/app/(components)/ArtistsComponent";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {getUserTopWType } from "@/app/utils/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Artists = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;

  const topArtists = await getUserTopWType(
    accessToken,
    "artists",
    "long_term",
    10
  );

  return (
    <div className="flex flex-col items-center">
      <ArtistsComponent accessToken={accessToken} topArtists={topArtists} />
    </div>
  );
};

export default Artists;
