"use client";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const router = useRouter();
  const LOGIN_URI = "http://localhost:3000/api/spotify/login";

  const handleLoginClick = () => {
    router.push(LOGIN_URI);
  };

  return (
    <div className="flex flex-col text-center">
      <Button onClick={handleLoginClick}>Log in to Spotify</Button>
    </div>
  );
};

export default LoginScreen;
