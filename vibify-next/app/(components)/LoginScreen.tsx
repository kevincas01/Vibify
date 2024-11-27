"use client";
import React from "react";
import Button from "./Button";

const LoginScreen = () => {
  const LOGIN_URI = "http://localhost:3000/api/spotify/login";

  const handleLoginClick = () => {
    window.location.href = LOGIN_URI; 
  };

  return (
    <div className="flex flex-col text-center">
      <Button onClick={handleLoginClick}>Log in to Spotify</Button>
    </div>
  );
};

export default LoginScreen;
