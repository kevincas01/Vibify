"use server";
import { Suspense, type PropsWithChildren } from "react";
import Navbar from "../(components)/Navbar";
import ClientThemeWrapper from "../styles/ClientThemeProvider";
import { TrackProvider } from "../context/player";
import SpotifyPlayer from "../(components)/SpotifyPlayer";
import ToastProvider from "../(components)/ToastProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SessionProvider from "../(components)/Providers/SessionProvider"
export default async function Layout({ children }: PropsWithChildren<unknown>) {
  const session=await getServerSession(authOptions)
  return (
    <div className="flex md:flex-col flex-row min-w-screen">
      <Navbar />
      <ClientThemeWrapper>
        {/* Wrap the TrackProvider in Suspense for lazy loading */}
        <Suspense>
          <SessionProvider session={session} >
            <TrackProvider>
              <main
                className={`w-full md:pl-[100px] pb-[80px] md:pb-0 bg-grayBg min-h-screen`}
              >
                <div className="md:p-10 p-6 h-full">
                  <ToastProvider>{children}</ToastProvider>
                </div>
                <SpotifyPlayer />
              </main>
            </TrackProvider>
          </SessionProvider>
        </Suspense>
      </ClientThemeWrapper>
    </div>
  );
}
