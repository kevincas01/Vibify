"use client";
import React from "react";
import Button from "./Buttons/Button";
import { signIn } from "next-auth/react";

const LoginScreen = () => {
  const loginUrl=`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`

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
