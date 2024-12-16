"use client";
import React from "react";
import Button from "./Buttons/Button";
import { signIn } from "next-auth/react";

const LoginScreen = () => {
  const loginUrl =process?.env?.NEXT_PUBLIC_SITE_URL ?? 
  process?.env?.NEXT_PUBLIC_VERCEL_URL ??
  'http://localhost:3000/';

  const handleLoginClick = async () => {
    await signIn("spotify");

  };

  return (
    <div className="flex flex-col text-center">
      <Button onClick={handleLoginClick}>Log in to Spotify</Button>
    </div>
  );
};

export default LoginScreen;
