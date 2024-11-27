import { NextRequest, NextResponse } from "next/server";
import { generateRandomString } from "../../../utils/misc"; // Assuming you have this utility function
import querystring from "querystring";

export async function GET(request: NextRequest, response: NextResponse) {
  // Generate a random state for CSRF protection
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-top-read user-read-recently-played user-library-modify user-library-read"; // Define the requested scope

  // Check if necessary environment variables are defined
  const clientId = process.env.SPOTIFY_CLIENT_ID || "";
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "";

  // Redirect the user to Spotify authorization URL with the constructed query string
  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
    })}`
  );
}
