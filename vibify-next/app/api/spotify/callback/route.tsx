import { getSpotifyUserProfile } from "@/app/utils/spotify";
import { createOrUpdateUser } from "@/app/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  // Check if 'state' is valid (CSRF protection)
  if (!state) {
    return NextResponse.redirect(
      `/#${querystring.stringify({ error: "state_mismatch" })}`
    );
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  const frontend_redirect_uri = process.env.FRONTEND_REDIRECT_URI;

  if (!client_id || !client_secret || !redirect_uri || !frontend_redirect_uri) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  const body = new URLSearchParams({
    code: code || "",
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
  };

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: headers,
      body: body.toString(),
    });

    const data = await response.json();

    // If the request is successful
    if (response.ok) {
      const { access_token, refresh_token } = data;

      const profile = await getSpotifyUserProfile(access_token);

      if (profile) {
        const { data, error } = await createOrUpdateUser(profile);
   
        const { spotify_id } = data;

        return NextResponse.redirect(
          `${frontend_redirect_uri}/#${querystring.stringify({
            access_token,
            refresh_token,
            spotify_id, 
          })}`
        );
      }

      return NextResponse.redirect(
        `/#${querystring.stringify({ error: "profile_not_found" })}`
      );
    } else {
      // If there is an error (e.g., invalid token)
      return NextResponse.redirect(
        `/#${querystring.stringify({ error: "invalid_token" })}`
      );
    }
  } catch (error) {
    // Handle any errors during the request
    console.error("Error during token exchange:", error);
    return NextResponse.redirect(
      `/#${querystring.stringify({ error: "server_error" })}`
    );
  }
}
