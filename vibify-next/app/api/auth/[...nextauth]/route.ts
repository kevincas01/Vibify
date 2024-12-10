import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Spotify from "next-auth/providers/spotify";

const scope =
  "streaming user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-top-read user-read-recently-played user-library-modify user-library-read user-read-playback-state user-read-playback-state user-modify-playback-state";

const queryParamString = new URLSearchParams({ scope: scope }).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

// The function that calls your API route to refresh the token
async function refreshAccessToken(token: JWT) {
  if (!token.refreshToken) {
    throw new Error("Missing refresh token");
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID || "";

  const refreshToken = token.refreshToken as string;

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID; // Your client ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // Your client secret

    // Create Basic Authentication header by base64 encoding clientId:clientSecret
    const authHeader =
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    // Prepare the URLSearchParams for the body of the request
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const url = "https://accounts.spotify.com/api/token";

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader, // Include the Authorization header
      },
      body: body,
    };
    const response = await fetch(url, payload);

    // Parse the JSON response
    const data = await response.json();

    // Check if the access token is in the response
    if (!data.access_token) {
      throw new Error("Access token missing from the response");
    }

    // Return the updated token with the new access token
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpiration: Date.now() + 3600 * 1000, // Update expiration to 1 hour from now
    };
  } catch (error) {
    console.error("Error while refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.JWT_SECRET as string,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token, user }) {
      if (!session.user) {
        session.user = {}; // Initialize session.user if it's undefined
      }

      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.userId = token.userId as string;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log(account, user);
        token.accessToken = account.access_token as string;
        token.refreshToken = account.refresh_token;
        token.userId = account.userId;
        token.accessTokenExpires = (account.expires_at! * 1000) as number;
console.log(account)
        return token;
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // If token expired or refresh logic is needed, call the refreshAccessToken function
      const refreshedToken = await refreshAccessToken(token);

      // Ensure that the returned token is a valid JWT (even when an error occurs)
      return refreshedToken;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
