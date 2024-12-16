"use server";
import { Suspense, type PropsWithChildren } from "react";
import Navbar from "../(components)/Navbar";
import ClientThemeWrapper from "../styles/ClientThemeProvider";
import { TrackProvider } from "../context/player";
import SpotifyPlayer from "../(components)/SpotifyPlayer";
import ToastProvider from "../(components)/Providers/ToastProvider";

import { authOptions } from "@/app/utils/libs/auth";
import SessionProvider from "../(components)/Providers/SessionProvider";
import { RecommendItemProvider } from "../(components)/Providers/RecommendItemProvider";
import RecItemModal from "../(components)/RecItemModal";
import { getServerSession } from 'next-auth';
export default async function Layout({ children }: PropsWithChildren<unknown>) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex md:flex-col flex-row min-w-screen">
      <Navbar />
      <ClientThemeWrapper>
        {/* Wrap the TrackProvider in Suspense for lazy loading */}
        <Suspense>
          <SessionProvider session={session}>
            <RecommendItemProvider>
              <TrackProvider>
                <main
                  className={`w-full md:pl-[100px] pb-[80px] md:pb-0 bg-grayBg min-h-screen`}
                >
                  <div className="md:p-10 p-6 h-full">
                    <ToastProvider />
                    {children}
                  </div>
                </main>
                <RecItemModal />
                <SpotifyPlayer />
              </TrackProvider>
            </RecommendItemProvider>
          </SessionProvider>
        </Suspense>
      </ClientThemeWrapper>
    </div>
  );
}
