import { SpotifyUser } from "../types/spotify";
import { createSupabaseClient } from "./clients/supabaseClient";

export async function createOrUpdateUser(profile: SpotifyUser) {
  const { email, id, images } = profile;

  const imageUrl = images && images.length > 0 ? images[0].url : null;

  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("users").upsert(
    {
      email: email,
      spotify_id: id,
      image_url: imageUrl,
    },
    { onConflict: ["spotify_id"] }
  );

  if (error) {
    console.error("Error inserting user into Supabase:", error);
    return;
  }

  console.log("User successfully created/updated:", data);
}
