
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import { AuthOptions } from "next-auth";

// Scope for Spotify API permissions
const scope =
  "user-read-currently-playing streaming user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-top-read user-read-recently-played user-library-modify user-library-read user-read-playback-state user-modify-playback-state";

const queryParamString = new URLSearchParams({ scope }).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

// Refresh Access Token Logic
async function refreshAccessToken(token: JWT) {
  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID as string;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const authHeader =
      "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authHeader,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    });

    const data = await response.json();

    if (!data.access_token) throw new Error("Failed to refresh access token");

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      refreshToken: data.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

// Export Auth Options
export const authOptions:AuthOptions = {
  providers: [
    SpotifyProvider({
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
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = (account.expires_at as number) * 1000;
        token.userId = user.id;
        return token;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token; // Access token still valid
      }

      // Refresh the token if expired
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        userId: token.userId as string,
      };
      return session;
    },
  },
};
