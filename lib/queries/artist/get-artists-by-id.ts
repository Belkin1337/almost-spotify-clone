import { ArtistEntity } from "@/types/entities/artist";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getArtistsById(client: SupabaseClient, artistsId: string[]) {
  const artistsData: ArtistEntity[] = [];

  for (const id of artistsId) {
    const { data: artist, error } = await client
      .from("artists")
      .select("*")
      .eq("id", id)
      .single();

    if (artist && !error) {
      artistsData.push(artist);
    } else {
    
    }
  }

  return artistsData;
}