"use server";
import { Suspense, type PropsWithChildren } from "react";
import Navbar from "../(components)/Navbar";
import ClientThemeWrapper from "../styles/ClientThemeProvider";
import { TrackProvider } from "../context/player";
import SpotifyPlayer from "../(components)/SpotifyPlayer";
import { ToastContainer } from "react-toastify";
import ToastProvider from "../(components)/ToastProvider";

export default async function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex md:flex-col flex-row min-w-screen">
      <Navbar />
      <ClientThemeWrapper>
        {/* Wrap the TrackProvider in Suspense for lazy loading */}
        <Suspense>
          <TrackProvider>
            <main
              className={`w-full md:pl-[100px] pb-[80px] md:pb-0 bg-grayBg min-h-screen`}
            >
              <div className="md:p-10 p-6 h-full">
                <ToastProvider>
                  {children}</ToastProvider>
              </div>
              <SpotifyPlayer />
            </main>
          </TrackProvider>
        </Suspense>
      </ClientThemeWrapper>

    </div>
  );
}
