import { SpotifyUser } from "../types/spotify";
import { createSupabaseClient } from "./clients/supabaseClient";

export async function createOrUpdateUser(profile: SpotifyUser) {
  const { email, id, images } = profile;

  const imageUrl = images && images.length > 0 ? images[0].url : null;

  const supabase = createSupabaseClient();
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
  spotify_id: string,
  user_spotify_id: string,
  text: string
) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("recommendations")
    .insert({
      recommendation_type: type,
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

export async function getRecommendations() {
  const supabase = createSupabaseClient();

  // Perform a JOIN to fetch data from both 'recommendations' and 'users'
  const { data, error } = await supabase
    .from("recommendations")
    .select("*, users(*)") 
  if (error) {
    console.error("Error fetching recommendations and users:", error);
    return { data: null, error: error };
  }

  return { data, error: null };
}
