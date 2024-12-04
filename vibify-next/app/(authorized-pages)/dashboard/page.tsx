import DashboardComponent from "@/app/(components)/Dashboard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSpotifyUserProfile, getUserTopWType } from "@/app/utils/spotify";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
    <div>
      <DashboardComponent
        profile={profile}
        topArtists={topArtists}
        topTracks={topTracks}
      />
    </div>
  );
};

export default ProfilePage;
