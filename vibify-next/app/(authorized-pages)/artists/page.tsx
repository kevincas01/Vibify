import ArtistsComponent from "@/app/(components)/ArtistsComponent";
import { authOptions } from "@/app/utils/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

const Artists = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;

  return (
    <Suspense fallback={<Loading />}>
      <ArtistsComponent accessToken={accessToken} />
    </Suspense>
  );
};

export default Artists;
