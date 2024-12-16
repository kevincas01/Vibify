import TracksComponent from "@/app/(components)/TracksComponent";
import { authOptions } from "@/app/utils/libs/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

const Tracks = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const accessToken = session.user.accessToken as string;

  return (
    <Suspense fallback={<Loading />}>
      <TracksComponent accessToken={accessToken} />
    </Suspense>
  );
};

export default Tracks;
