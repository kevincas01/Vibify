"use client";
import Image from "next/image";
import LoginScreen from "./(components)/LoginScreen";
import { useEffect, useState } from "react";
import { getAccessToken } from "./utils/accessTokens";

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>("");

  useEffect(() => {
    const token = getAccessToken();
    if (token!=="undefined") {
      setAccessToken(token);
      return;
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Vibify</h1>
        {(!accessToken || accessToken == null) && <LoginScreen />}
      </div>
    </div>
  );
}
