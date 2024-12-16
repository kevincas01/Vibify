import { User } from "next-auth";
import { Recommendations } from "../types/recommendations";
import { Album, Artist, Playlist, SpotifyUser, Track } from "../types/spotify";
import { createSupabaseClient } from "./clients/supabaseClient";


const supabase = createSupabaseClient();
export async function createOrUpdateUser(profile: User,access_token:string) {
  const { email, id, name,  } = profile;

  // Make a request to the Spotify API to fetch the user's profile information (including images)
  const spotifyApiUrl = `https://api.spotify.com/v1/users/${id}`;
  
  // Fetch the user's profile from Spotify
  const response = await fetch(spotifyApiUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`, // Use the access token for authorization
    },
  });

  const spotifyProfile = await response.json();

  if (response.ok && spotifyProfile) {
    // Extract the image URL if available
    const imageUrl = spotifyProfile.images && spotifyProfile.images.length > 0 
      ? spotifyProfile.images[0].url 
      : null;

    // Ensure you pass an object to upsert
    const { data, error } = await supabase
      .from("users")
      .upsert(
        {
          email: email,
          spotify_id: id,
          display_name: name,
          image_url: imageUrl, // Save the image URL
        },
        {
          onConflict: "spotify_id",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Error inserting user into Supabase:", error);
      return { data: null, error: error };
    }

    return { data, error: null };
  } else {
    console.error("Failed to fetch user profile from Spotify:", spotifyProfile);
    return { data: null, error: "Failed to fetch user profile from Spotify" };
  }
}

export async function createRecommendation(
  type: string,
  recommended_item: Artist | Track | Album | Playlist | null,
  spotify_id: string,
  user_spotify_id: string,
  text: string
) {
  const { data, error } = await supabase
    .from("recommendations")
    .insert({
      recommendation_type: type,
      recommended_item,
      spotify_id,
      user_spotify_id,
      text,
    })
    .select()
    .single();
  if (error) {
    console.error("Error inserting user into Supabase:", error);
    return { data: null, error: error };
  }
  return { data: data, error: null };
}
export async function getRecommendations(): Promise<Recommendations[]> {
  try {
    const { data, error } = await supabase
      .from("recommendations")
      .select("*, users(*)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
}
