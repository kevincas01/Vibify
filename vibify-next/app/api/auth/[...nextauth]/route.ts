import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Spotify from "next-auth/providers/spotify";

const scope =
  "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-top-read user-read-recently-played user-library-modify user-library-read";

const queryParamString = new URLSearchParams({ scope: scope }).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString}`;

// The function that calls your API route to refresh the token
async function refreshAccessToken(token: JWT) {
  try {
    if (!token.refreshToken) {
      throw new Error("Missing refresh token");
    }

    // Call the /api/refresh-token endpoint to get a new access token
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/refresh-token?refresh_token=${token.refreshToken}`,
      {
        method: "POST",
      }
    );

    // If the response is not OK, throw an error
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error refreshing Spotify token:", errorData);
      throw new Error("Failed to refresh access token");
    }

    // Parse the response from the API
    const data = await res.json();

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
        console.log(account, user)
        token.accessToken = account.access_token as string;
        token.refreshToken = account.refresh_token;
        token.userId = account.userId;
        token.accessTokenExpires = (account.expires_at! * 1000) as number;

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
