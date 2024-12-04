"use client";
import React from "react";
import Button from "./Buttons/Button";
import { signIn } from "next-auth/react";

const LoginScreen = () => {
  const LOGIN_URI = "http://localhost:3000/api/spotify/login";

  const handleLoginClick = async () => {
    // window.location.href = LOGIN_URI;
    await signIn("spotify", { callbackUrl: "http://localhost:3000/dashboard" });

  };

  return (
    <div className="flex flex-col text-center">
      <Button onClick={handleLoginClick}>Log in to Spotify</Button>
    </div>
  );
};

export default LoginScreen;
