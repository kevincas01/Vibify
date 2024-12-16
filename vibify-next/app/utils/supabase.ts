import { Recommendations } from "../types/recommendations";
import { Album, Artist, Playlist, SpotifyUser, Track } from "../types/spotify";
import { createSupabaseClient } from "./clients/supabaseClient";

const supabase = createSupabaseClient();
export async function createOrUpdateUser(profile: SpotifyUser) {
  const { email, id, images } = profile;

  const imageUrl = images && images.length > 0 ? images[0].url : null;

  const { data, error } = await supabase
    .from("users")
    .upsert(
      {
        email: email,
        spotify_id: id,
        image_url: imageUrl,
      },
      { onConflict: ["spotify_id"] }
    )
    .select()
    .single();

  if (error) {
    console.error("Error inserting user into Supabase:", error);
    return { data: null, error: error };
  }
  return { data: data, error: null };
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

