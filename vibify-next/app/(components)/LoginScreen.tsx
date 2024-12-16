"use client";
import React from "react";
import Button from "./Buttons/Button";
import { signIn } from "next-auth/react";

const LoginScreen = () => {
  const loginUrl =process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
  process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
  'http://localhost:3000/';

  const handleLoginClick = async () => {
    await signIn("spotify", { callbackUrl: `${loginUrl}/dashboard` });

  };

  return (
    <div className="flex flex-col text-center">
      <Button onClick={handleLoginClick}>Log in to Spotify</Button>
    </div>
  );
};

export default LoginScreen;
