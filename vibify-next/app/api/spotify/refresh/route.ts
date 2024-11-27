import { NextRequest, NextResponse } from "next/server";
import querystring from "querystring";

export async function POST(request: NextRequest) {
  const refreshToken = request.nextUrl.searchParams.get("refresh_token");

  const clientId = process.env.SPOTIFY_CLIENT_ID || "";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
  const frontend_redirect_uri = process.env.FRONTEND_REDIRECT_URI;

  const body = querystring.stringify({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: clientId,
  });

  // Create the authorization header
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: headers,
      body: body,
    });

    const data = await response.json();

    const { access_token } = data;

    return NextResponse.json({ access_token });
  } catch (error: unknown) {
    // Handle any network or server error
    console.error("Error while refreshing token:", error);
    return NextResponse.json(
      { error: "Server error", details: error },
      { status: 500 }
    );
  }
}
